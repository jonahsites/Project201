import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, RotateCcw, Check, Image as ImageIcon, Link as LinkIcon, Loader2 } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';

export function EditorModals() {
  const {
    activeTextEdit,
    setActiveTextEdit,
    getText,
    setText,
    resetText,
    activeImageEdit,
    setActiveImageEdit,
    activeSettings,
    setImage,
    resetImage,
    mediaAssets,
    uploadImageAsset,
    resolveImageSrc,
  } = useSiteContent();

  // Text editor local state
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    if (activeTextEdit) {
      setTextValue(getText(activeTextEdit.id, activeTextEdit.defaultText));
    }
  }, [activeTextEdit, getText]);

  // Image editor local state
  const [urlInput, setUrlInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeImageEdit) {
      const override = activeSettings.imageOverrides[activeImageEdit.id] || '';
      setUrlInput(override.startsWith('asset://') ? '' : override);
      setUploadError(null);
    }
  }, [activeImageEdit, activeSettings.imageOverrides]);

  const handleSaveText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTextEdit) return;
    setText(activeTextEdit.id, textValue);
    setActiveTextEdit(null);
  };

  const handleFileChange = async (files: FileList | null) => {
    if (!files || files.length === 0 || !activeImageEdit) return;
    setUploading(true);
    setUploadError(null);
    try {
      const asset = await uploadImageAsset(files[0]);
      setImage(activeImageEdit.id, `asset://${asset.id}`);
      setActiveImageEdit(null);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeImageEdit || !urlInput.trim()) return;
    setImage(activeImageEdit.id, urlInput.trim());
    setActiveImageEdit(null);
  };

  return (
    <>
      {/* TEXT EDIT MODAL */}
      {activeTextEdit && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveTextEdit(null)}
        >
          <div
            className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-display font-bold text-slate-900 text-base">Edit Text</h3>
                <p className="text-xs text-slate-500 font-mono truncate max-w-sm">
                  {activeTextEdit.label}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTextEdit(null)}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveText} className="p-6 space-y-4">
              {activeTextEdit.multiline ? (
                <textarea
                  rows={5}
                  autoFocus
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              ) : (
                <input
                  type="text"
                  autoFocus
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              )}

              <div className="flex items-center justify-between pt-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    resetText(activeTextEdit.id);
                    setActiveTextEdit(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTextEdit(null)}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-blue text-white text-xs font-semibold hover:bg-blue-900 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Apply Text</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* IMAGE UPLOAD & PICKER MODAL */}
      {activeImageEdit && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveImageEdit(null)}
        >
          <div
            className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <div>
                <h3 className="font-display font-bold text-slate-900 text-base">
                  Replace or Upload Image
                </h3>
                <p className="text-xs text-slate-500 truncate max-w-md">
                  Slot: {activeImageEdit.label}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveImageEdit(null)}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Upload from Device */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e.target.files)}
                />
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-slate-300 hover:border-brand-blue rounded-xl p-6 flex flex-col items-center justify-center gap-2 bg-slate-50 hover:bg-blue-50/40 transition-colors cursor-pointer"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-7 h-7 text-brand-blue animate-spin" />
                      <span className="text-sm font-semibold text-slate-800">
                        Optimizing &amp; Uploading Image...
                      </span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-7 h-7 text-brand-blue" />
                      <span className="text-sm font-semibold text-slate-800">
                        Upload Image from Computer
                      </span>
                      <span className="text-xs text-slate-500">
                        PNG, JPG, WebP, or GIF — automatically optimized for fast web delivery
                      </span>
                    </>
                  )}
                </button>
                {uploadError && (
                  <p className="mt-2 text-xs font-medium text-red-600">{uploadError}</p>
                )}
              </div>

              {/* Paste URL */}
              <form onSubmit={handleApplyUrl} className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Or paste an external image URL
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer whitespace-nowrap"
                  >
                    Use URL
                  </button>
                </div>
              </form>

              {/* Media Library */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                    Uploaded Media Library ({mediaAssets.length})
                  </span>
                </div>

                {mediaAssets.length === 0 ? (
                  <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 text-center text-xs text-slate-500">
                    No images uploaded yet. Upload your first photo above to save it in your library.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {mediaAssets.map((asset) => {
                      const refStr = `asset://${asset.id}`;
                      const isCurrent = activeSettings.imageOverrides[activeImageEdit.id] === refStr;
                      return (
                        <button
                          key={asset.id}
                          type="button"
                          onClick={() => {
                            setImage(activeImageEdit.id, refStr);
                            setActiveImageEdit(null);
                          }}
                          className={`group relative aspect-square rounded-xl overflow-hidden border transition-all cursor-pointer text-left ${
                            isCurrent
                              ? 'border-brand-blue ring-2 ring-brand-blue'
                              : 'border-slate-200 hover:border-slate-400'
                          }`}
                        >
                          <img
                            src={resolveImageSrc(refStr)}
                            alt={asset.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-slate-950/75 px-2 py-1 text-[10px] text-white truncate">
                            {asset.name}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => {
                  resetImage(activeImageEdit.id);
                  setActiveImageEdit(null);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default Image</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveImageEdit(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
