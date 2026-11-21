import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  deleteDoc,
  where,
} from 'firebase/firestore';
import {
  auth,
  db,
  handleFirestoreError,
  OperationType,
  signInWithGoogle,
  signOutUser,
} from '../lib/firebase';
import {
  BUILTIN_PAGES,
  CustomPageCard,
  CustomPageData,
  DEFAULT_PAGE_LABELS,
  DEFAULT_SITE_SETTINGS,
  MediaAssetData,
  PAGE_TEMPLATES,
  SiteSettingsData,
  TemplateType,
} from '../types/cms';
import { processImageFile } from '../lib/imageUpload';

export interface ActiveTextEditTarget {
  id: string;
  label?: string;
  defaultText: string;
  multiline?: boolean;
}

export interface ActiveImageEditTarget {
  id: string;
  label?: string;
  defaultSrc: string;
}

interface SiteContentContextValue {
  // Auth
  user: User | null;
  authReady: boolean;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;

  // Mode
  isConsoleMode: boolean;
  setIsConsoleMode: (active: boolean) => void;
  consoleEditMode: boolean;
  setConsoleEditMode: (editing: boolean) => void;

  // Data
  activeSettings: SiteSettingsData;
  publishedSettings: SiteSettingsData;
  draftSettings: SiteSettingsData;
  activeCustomPages: CustomPageData[];
  publishedCustomPages: CustomPageData[];
  draftCustomPages: CustomPageData[];
  mediaAssets: MediaAssetData[];
  hasUnsavedChanges: boolean;
  isPublishing: boolean;
  publishError: string | null;
  lastPublishedAt: string | null;

  // Helpers for reading & resolving
  getText: (id: string, defaultText: string) => string;
  setText: (id: string, value: string) => void;
  resetText: (id: string) => void;
  getImage: (id: string, defaultSrc: string) => string;
  setImage: (id: string, value: string) => void;
  resetImage: (id: string) => void;
  resolveImageSrc: (src: string) => string;

  // Inline Editor Modal State
  activeTextEdit: ActiveTextEditTarget | null;
  setActiveTextEdit: (target: ActiveTextEditTarget | null) => void;
  activeImageEdit: ActiveImageEditTarget | null;
  setActiveImageEdit: (target: ActiveImageEditTarget | null) => void;

  // Global settings & Page management (in /console)
  updateDraftSettings: (partial: Partial<SiteSettingsData>) => void;
  togglePageVisibility: (slug: string) => void;
  renamePageLabel: (slug: string, label: string) => void;
  movePageOrder: (slug: string, direction: 'up' | 'down') => void;
  isPageHidden: (slug: string) => boolean;
  getPageLabel: (slug: string) => string;
  getOrderedNavPages: () => { slug: string; label: string; isCustom: boolean; hidden: boolean }[];

  // Custom Template Pages
  createCustomPage: (templateType: TemplateType, title: string, customSlug?: string) => CustomPageData;
  updateCustomPage: (pageId: string, partial: Partial<CustomPageData>) => void;
  updateCustomPageCard: (pageId: string, cardId: string, partial: Partial<CustomPageCard>) => void;
  addCustomPageCard: (pageId: string) => void;
  removeCustomPageCard: (pageId: string, cardId: string) => void;
  deleteCustomPage: (pageId: string) => void;

  // Media Uploads
  uploadImageAsset: (file: File) => Promise<MediaAssetData>;
  deleteImageAsset: (assetId: string) => Promise<void>;

  // Publish / Discard
  publishAllChanges: () => Promise<boolean>;
  discardDraftChanges: () => void;
  clearPublishError: () => void;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

const LOCAL_PUBLISHED_CACHE_KEY = 'p201_cms_published_cache_v1';
const LOCAL_ASSETS_CACHE_KEY = 'p201_cms_local_assets_v1';

function normalizeSettings(raw: Partial<SiteSettingsData> | null | undefined): SiteSettingsData {
  const baseOrder = Array.isArray(raw?.pagesOrder) && raw.pagesOrder.length > 0
    ? raw.pagesOrder
    : [...DEFAULT_SITE_SETTINGS.pagesOrder];

  // Ensure any built-in page missing from pagesOrder is appended cleanly
  const fullOrder = [...baseOrder];
  for (const builtin of BUILTIN_PAGES) {
    if (!fullOrder.includes(builtin)) {
      fullOrder.push(builtin);
    }
  }

  return {
    id: 'published',
    brandName: raw?.brandName || DEFAULT_SITE_SETTINGS.brandName,
    logoUrl: raw?.logoUrl || DEFAULT_SITE_SETTINGS.logoUrl,
    announcementBadge: raw?.announcementBadge ?? DEFAULT_SITE_SETTINGS.announcementBadge,
    announcementText: raw?.announcementText ?? DEFAULT_SITE_SETTINGS.announcementText,
    announcementCta: raw?.announcementCta ?? DEFAULT_SITE_SETTINGS.announcementCta,
    announcementVisible:
      typeof raw?.announcementVisible === 'boolean'
        ? raw.announcementVisible
        : DEFAULT_SITE_SETTINGS.announcementVisible,
    pagesOrder: fullOrder,
    hiddenPages: Array.isArray(raw?.hiddenPages) ? raw.hiddenPages : [],
    pageLabels: {
      ...DEFAULT_PAGE_LABELS,
      ...(raw?.pageLabels || {}),
    },
    textOverrides: { ...(raw?.textOverrides || {}) },
    imageOverrides: { ...(raw?.imageOverrides || {}) },
  };
}

function slugifyTitle(input: string): string {
  const cleaned = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return cleaned || `page-${Date.now().toString(36)}`;
}

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [isConsoleMode, setIsConsoleMode] = useState(false);
  const [consoleEditMode, setConsoleEditMode] = useState(true);

  const [publishedSettings, setPublishedSettings] = useState<SiteSettingsData>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_PUBLISHED_CACHE_KEY);
      if (cached) {
        return normalizeSettings(JSON.parse(cached));
      }
    } catch {
      // ignore cache errors
    }
    return normalizeSettings(DEFAULT_SITE_SETTINGS);
  });

  const [draftSettings, setDraftSettings] = useState<SiteSettingsData>(() =>
    normalizeSettings(publishedSettings)
  );

  const [publishedCustomPages, setPublishedCustomPages] = useState<CustomPageData[]>([]);
  const [draftCustomPages, setDraftCustomPages] = useState<CustomPageData[]>([]);
  const [deletedCustomPageIds, setDeletedCustomPageIds] = useState<string[]>([]);

  const [firestoreAssets, setFirestoreAssets] = useState<MediaAssetData[]>([]);
  const [pendingLocalAssets, setPendingLocalAssets] = useState<MediaAssetData[]>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_ASSETS_CACHE_KEY);
      if (cached) return JSON.parse(cached);
    } catch {
      // ignore
    }
    return [];
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [lastPublishedAt, setLastPublishedAt] = useState<string | null>(null);

  const [activeTextEdit, setActiveTextEdit] = useState<ActiveTextEditTarget | null>(null);
  const [activeImageEdit, setActiveImageEdit] = useState<ActiveImageEditTarget | null>(null);

  // Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (!firebaseUser || !firebaseUser.emailVerified) {
        setIsAdmin(false);
        setAuthReady(true);
        return;
      }
      if (firebaseUser.email === 'jadovdav@gmail.com') {
        setIsAdmin(true);
        setAuthReady(true);
        return;
      }
      try {
        const adminSnap = await getDoc(doc(db, 'admins', firebaseUser.uid));
        setIsAdmin(adminSnap.exists());
      } catch {
        setIsAdmin(false);
      } finally {
        setAuthReady(true);
      }
    });
    return () => unsub();
  }, []);

  // Subscribe to published site settings
  useEffect(() => {
    const settingsRef = doc(db, 'site_settings', 'published');
    const unsub = onSnapshot(
      settingsRef,
      (snap) => {
        if (snap.exists()) {
          const normalized = normalizeSettings(snap.data() as SiteSettingsData);
          setPublishedSettings(normalized);
          try {
            localStorage.setItem(LOCAL_PUBLISHED_CACHE_KEY, JSON.stringify(normalized));
          } catch {
            // ignore quota
          }
          setDraftSettings((prev) => (hasUnsavedChanges ? prev : normalized));
        }
      },
      (err) => {
        console.warn('Site settings listener notice:', err.message);
      }
    );
    return () => unsub();
  }, [hasUnsavedChanges]);

  // Subscribe to custom pages
  useEffect(() => {
    if (!authReady) return;
    const pagesCol = collection(db, 'custom_pages');
    const pagesQuery = isAdmin
      ? pagesCol
      : query(pagesCol, where('published', '==', true));

    const unsub = onSnapshot(
      pagesQuery,
      (snapshot) => {
        const list: CustomPageData[] = snapshot.docs.map((d) => d.data() as CustomPageData);
        setPublishedCustomPages(list);
        setDraftCustomPages((prev) => (hasUnsavedChanges ? prev : list));
      },
      (err) => {
        console.warn('Custom pages listener notice:', err.message);
      }
    );
    return () => unsub();
  }, [authReady, isAdmin, hasUnsavedChanges]);

  // Subscribe to public media assets
  useEffect(() => {
    const assetsQuery = query(collection(db, 'media_assets'), where('isPublic', '==', true));
    const unsub = onSnapshot(
      assetsQuery,
      (snapshot) => {
        const list: MediaAssetData[] = snapshot.docs.map((d) => d.data() as MediaAssetData);
        setFirestoreAssets(list);
      },
      (err) => {
        console.warn('Media assets listener notice:', err.message);
      }
    );
    return () => unsub();
  }, []);

  // Keep draft synced when entering console without unsaved edits
  useEffect(() => {
    if (!hasUnsavedChanges) {
      setDraftSettings(normalizeSettings(publishedSettings));
      setDraftCustomPages(publishedCustomPages);
      setDeletedCustomPageIds([]);
    }
  }, [publishedSettings, publishedCustomPages, hasUnsavedChanges]);

  const mediaAssets = useMemo(() => {
    const byId = new Map<string, MediaAssetData>();
    for (const a of pendingLocalAssets) byId.set(a.id, a);
    for (const a of firestoreAssets) byId.set(a.id, a);
    return Array.from(byId.values());
  }, [pendingLocalAssets, firestoreAssets]);

  const assetUrlMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const asset of mediaAssets) {
      map.set(`asset://${asset.id}`, asset.dataUrl);
    }
    return map;
  }, [mediaAssets]);

  const activeSettings = isConsoleMode ? draftSettings : publishedSettings;
  const activeCustomPages = isConsoleMode ? draftCustomPages : publishedCustomPages;

  const resolveImageSrc = useCallback(
    (src: string): string => {
      if (!src) return src;
      if (src.startsWith('asset://')) {
        return assetUrlMap.get(src) || '';
      }
      return src;
    },
    [assetUrlMap]
  );

  const getText = useCallback(
    (id: string, defaultText: string): string => {
      const val = activeSettings.textOverrides[id];
      return typeof val === 'string' ? val : defaultText;
    },
    [activeSettings.textOverrides]
  );

  const setText = useCallback((id: string, value: string) => {
    setDraftSettings((prev) => ({
      ...prev,
      textOverrides: {
        ...prev.textOverrides,
        [id]: value,
      },
    }));
    setHasUnsavedChanges(true);
  }, []);

  const resetText = useCallback((id: string) => {
    setDraftSettings((prev) => {
      const next = { ...prev.textOverrides };
      delete next[id];
      return { ...prev, textOverrides: next };
    });
    setHasUnsavedChanges(true);
  }, []);

  const getImage = useCallback(
    (id: string, defaultSrc: string): string => {
      const override = activeSettings.imageOverrides[id];
      const raw = typeof override === 'string' && override.length > 0 ? override : defaultSrc;
      return resolveImageSrc(raw) || defaultSrc;
    },
    [activeSettings.imageOverrides, resolveImageSrc]
  );

  const setImage = useCallback((id: string, value: string) => {
    setDraftSettings((prev) => ({
      ...prev,
      imageOverrides: {
        ...prev.imageOverrides,
        [id]: value,
      },
    }));
    setHasUnsavedChanges(true);
  }, []);

  const resetImage = useCallback((id: string) => {
    setDraftSettings((prev) => {
      const next = { ...prev.imageOverrides };
      delete next[id];
      return { ...prev, imageOverrides: next };
    });
    setHasUnsavedChanges(true);
  }, []);

  const updateDraftSettings = useCallback((partial: Partial<SiteSettingsData>) => {
    setDraftSettings((prev) => ({
      ...prev,
      ...partial,
    }));
    setHasUnsavedChanges(true);
  }, []);

  const isPageHidden = useCallback(
    (slug: string): boolean => {
      if (activeSettings.hiddenPages.includes(slug)) return true;
      const custom = activeCustomPages.find((p) => p.slug === slug);
      if (custom && !custom.published) return true;
      return false;
    },
    [activeSettings.hiddenPages, activeCustomPages]
  );

  const getPageLabel = useCallback(
    (slug: string): string => {
      if (activeSettings.pageLabels[slug]) return activeSettings.pageLabels[slug];
      const custom = activeCustomPages.find((p) => p.slug === slug);
      if (custom) return custom.title;
      return DEFAULT_PAGE_LABELS[slug as keyof typeof DEFAULT_PAGE_LABELS] || slug;
    },
    [activeSettings.pageLabels, activeCustomPages]
  );

  const togglePageVisibility = useCallback(
    (slug: string) => {
      const isCustom = draftCustomPages.some((p) => p.slug === slug);
      if (isCustom) {
        setDraftCustomPages((prev) =>
          prev.map((p) => (p.slug === slug ? { ...p, published: !p.published } : p))
        );
      } else {
        setDraftSettings((prev) => {
          const exists = prev.hiddenPages.includes(slug);
          return {
            ...prev,
            hiddenPages: exists
              ? prev.hiddenPages.filter((s) => s !== slug)
              : [...prev.hiddenPages, slug],
          };
        });
      }
      setHasUnsavedChanges(true);
    },
    [draftCustomPages]
  );

  const renamePageLabel = useCallback(
    (slug: string, label: string) => {
      const trimmed = label.trim().slice(0, 80);
      if (!trimmed) return;
      setDraftSettings((prev) => ({
        ...prev,
        pageLabels: {
          ...prev.pageLabels,
          [slug]: trimmed,
        },
      }));
      setDraftCustomPages((prev) =>
        prev.map((p) => (p.slug === slug ? { ...p, title: trimmed } : p))
      );
      setHasUnsavedChanges(true);
    },
    []
  );

  const movePageOrder = useCallback((slug: string, direction: 'up' | 'down') => {
    setDraftSettings((prev) => {
      const order = [...prev.pagesOrder];
      const idx = order.indexOf(slug);
      if (idx === -1) return prev;
      const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= order.length) return prev;
      [order[idx], order[swapIdx]] = [order[swapIdx], order[idx]];
      return { ...prev, pagesOrder: order };
    });
    setHasUnsavedChanges(true);
  }, []);

  const getOrderedNavPages = useCallback(() => {
    const knownSlugs = new Set<string>([...BUILTIN_PAGES, ...activeCustomPages.map((p) => p.slug)]);
    const result: { slug: string; label: string; isCustom: boolean; hidden: boolean }[] = [];
    const seen = new Set<string>();

    for (const slug of activeSettings.pagesOrder) {
      if (!knownSlugs.has(slug) || seen.has(slug)) continue;
      seen.add(slug);
      const custom = activeCustomPages.find((p) => p.slug === slug);
      result.push({
        slug,
        label: getPageLabel(slug),
        isCustom: Boolean(custom),
        hidden: isPageHidden(slug),
      });
    }

    for (const custom of activeCustomPages) {
      if (!seen.has(custom.slug)) {
        seen.add(custom.slug);
        result.push({
          slug: custom.slug,
          label: getPageLabel(custom.slug),
          isCustom: true,
          hidden: isPageHidden(custom.slug),
        });
      }
    }

    return result;
  }, [activeSettings.pagesOrder, activeCustomPages, getPageLabel, isPageHidden]);

  const createCustomPage = useCallback(
    (templateType: TemplateType, title: string, customSlug?: string): CustomPageData => {
      const preset = PAGE_TEMPLATES.find((t) => t.type === templateType) || PAGE_TEMPLATES[0];
      const cleanTitle = title.trim().slice(0, 80) || preset.name;
      let baseSlug = slugifyTitle(customSlug || cleanTitle);
      const existingSlugs = new Set<string>([
        ...BUILTIN_PAGES,
        'console',
        ...draftCustomPages.map((p) => p.slug),
      ]);
      if (existingSlugs.has(baseSlug)) {
        baseSlug = `${baseSlug}-${Math.floor(100 + Math.random() * 900)}`;
      }

      const newPage: CustomPageData = {
        ...JSON.parse(JSON.stringify(preset.defaults)),
        id: baseSlug,
        slug: baseSlug,
        title: cleanTitle,
        heroTitle: cleanTitle,
      };

      setDraftCustomPages((prev) => [...prev, newPage]);
      setDraftSettings((prev) => ({
        ...prev,
        pagesOrder: [...prev.pagesOrder.filter((s) => s !== baseSlug), baseSlug],
        pageLabels: {
          ...prev.pageLabels,
          [baseSlug]: cleanTitle,
        },
      }));
      setHasUnsavedChanges(true);
      return newPage;
    },
    [draftCustomPages]
  );

  const updateCustomPage = useCallback((pageId: string, partial: Partial<CustomPageData>) => {
    setDraftCustomPages((prev) =>
      prev.map((p) => (p.id === pageId ? { ...p, ...partial } : p))
    );
    if (partial.title) {
      setDraftSettings((prev) => ({
        ...prev,
        pageLabels: {
          ...prev.pageLabels,
          [pageId]: partial.title!,
        },
      }));
    }
    setHasUnsavedChanges(true);
  }, []);

  const updateCustomPageCard = useCallback(
    (pageId: string, cardId: string, partial: Partial<CustomPageCard>) => {
      setDraftCustomPages((prev) =>
        prev.map((p) => {
          if (p.id !== pageId) return p;
          return {
            ...p,
            cards: p.cards.map((c) => (c.id === cardId ? { ...c, ...partial } : c)),
          };
        })
      );
      setHasUnsavedChanges(true);
    },
    []
  );

  const addCustomPageCard = useCallback((pageId: string) => {
    setDraftCustomPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId || p.cards.length >= 12) return p;
        const newCard: CustomPageCard = {
          id: `card-${Date.now().toString(36)}`,
          badge: 'Highlight',
          title: 'New Section Card',
          subtitle: 'Project 201 Initiative',
          description: 'Click any text or image on this card to customize it.',
          image: 'https://lh3.googleusercontent.com/d/14Bbiwk_VYTyHK4mIsDK6GoPHe7HNYARh',
          linkLabel: 'Learn More',
          linkUrl: 'contact',
        };
        return { ...p, cards: [...p.cards, newCard] };
      })
    );
    setHasUnsavedChanges(true);
  }, []);

  const removeCustomPageCard = useCallback((pageId: string, cardId: string) => {
    setDraftCustomPages((prev) =>
      prev.map((p) => {
        if (p.id !== pageId) return p;
        return { ...p, cards: p.cards.filter((c) => c.id !== cardId) };
      })
    );
    setHasUnsavedChanges(true);
  }, []);

  const deleteCustomPage = useCallback((pageId: string) => {
    setDraftCustomPages((prev) => prev.filter((p) => p.id !== pageId));
    setDraftSettings((prev) => ({
      ...prev,
      pagesOrder: prev.pagesOrder.filter((s) => s !== pageId),
    }));
    setDeletedCustomPageIds((prev) => (prev.includes(pageId) ? prev : [...prev, pageId]));
    setHasUnsavedChanges(true);
  }, []);

  const uploadImageAsset = useCallback(
    async (file: File): Promise<MediaAssetData> => {
      const processed = await processImageFile(file);
      const asset: MediaAssetData = {
        ...processed,
        isPublic: true,
        uploadedBy: user?.uid || 'local-draft',
      };

      // Always store locally right away for instant preview
      setPendingLocalAssets((prev) => {
        const next = [asset, ...prev];
        try {
          localStorage.setItem(LOCAL_ASSETS_CACHE_KEY, JSON.stringify(next.slice(0, 12)));
        } catch {
          // ignore localStorage full
        }
        return next;
      });

      // If signed in as admin, also persist to Firestore immediately
      if (isAdmin && user) {
        const path = `media_assets/${asset.id}`;
        try {
          await setDoc(doc(db, 'media_assets', asset.id), {
            id: asset.id,
            name: asset.name,
            mimeType: asset.mimeType,
            dataUrl: asset.dataUrl,
            width: asset.width,
            height: asset.height,
            sizeBytes: asset.sizeBytes,
            isPublic: true,
            uploadedBy: user.uid,
            createdAt: serverTimestamp(),
          });
          setPendingLocalAssets((prev) => prev.filter((a) => a.id !== asset.id));
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, path);
        }
      }

      return asset;
    },
    [isAdmin, user]
  );

  const deleteImageAsset = useCallback(
    async (assetId: string) => {
      setPendingLocalAssets((prev) => prev.filter((a) => a.id !== assetId));
      if (isAdmin) {
        const path = `media_assets/${assetId}`;
        try {
          await deleteDoc(doc(db, 'media_assets', assetId));
        } catch (err) {
          handleFirestoreError(err, OperationType.DELETE, path);
        }
      }
    },
    [isAdmin]
  );

  const publishAllChanges = useCallback(async (): Promise<boolean> => {
    setPublishError(null);
    if (!user) {
      setPublishError('Please sign in with Google in the console sidebar to publish changes to the live site.');
      return false;
    }
    if (!isAdmin) {
      setPublishError(`Signed in as ${user.email || 'user'}, which does not have console publishing permissions.`);
      return false;
    }

    setIsPublishing(true);
    try {
      // 1. Flush any locally queued media assets to Firestore
      for (const localAsset of pendingLocalAssets) {
        const assetPath = `media_assets/${localAsset.id}`;
        try {
          await setDoc(doc(db, 'media_assets', localAsset.id), {
            id: localAsset.id,
            name: localAsset.name,
            mimeType: localAsset.mimeType,
            dataUrl: localAsset.dataUrl,
            width: localAsset.width,
            height: localAsset.height,
            sizeBytes: localAsset.sizeBytes,
            isPublic: true,
            uploadedBy: user.uid,
            createdAt: serverTimestamp(),
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, assetPath);
        }
      }
      if (pendingLocalAssets.length > 0) {
        setPendingLocalAssets([]);
        try {
          localStorage.removeItem(LOCAL_ASSETS_CACHE_KEY);
        } catch {
          // ignore
        }
      }

      // 2. Delete removed custom pages
      for (const delId of deletedCustomPageIds) {
        const delPath = `custom_pages/${delId}`;
        try {
          await deleteDoc(doc(db, 'custom_pages', delId));
        } catch (err) {
          handleFirestoreError(err, OperationType.DELETE, delPath);
        }
      }

      // 3. Upsert all draft custom pages
      const existingById = new Map<string, CustomPageData>(
        publishedCustomPages.map((p) => [p.id, p])
      );
      for (const page of draftCustomPages) {
        const pagePath = `custom_pages/${page.id}`;
        const prevDoc = existingById.get(page.id);
        try {
          await setDoc(doc(db, 'custom_pages', page.id), {
            id: page.id,
            slug: page.slug,
            title: page.title,
            templateType: page.templateType,
            published: page.published,
            showInNav: page.showInNav,
            heroEyebrow: page.heroEyebrow,
            heroTitle: page.heroTitle,
            heroSubtitle: page.heroSubtitle,
            heroImage: page.heroImage,
            ctaLabel: page.ctaLabel,
            ctaTarget: page.ctaTarget,
            sectionTitle: page.sectionTitle,
            sectionBody: page.sectionBody,
            sectionImage: page.sectionImage,
            cards: page.cards,
            ownerId: prevDoc?.ownerId || user.uid,
            createdAt: prevDoc?.createdAt || serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        } catch (err) {
          handleFirestoreError(err, prevDoc ? OperationType.UPDATE : OperationType.CREATE, pagePath);
        }
      }

      // 4. Write published global site settings
      const settingsPath = 'site_settings/published';
      try {
        await setDoc(doc(db, 'site_settings', 'published'), {
          id: 'published',
          brandName: draftSettings.brandName.slice(0, 80),
          logoUrl: draftSettings.logoUrl.slice(0, 1000),
          announcementBadge: draftSettings.announcementBadge.slice(0, 60),
          announcementText: draftSettings.announcementText.slice(0, 240),
          announcementCta: draftSettings.announcementCta.slice(0, 60),
          announcementVisible: draftSettings.announcementVisible,
          pagesOrder: draftSettings.pagesOrder.slice(0, 50),
          hiddenPages: draftSettings.hiddenPages.slice(0, 50),
          pageLabels: draftSettings.pageLabels,
          textOverrides: draftSettings.textOverrides,
          imageOverrides: draftSettings.imageOverrides,
          updatedBy: user.uid,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, settingsPath);
      }

      setDeletedCustomPageIds([]);
      setHasUnsavedChanges(false);
      setLastPublishedAt(new Date().toLocaleTimeString());
      return true;
    } catch (err) {
      setPublishError(err instanceof Error ? err.message : 'Failed to publish changes.');
      return false;
    } finally {
      setIsPublishing(false);
    }
  }, [
    user,
    isAdmin,
    pendingLocalAssets,
    deletedCustomPageIds,
    publishedCustomPages,
    draftCustomPages,
    draftSettings,
  ]);

  const discardDraftChanges = useCallback(() => {
    setDraftSettings(normalizeSettings(publishedSettings));
    setDraftCustomPages(publishedCustomPages);
    setDeletedCustomPageIds([]);
    setHasUnsavedChanges(false);
    setPublishError(null);
  }, [publishedSettings, publishedCustomPages]);

  const loginWithGoogle = useCallback(async () => {
    setPublishError(null);
    await signInWithGoogle();
  }, []);

  const logout = useCallback(async () => {
    await signOutUser();
  }, []);

  const value: SiteContentContextValue = {
    user,
    authReady,
    isAdmin,
    loginWithGoogle,
    logout,
    isConsoleMode,
    setIsConsoleMode,
    consoleEditMode,
    setConsoleEditMode,
    activeSettings,
    publishedSettings,
    draftSettings,
    activeCustomPages,
    publishedCustomPages,
    draftCustomPages,
    mediaAssets,
    hasUnsavedChanges,
    isPublishing,
    publishError,
    lastPublishedAt,
    getText,
    setText,
    resetText,
    getImage,
    setImage,
    resetImage,
    resolveImageSrc,
    activeTextEdit,
    setActiveTextEdit,
    activeImageEdit,
    setActiveImageEdit,
    updateDraftSettings,
    togglePageVisibility,
    renamePageLabel,
    movePageOrder,
    isPageHidden,
    getPageLabel,
    getOrderedNavPages,
    createCustomPage,
    updateCustomPage,
    updateCustomPageCard,
    addCustomPageCard,
    removeCustomPageCard,
    deleteCustomPage,
    uploadImageAsset,
    deleteImageAsset,
    publishAllChanges,
    discardDraftChanges,
    clearPublishError: () => setPublishError(null),
  };

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error('useSiteContent must be used inside SiteContentProvider');
  }
  return ctx;
}
