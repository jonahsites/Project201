import React, { useState, useRef } from 'react';
import {
  LayoutTemplate,
  FileText,
  Image as ImageIcon,
  Settings,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  ArrowUp,
  ArrowDown,
  Pencil,
  Upload,
  Check,
  X,
  ExternalLink,
  LogIn,
  LogOut,
  RotateCcw,
  Loader2,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import { PAGE_TEMPLATES, TemplateType } from '../../types/cms';
import { EditorModals } from './EditorModals';

interface ConsoleWorkspaceProps {
  previewSlug: string;
  onSelectPreviewSlug: (slug: string) => void;
  onExitConsole: (targetSlug?: string) => void;
  renderWebsitePreview: () => React.ReactNode;
}

export default function ConsoleWorkspace({
  previewSlug,
  onSelectPreviewSlug,
  onExitConsole,
  renderWebsitePreview,
}: ConsoleWorkspaceProps) {
  const {
    user,
    authReady,
    isAdmin,
    loginWithGoogle,
    logout,
    consoleEditMode,
    setConsoleEditMode,
    activeSettings,
    updateDraftSettings,
    getOrderedNavPages,
    togglePageVisibility,
    renamePageLabel,
    movePageOrder,
    createCustomPage,
    deleteCustomPage,
    mediaAssets,
    uploadImageAsset,
    deleteImageAsset,
    resolveImageSrc,
    hasUnsavedChanges,
    isPublishing,
    publishError,
    lastPublishedAt,
    publishAllChanges,
    discardDraftChanges,
    clearPublishError,
  } = useSiteContent();

  const [sidebarTab, setSidebarTab] = useState<'pages' | 'site' | 'media'>('pages');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Add Page Template Modal
  const [showAddPageModal, setShowAddPageModal] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('campaign');

  // Rename Page inline state
  const [renamingSlug, setRenamingSlug] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  // Media upload state
  const [mediaUploading, setMediaUploading] = useState(false);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const mediaFileInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  // Publish toast
  const [publishSuccessBanner, setPublishSuccessBanner] = useState(false);

  const orderedPages = getOrderedNavPages();

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageTitle.trim()) return;
    const created = createCustomPage(selectedTemplate, newPageTitle, newPageSlug || undefined);
    setShowAddPageModal(false);
    setNewPageTitle('');
    setNewPageSlug('');
    onSelectPreviewSlug(created.slug);
  };

  const handleMediaUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setMediaUploading(true);
    setMediaError(null);
    try {
      await uploadImageAsset(files[0]);
    } catch (err) {
      setMediaError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setMediaUploading(false);
    }
  };

  const handleLogoUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setMediaUploading(true);
    setMediaError(null);
    try {
      const asset = await uploadImageAsset(files[0]);
      updateDraftSettings({ logoUrl: `asset://${asset.id}` });
    } catch (err) {
      setMediaError(err instanceof Error ? err.message : 'Logo upload failed.');
    } finally {
      setMediaUploading(false);
    }
  };

  const handlePublish = async () => {
    const ok = await publishAllChanges();
    if (ok) {
      setPublishSuccessBanner(true);
      setTimeout(() => setPublishSuccessBanner(false), 4000);
    }
  };

  const currentPageObj = orderedPages.find((p) => p.slug === previewSlug);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col">
      {/* Top Console Header */}
      <header className="h-14 bg-slate-950 text-white border-b border-slate-800 px-4 flex items-center justify-between gap-4 shrink-0 sticky top-0 z-[70]">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer shrink-0"
            title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          >
            {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-2 text-xs sm:text-sm min-w-0 truncate">
            <span className="font-display font-bold text-white whitespace-nowrap">Project 201</span>
            <span className="text-slate-500">/</span>
            <span className="text-sky-400 font-medium whitespace-nowrap">Site Console</span>
            <span className="text-slate-500 hidden sm:inline">/</span>
            <span className="text-slate-300 truncate hidden sm:inline">
              {currentPageObj?.label || previewSlug}
            </span>
          </div>

          {hasUnsavedChanges && (
            <span className="hidden md:inline-block text-xs font-medium text-amber-300 whitespace-nowrap ml-2">
              Unsaved draft changes
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Edit Mode / Clean Preview segmented toggle */}
          <div className="hidden sm:flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800">
            <button
              type="button"
              onClick={() => setConsoleEditMode(true)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                consoleEditMode
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Edit Mode
            </button>
            <button
              type="button"
              onClick={() => setConsoleEditMode(false)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                !consoleEditMode
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Clean Preview
            </button>
          </div>

          {hasUnsavedChanges && (
            <button
              type="button"
              onClick={discardDraftChanges}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Discard</span>
            </button>
          )}

          <button
            type="button"
            disabled={isPublishing}
            onClick={handlePublish}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-brand-light-blue hover:bg-white text-slate-950 text-xs font-bold cursor-pointer transition-colors whitespace-nowrap disabled:opacity-60"
          >
            {isPublishing ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Publish to Live Site</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onExitConsole(previewSlug)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-800 cursor-pointer whitespace-nowrap"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Live Site</span>
          </button>
        </div>
      </header>

      {/* Status Notices */}
      {(publishError || publishSuccessBanner) && (
        <div
          className={`px-4 py-2.5 text-xs flex items-center justify-between border-b ${
            publishError
              ? 'bg-red-50 text-red-800 border-red-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              {publishError
                ? publishError
                : `Published live at ${lastPublishedAt}. Visitors now see your updated site.`}
            </span>
          </div>
          {publishError && (
            <button
              type="button"
              onClick={clearPublishError}
              className="p-1 rounded hover:bg-red-100 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Main Split Body: Sidebar + Duplicate Website Viewport */}
      <div className="flex-1 flex min-h-0">
        {/* Left Sidebar */}
        {sidebarOpen && (
          <aside className="w-72 lg:w-80 bg-white border-r border-slate-200 flex flex-col shrink-0">
            {/* Auth Box */}
            <div className="p-4 border-b border-slate-200 bg-slate-50/80 space-y-2.5">
              {!authReady ? (
                <div className="text-xs text-slate-500">Checking publisher access...</div>
              ) : user ? (
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-900 truncate">
                      {user.email}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {isAdmin ? 'Admin · Ready to publish' : 'Signed in (Read-only account)'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={logout}
                    className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-slate-900 cursor-pointer shrink-0"
                    title="Sign out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Edit freely in draft mode. Sign in with Google to publish updates to the live website.
                  </p>
                  <button
                    type="button"
                    onClick={loginWithGoogle}
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign in with Google</span>
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar Segmented Tabs */}
            <div className="p-2 border-b border-slate-200 grid grid-cols-3 gap-1 bg-slate-50">
              <button
                type="button"
                onClick={() => setSidebarTab('pages')}
                className={`py-2 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                  sidebarTab === 'pages'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Pages</span>
              </button>
              <button
                type="button"
                onClick={() => setSidebarTab('site')}
                className={`py-2 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                  sidebarTab === 'site'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Site Info</span>
              </button>
              <button
                type="button"
                onClick={() => setSidebarTab('media')}
                className={`py-2 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                  sidebarTab === 'media'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Media</span>
              </button>
            </div>

            {/* Sidebar Tab Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {sidebarTab === 'pages' && (
                <>
                  <button
                    type="button"
                    onClick={() => setShowAddPageModal(true)}
                    className="w-full py-2.5 px-3 rounded-lg bg-brand-blue hover:bg-blue-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Page from Template</span>
                  </button>

                  <div className="space-y-1.5">
                    {orderedPages.map((pg, idx) => {
                      const isActive = previewSlug === pg.slug;
                      const isRenaming = renamingSlug === pg.slug;

                      return (
                        <div
                          key={pg.slug}
                          className={`rounded-xl border p-2.5 transition-colors ${
                            isActive
                              ? 'border-brand-blue bg-blue-50/60'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          {isRenaming ? (
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                renamePageLabel(pg.slug, renameValue);
                                setRenamingSlug(null);
                              }}
                              className="flex items-center gap-1.5"
                            >
                              <input
                                type="text"
                                autoFocus
                                value={renameValue}
                                onChange={(e) => setRenameValue(e.target.value)}
                                className="flex-1 min-w-0 rounded border border-slate-300 px-2 py-1 text-xs text-slate-900"
                              />
                              <button
                                type="submit"
                                className="p-1.5 rounded bg-brand-blue text-white cursor-pointer"
                              >
                                <Check className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setRenamingSlug(null)}
                                className="p-1.5 rounded bg-slate-100 text-slate-600 cursor-pointer"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </form>
                          ) : (
                            <div className="flex items-center justify-between gap-2">
                              <button
                                type="button"
                                onClick={() => onSelectPreviewSlug(pg.slug)}
                                className="flex-1 min-w-0 text-left cursor-pointer"
                              >
                                <div className="text-xs font-semibold text-slate-900 truncate">
                                  {pg.label}
                                </div>
                                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                                  <span className="font-mono truncate">
                                    /{pg.slug === 'home' ? '' : pg.slug}
                                  </span>
                                  {pg.isCustom && (
                                    <>
                                      <span>·</span>
                                      <span className="text-brand-blue font-medium">Template</span>
                                    </>
                                  )}
                                  {pg.hidden && (
                                    <>
                                      <span>·</span>
                                      <span className="text-amber-700 font-medium">Hidden</span>
                                    </>
                                  )}
                                </div>
                              </button>

                              <div className="flex items-center gap-0.5 shrink-0">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => movePageOrder(pg.slug, 'up')}
                                  title="Move up"
                                  className="p-1.5 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                                >
                                  <ArrowUp className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === orderedPages.length - 1}
                                  onClick={() => movePageOrder(pg.slug, 'down')}
                                  title="Move down"
                                  className="p-1.5 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                                >
                                  <ArrowDown className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setRenamingSlug(pg.slug);
                                    setRenameValue(pg.label);
                                  }}
                                  title="Rename nav label"
                                  className="p-1.5 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                                >
                                  <Pencil className="w-3 h-3" />
                                </button>
                                {pg.slug !== 'home' && (
                                  <button
                                    type="button"
                                    onClick={() => togglePageVisibility(pg.slug)}
                                    title={pg.hidden ? 'Restore page to site' : 'Remove / hide page from site'}
                                    className={`p-1.5 rounded cursor-pointer ${
                                      pg.hidden
                                        ? 'text-amber-600 hover:bg-amber-50'
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                                  >
                                    {pg.hidden ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                  </button>
                                )}
                                {pg.isCustom && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      deleteCustomPage(pg.slug);
                                      if (previewSlug === pg.slug) {
                                        onSelectPreviewSlug('home');
                                      }
                                    }}
                                    title="Delete template page"
                                    className="p-1.5 rounded text-red-500 hover:bg-red-50 cursor-pointer"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {sidebarTab === 'site' && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700">
                      Brand Wordmark
                    </label>
                    <input
                      type="text"
                      value={activeSettings.brandName}
                      onChange={(e) => updateDraftSettings({ brandName: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700">
                      Site Logo
                    </label>
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50">
                      <img
                        src={resolveImageSrc(activeSettings.logoUrl)}
                        alt="Site Logo"
                        className="w-10 h-10 object-contain rounded bg-slate-900 p-1"
                      />
                      <input
                        ref={logoFileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleLogoUpload(e.target.files)}
                      />
                      <button
                        type="button"
                        onClick={() => logoFileInputRef.current?.click()}
                        className="flex-1 py-2 px-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-medium text-slate-800 cursor-pointer"
                      >
                        Upload New Logo
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700">
                        Top Announcement Bar
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateDraftSettings({
                            announcementVisible: !activeSettings.announcementVisible,
                          })
                        }
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                          activeSettings.announcementVisible
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {activeSettings.announcementVisible ? 'Visible' : 'Hidden'}
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] font-medium text-slate-500">
                        Badge Label
                      </label>
                      <input
                        type="text"
                        value={activeSettings.announcementBadge}
                        onChange={(e) => updateDraftSettings({ announcementBadge: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-900"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] font-medium text-slate-500">
                        Banner Message
                      </label>
                      <input
                        type="text"
                        value={activeSettings.announcementText}
                        onChange={(e) => updateDraftSettings({ announcementText: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-900"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] font-medium text-slate-500">
                        Action Button Label
                      </label>
                      <input
                        type="text"
                        value={activeSettings.announcementCta}
                        onChange={(e) => updateDraftSettings({ announcementCta: e.target.value })}
                        className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {sidebarTab === 'media' && (
                <div className="space-y-4">
                  <input
                    ref={mediaFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleMediaUpload(e.target.files)}
                  />
                  <button
                    type="button"
                    disabled={mediaUploading}
                    onClick={() => mediaFileInputRef.current?.click()}
                    className="w-full py-2.5 px-3 rounded-lg bg-brand-blue hover:bg-blue-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {mediaUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Upload Image</span>
                      </>
                    )}
                  </button>

                  {mediaError && <p className="text-xs text-red-600">{mediaError}</p>}

                  {mediaAssets.length === 0 ? (
                    <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 text-center text-xs text-slate-500">
                      Upload photos here or click any image on the website preview to replace it.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {mediaAssets.map((asset) => (
                        <div
                          key={asset.id}
                          className="flex items-center gap-3 p-2 rounded-xl border border-slate-200 bg-white"
                        >
                          <img
                            src={asset.dataUrl}
                            alt={asset.name}
                            className="w-12 h-12 rounded-lg object-cover shrink-0 border border-slate-200"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-slate-900 truncate">
                              {asset.name}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono tabular-nums">
                              {asset.width}×{asset.height} · {Math.round(asset.sizeBytes / 1024)} KB
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => deleteImageAsset(asset.id)}
                            title="Delete asset"
                            className="p-1.5 rounded text-red-500 hover:bg-red-50 cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Right Duplicate Website Viewport */}
        <main className="flex-1 min-w-0 flex flex-col bg-slate-200/70">
          {/* Edit Mode Helper Strip */}
          <div className="bg-white border-b border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-blue shrink-0" />
              <span>
                {consoleEditMode
                  ? 'Click any outlined text or image below to edit or upload a replacement. Switch pages using the navbar or sidebar.'
                  : 'Viewing clean site preview. Switch back to Edit Mode to modify text or images.'}
              </span>
            </div>
            {currentPageObj?.hidden && (
              <span className="text-amber-700 font-semibold">
                This page is currently hidden from the live public site
              </span>
            )}
          </div>

          {/* Exact Duplicate Website Canvas */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5">
            <div className="mx-auto max-w-[1440px] bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden min-h-full relative">
              {renderWebsitePreview()}
            </div>
          </div>
        </main>
      </div>

      {/* Add Page From Template Modal */}
      {showAddPageModal && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowAddPageModal(false)}
        >
          <div
            className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4 text-brand-blue" />
                <h3 className="font-display font-bold text-slate-900 text-base">
                  Add New Page from Template
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddPageModal(false)}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePage} className="p-6 space-y-5 overflow-y-auto">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Page Title *
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={newPageTitle}
                    onChange={(e) => setNewPageTitle(e.target.value)}
                    placeholder="e.g. Summer Boxing Camp"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    URL Slug (Optional)
                  </label>
                  <input
                    type="text"
                    value={newPageSlug}
                    onChange={(e) => setNewPageSlug(e.target.value)}
                    placeholder="e.g. summer-boxing-camp"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Choose a Page Template
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {PAGE_TEMPLATES.map((tpl) => {
                    const selected = selectedTemplate === tpl.type;
                    return (
                      <button
                        key={tpl.type}
                        type="button"
                        onClick={() => setSelectedTemplate(tpl.type)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-1.5 ${
                          selected
                            ? 'border-brand-blue bg-blue-50/70 ring-1 ring-brand-blue'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
                            {tpl.badge}
                          </span>
                          {selected && <Check className="w-4 h-4 text-brand-blue" />}
                        </div>
                        <div className="font-display font-bold text-sm text-slate-900">
                          {tpl.name}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{tpl.summary}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPageModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-brand-blue hover:bg-blue-900 text-white text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Page</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inline Text & Image Modals */}
      <EditorModals />
    </div>
  );
}
