import React, { useState, useRef } from 'react';
import { ArrowRight, Plus, Trash2, ImagePlus, Check, Pencil } from 'lucide-react';
import { CustomPageCard, CustomPageData } from '../../types/cms';
import { useSiteContent } from '../../context/SiteContentContext';

interface CustomTemplatePageProps {
  page: CustomPageData;
  onNavigate?: (slug: string) => void;
}

export default function CustomTemplatePage({ page, onNavigate }: CustomTemplatePageProps) {
  const {
    isConsoleMode,
    consoleEditMode,
    updateCustomPage,
    updateCustomPageCard,
    addCustomPageCard,
    removeCustomPageCard,
    resolveImageSrc,
    uploadImageAsset,
    mediaAssets,
  } = useSiteContent();

  const [editingField, setEditingField] = useState<{
    kind: 'page' | 'card';
    field: string;
    cardId?: string;
    label: string;
    value: string;
    multiline?: boolean;
  } | null>(null);

  const [imageTarget, setImageTarget] = useState<{
    kind: 'heroImage' | 'sectionImage' | 'cardImage';
    cardId?: string;
    label: string;
  } | null>(null);

  const [uploadingImg, setUploadingImg] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const canEdit = isConsoleMode && consoleEditMode;

  const openFieldEditor = (
    e: React.MouseEvent,
    kind: 'page' | 'card',
    field: string,
    label: string,
    value: string,
    multiline = false,
    cardId?: string
  ) => {
    if (!canEdit) return;
    e.preventDefault();
    e.stopPropagation();
    setEditingField({ kind, field, cardId, label, value, multiline });
  };

  const handleSaveField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingField) return;
    if (editingField.kind === 'page') {
      updateCustomPage(page.id, { [editingField.field]: editingField.value } as Partial<CustomPageData>);
    } else if (editingField.cardId) {
      updateCustomPageCard(page.id, editingField.cardId, {
        [editingField.field]: editingField.value,
      } as Partial<CustomPageCard>);
    }
    setEditingField(null);
  };

  const handleUploadImage = async (files: FileList | null) => {
    if (!files || files.length === 0 || !imageTarget) return;
    setUploadingImg(true);
    try {
      const asset = await uploadImageAsset(files[0]);
      const refStr = `asset://${asset.id}`;
      if (imageTarget.kind === 'heroImage') {
        updateCustomPage(page.id, { heroImage: refStr });
      } else if (imageTarget.kind === 'sectionImage') {
        updateCustomPage(page.id, { sectionImage: refStr });
      } else if (imageTarget.cardId) {
        updateCustomPageCard(page.id, imageTarget.cardId, { image: refStr });
      }
      setImageTarget(null);
    } finally {
      setUploadingImg(false);
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageTarget || !urlValue.trim()) return;
    const val = urlValue.trim();
    if (imageTarget.kind === 'heroImage') {
      updateCustomPage(page.id, { heroImage: val });
    } else if (imageTarget.kind === 'sectionImage') {
      updateCustomPage(page.id, { sectionImage: val });
    } else if (imageTarget.cardId) {
      updateCustomPageCard(page.id, imageTarget.cardId, { image: val });
    }
    setImageTarget(null);
    setUrlValue('');
  };

  const handleCtaClick = (target: string) => {
    if (!target) return;
    if (target.startsWith('http://') || target.startsWith('https://')) {
      window.open(target, '_blank', 'noopener,noreferrer');
    } else {
      onNavigate?.(target.replace(/^\//, ''));
    }
  };

  const editableRing = canEdit
    ? 'cursor-pointer rounded outline-2 outline-dashed outline-sky-400/75 outline-offset-2 hover:outline-sky-300 hover:bg-sky-500/10'
    : '';

  return (
    <div className="pt-24 min-h-screen bg-white text-slate-900">
      {/* Hero Banner */}
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={resolveImageSrc(page.heroImage)}
            alt={page.heroTitle}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-brand-blue/70 to-slate-950/60" />
        </div>

        {canEdit && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setImageTarget({ kind: 'heroImage', label: 'Page Hero Background' });
            }}
            className="absolute top-6 right-6 z-20 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-950/90 hover:bg-slate-900 text-white border border-sky-400/60 text-xs font-semibold cursor-pointer shadow-lg"
          >
            <ImagePlus className="w-3.5 h-3.5 text-sky-400" />
            <span>Change Hero Image</span>
          </button>
        )}

        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center space-y-6">
          <span
            onClick={(e) =>
              openFieldEditor(e, 'page', 'heroEyebrow', 'Hero Eyebrow', page.heroEyebrow)
            }
            className={`inline-block text-brand-light-blue font-bold uppercase tracking-[0.25em] text-xs font-display ${editableRing}`}
          >
            {page.heroEyebrow}
          </span>

          <h1
            onClick={(e) =>
              openFieldEditor(e, 'page', 'heroTitle', 'Hero Headline', page.heroTitle)
            }
            className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight leading-tight text-balance mx-auto max-w-4xl ${editableRing}`}
          >
            {page.heroTitle}
          </h1>

          <p
            onClick={(e) =>
              openFieldEditor(e, 'page', 'heroSubtitle', 'Hero Subtitle', page.heroSubtitle, true)
            }
            className={`max-w-2xl mx-auto text-slate-200 font-light text-base md:text-lg leading-relaxed ${editableRing}`}
          >
            {page.heroSubtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={(e) => {
                if (canEdit) {
                  openFieldEditor(e, 'page', 'ctaLabel', 'CTA Button Label', page.ctaLabel);
                } else {
                  handleCtaClick(page.ctaTarget);
                }
              }}
              className="bg-brand-light-blue hover:bg-white text-brand-blue px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider font-display inline-flex items-center gap-2 transition-colors shadow-xl cursor-pointer"
            >
              <span>{page.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {canEdit && (
              <button
                type="button"
                onClick={(e) =>
                  openFieldEditor(
                    e,
                    'page',
                    'ctaTarget',
                    'CTA Target (page slug like donate/contact or https:// URL)',
                    page.ctaTarget
                  )
                }
                className="px-3.5 py-2 rounded-lg bg-slate-950/80 border border-white/20 text-xs text-slate-200 hover:text-white cursor-pointer"
              >
                <Pencil className="w-3 h-3 inline mr-1.5" />
                Target: /{page.ctaTarget}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Feature / Story Split Section */}
      <section className="py-20 border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-brand-light-blue font-bold uppercase tracking-[0.2em] text-[10px] font-display block">
                {page.templateType.toUpperCase()} OVERVIEW
              </span>
              <h2
                onClick={(e) =>
                  openFieldEditor(e, 'page', 'sectionTitle', 'Section Heading', page.sectionTitle)
                }
                className={`font-display text-3xl md:text-4xl font-bold text-slate-900 uppercase tracking-tight ${editableRing}`}
              >
                {page.sectionTitle}
              </h2>
              <p
                onClick={(e) =>
                  openFieldEditor(e, 'page', 'sectionBody', 'Section Paragraph', page.sectionBody, true)
                }
                className={`text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line ${editableRing}`}
              >
                {page.sectionBody}
              </p>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100 relative">
                <img
                  src={resolveImageSrc(page.sectionImage)}
                  alt={page.sectionTitle}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {canEdit && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageTarget({ kind: 'sectionImage', label: 'Section Feature Image' });
                    }}
                    className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/90 hover:bg-slate-900 text-white border border-sky-400/60 text-xs font-semibold cursor-pointer shadow-lg"
                  >
                    <ImagePlus className="w-3.5 h-3.5 text-sky-400" />
                    <span>Replace Image</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Cards / Highlights Grid */}
      <section className="py-20 bg-slate-50/70">
        <div className="container mx-auto px-4 max-w-6xl space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 uppercase">
                {page.templateType === 'gallery' ? 'Photo & Media Highlights' : 'Featured Sections'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {canEdit
                  ? 'Click any card title, description, or photo to edit. Add or remove cards anytime.'
                  : 'Explore opportunities and highlights from Project 201.'}
              </p>
            </div>

            {canEdit && page.cards.length < 12 && (
              <button
                type="button"
                onClick={() => addCustomPageCard(page.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-900 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Card</span>
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {page.cards.map((card) => (
              <div
                key={card.id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm relative group"
              >
                {canEdit && (
                  <button
                    type="button"
                    onClick={() => removeCustomPageCard(page.id, card.id)}
                    title="Remove card"
                    className="absolute top-3 left-3 z-20 p-2 rounded-lg bg-red-600/90 hover:bg-red-700 text-white shadow cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                <div>
                  <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                    <img
                      src={resolveImageSrc(card.image)}
                      alt={card.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {canEdit && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImageTarget({
                            kind: 'cardImage',
                            cardId: card.id,
                            label: `Card Image: ${card.title}`,
                          });
                        }}
                        className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/90 hover:bg-slate-900 text-white border border-sky-400/60 text-xs font-semibold cursor-pointer shadow-lg"
                      >
                        <ImagePlus className="w-3.5 h-3.5 text-sky-400" />
                        <span>Replace</span>
                      </button>
                    )}
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span
                        onClick={(e) =>
                          openFieldEditor(e, 'card', 'badge', 'Card Category', card.badge, false, card.id)
                        }
                        className={`font-semibold text-brand-blue uppercase tracking-wider ${editableRing}`}
                      >
                        {card.badge}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span
                        onClick={(e) =>
                          openFieldEditor(e, 'card', 'subtitle', 'Card Subtitle', card.subtitle, false, card.id)
                        }
                        className={editableRing}
                      >
                        {card.subtitle}
                      </span>
                    </div>

                    <h4
                      onClick={(e) =>
                        openFieldEditor(e, 'card', 'title', 'Card Title', card.title, false, card.id)
                      }
                      className={`font-display font-bold text-lg text-slate-900 uppercase tracking-tight ${editableRing}`}
                    >
                      {card.title}
                    </h4>

                    <p
                      onClick={(e) =>
                        openFieldEditor(
                          e,
                          'card',
                          'description',
                          'Card Description',
                          card.description,
                          true,
                          card.id
                        )
                      }
                      className={`text-slate-600 text-xs leading-relaxed ${editableRing}`}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>

                {card.linkLabel && (
                  <div className="px-6 pb-6 pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        if (canEdit) {
                          openFieldEditor(
                            e,
                            'card',
                            'linkLabel',
                            'Card Link Label',
                            card.linkLabel,
                            false,
                            card.id
                          );
                        } else {
                          handleCtaClick(card.linkUrl);
                        }
                      }}
                      className="text-xs font-bold text-brand-blue uppercase tracking-wider inline-flex items-center gap-1.5 hover:text-brand-light-blue transition-colors cursor-pointer"
                    >
                      <span>{card.linkLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inline Card/Page Text Modal */}
      {editingField && (
        <div
          className="fixed inset-0 z-[110] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setEditingField(null)}
        >
          <div
            className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-display font-bold text-slate-900 text-sm">{editingField.label}</h3>
            </div>
            <form onSubmit={handleSaveField} className="p-6 space-y-4">
              {editingField.multiline ? (
                <textarea
                  rows={5}
                  autoFocus
                  value={editingField.value}
                  onChange={(e) => setEditingField({ ...editingField, value: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900"
                />
              ) : (
                <input
                  type="text"
                  autoFocus
                  value={editingField.value}
                  onChange={(e) => setEditingField({ ...editingField, value: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900"
                />
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingField(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-blue text-white text-xs font-semibold cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Apply</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Template Image Upload / Picker Modal */}
      {imageTarget && (
        <div
          className="fixed inset-0 z-[110] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setImageTarget(null)}
        >
          <div
            className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-display font-bold text-slate-900 text-sm">
                Upload or Select Image ({imageTarget.label})
              </h3>
            </div>
            <div className="p-6 space-y-5 overflow-y-auto">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleUploadImage(e.target.files)}
              />
              <button
                type="button"
                disabled={uploadingImg}
                onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-slate-300 hover:border-brand-blue rounded-xl p-5 text-center text-sm font-semibold text-slate-700 hover:bg-blue-50/40 cursor-pointer"
              >
                {uploadingImg ? 'Uploading & Optimizing...' : 'Upload Image from Computer'}
              </button>

              <form onSubmit={handleApplyUrl} className="flex gap-2">
                <input
                  type="url"
                  value={urlValue}
                  onChange={(e) => setUrlValue(e.target.value)}
                  placeholder="Or paste image URL (https://...)"
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold cursor-pointer"
                >
                  Apply URL
                </button>
              </form>

              {mediaAssets.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {mediaAssets.map((asset) => {
                    const refStr = `asset://${asset.id}`;
                    return (
                      <button
                        key={asset.id}
                        type="button"
                        onClick={() => {
                          if (imageTarget.kind === 'heroImage') {
                            updateCustomPage(page.id, { heroImage: refStr });
                          } else if (imageTarget.kind === 'sectionImage') {
                            updateCustomPage(page.id, { sectionImage: refStr });
                          } else if (imageTarget.cardId) {
                            updateCustomPageCard(page.id, imageTarget.cardId, { image: refStr });
                          }
                          setImageTarget(null);
                        }}
                        className="aspect-square rounded-xl overflow-hidden border border-slate-200 hover:border-brand-blue cursor-pointer"
                      >
                        <img
                          src={resolveImageSrc(refStr)}
                          alt={asset.name}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                type="button"
                onClick={() => setImageTarget(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
