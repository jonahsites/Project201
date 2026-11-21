import React, { useState, useEffect } from 'react';
import { Pencil, ImagePlus } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';

interface EditableTextProps {
  id: string;
  defaultText: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  className?: string;
  label?: string;
  multiline?: boolean;
}

export function EditableText({
  id,
  defaultText,
  as = 'span',
  className = '',
  label,
  multiline = false,
}: EditableTextProps) {
  const { getText, isConsoleMode, consoleEditMode, setActiveTextEdit } = useSiteContent();
  const value = getText(id, defaultText);
  const Tag = as;

  if (!isConsoleMode || !consoleEditMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      role="button"
      tabIndex={0}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveTextEdit({ id, label: label || id, defaultText, multiline });
      }}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          setActiveTextEdit({ id, label: label || id, defaultText, multiline });
        }
      }}
      title="Click to edit text"
      className={`${className} group/edit-text relative cursor-pointer rounded outline-2 outline-dashed outline-sky-400/75 outline-offset-2 hover:outline-sky-300 hover:bg-sky-500/15 transition-colors`}
    >
      {value}
      <span
        aria-hidden="true"
        className="pointer-events-none opacity-0 group-hover/edit-text:opacity-100 transition-opacity inline-flex items-center gap-1 ml-1.5 align-middle px-1.5 py-0.5 rounded bg-slate-900 text-white text-[10px] font-sans font-semibold normal-case tracking-normal shadow-sm"
      >
        <Pencil className="w-2.5 h-2.5 text-sky-400" />
        Edit
      </span>
    </Tag>
  );
}

interface EditableImageProps {
  id: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  label?: string;
  fallbackText?: string;
  isBackground?: boolean;
}

export function EditableImage({
  id,
  defaultSrc,
  alt,
  className = '',
  label,
  fallbackText,
  isBackground = false,
}: EditableImageProps) {
  const { getImage, isConsoleMode, consoleEditMode, setActiveImageEdit } = useSiteContent();
  const src = getImage(id, defaultSrc);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const handleOpenEditor = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageEdit({ id, label: label || alt || id, defaultSrc });
  };

  return (
    <>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className={className}
        />
      ) : (
        <div
          className={`${className} bg-gradient-to-br from-slate-800 via-slate-900 to-brand-blue/40 flex flex-col items-center justify-center p-4 text-center text-white/70`}
        >
          <ImagePlus className="w-6 h-6 mb-1.5 text-brand-light-blue" />
          <span className="text-xs font-medium">{fallbackText || alt}</span>
        </div>
      )}

      {isConsoleMode && consoleEditMode && (
        <button
          type="button"
          onClick={handleOpenEditor}
          title="Replace or upload image"
          className={
            isBackground
              ? 'absolute top-28 right-6 z-30 inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-950/90 hover:bg-slate-900 text-white border border-sky-400/60 text-xs font-semibold shadow-lg cursor-pointer transition-colors whitespace-nowrap'
              : 'absolute bottom-3 right-3 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/90 hover:bg-slate-900 text-white border border-sky-400/60 text-xs font-semibold shadow-lg cursor-pointer transition-colors whitespace-nowrap'
          }
        >
          <ImagePlus className="w-3.5 h-3.5 text-sky-400" />
          <span>{isBackground ? 'Replace Background Image' : 'Replace Image'}</span>
        </button>
      )}
    </>
  );
}
