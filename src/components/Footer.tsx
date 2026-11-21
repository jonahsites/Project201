import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin, SlidersHorizontal } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { EditableImage, EditableText } from './cms/Editable';

interface FooterProps {
  onPageChange?: (page: string) => void;
  embeddedInConsole?: boolean;
}

export default function Footer({ onPageChange, embeddedInConsole = false }: FooterProps) {
  const { activeSettings, getOrderedNavPages } = useSiteContent();
  const visiblePages = getOrderedNavPages().filter((p) => !p.hidden);

  const primaryNavSlugs = ['home', 'holiday-drop', 'about', 'programs', 'merch', 'hire', 'youth-support'];
  const connectSlugs = ['partnerships', 'sponsors', 'contact'];
  const customPages = visiblePages.filter((p) => p.isCustom);

  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <div className="relative">
                <EditableImage
                  id="brand.logo"
                  defaultSrc={activeSettings.logoUrl}
                  alt="Project 201 Logo"
                  label="Footer Brand Logo"
                  className="h-10 w-auto"
                />
              </div>
              <EditableText
                id="brand.name"
                defaultText={activeSettings.brandName}
                label="Brand Name"
                className="font-display font-bold text-xl tracking-tight"
              />
            </div>
            <EditableText
              id="footer.description"
              as="p"
              multiline
              label="Footer Mission Summary"
              defaultText="Project 201 is a professional statewide youth organization. We combine structured athletic development and mental health gatekeeper frameworks to guide the next generation of NJ leaders."
              className="text-slate-400 font-light leading-relaxed text-xs"
            />
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/project201nj?utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-light-blue transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/project201nj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-light-blue transition-colors"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm mb-8 uppercase text-brand-light-blue tracking-widest">
              Navigation
            </h4>
            <div className="flex flex-col space-y-4 text-left items-start">
              {visiblePages
                .filter((p) => primaryNavSlugs.includes(p.slug))
                .map((p) => (
                  <button
                    key={p.slug}
                    onClick={() => onPageChange?.(p.slug)}
                    className={`transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider bg-transparent border-0 p-0 text-left flex items-center gap-1.5 ${
                      p.slug === 'holiday-drop'
                        ? 'text-amber-400 hover:text-amber-300'
                        : p.slug === 'merch'
                          ? 'text-cyan-400 hover:text-white font-semibold'
                          : p.slug === 'hire'
                            ? 'text-brand-light-blue hover:text-white font-semibold'
                            : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{p.label}</span>
                    {p.slug === 'holiday-drop' && (
                      <span className="px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[8px] font-black">
                        1947
                      </span>
                    )}
                  </button>
                ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm mb-8 uppercase text-brand-light-blue tracking-widest">
              Connect
            </h4>
            <div className="flex flex-col space-y-4 text-left items-start">
              {visiblePages
                .filter((p) => connectSlugs.includes(p.slug))
                .map((p) => (
                  <button
                    key={p.slug}
                    onClick={() => onPageChange?.(p.slug)}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider bg-transparent border-0 p-0 text-left"
                  >
                    {p.label}
                  </button>
                ))}
              {customPages.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => onPageChange?.(p.slug)}
                  className="text-brand-light-blue hover:text-white transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider bg-transparent border-0 p-0 text-left"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm mb-8 uppercase text-brand-light-blue tracking-widest">
              Coordinated by
            </h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 shrink-0 bg-brand-light-blue/10 rounded-xl flex items-center justify-center text-brand-light-blue">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <EditableText
                    id="footer.directorName"
                    defaultText="Shawn Kelly"
                    label="Director Name"
                    className="block font-bold text-sm"
                  />
                  <EditableText
                    id="footer.directorTitle"
                    defaultText="Executive Director"
                    label="Director Title"
                    className="text-slate-500 text-[10px] font-bold tracking-wider uppercase block"
                  />
                </div>
              </div>
              <a
                href="mailto:info@project201.org"
                className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors text-xs"
              >
                <div className="w-10 h-10 shrink-0 bg-white/5 rounded-xl flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <EditableText
                  id="footer.email"
                  defaultText="info@project201.org"
                  label="Footer Contact Email"
                />
              </a>
              <a
                href="tel:2017255062"
                className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors text-xs"
              >
                <div className="w-10 h-10 shrink-0 bg-white/5 rounded-xl flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <EditableText
                  id="footer.phone"
                  defaultText="201-725-5062"
                  label="Footer Contact Phone"
                />
              </a>
              <div className="flex items-center gap-4 text-slate-400 text-xs">
                <div className="w-10 h-10 shrink-0 bg-white/5 rounded-xl flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <EditableText
                  id="footer.address"
                  defaultText="576 Avenue A, Bayonne, NJ 07002"
                  label="Footer Mailing Address"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Area */}
        <div className="py-8 my-8 border-t border-b border-white/5 text-center">
          <EditableText
            id="footer.disclaimer"
            as="p"
            multiline
            label="Footer Legal Disclaimer"
            defaultText="Project 201 is a youth mentorship and development organization. We do not provide licensed clinical therapy, psychiatric treatment, or medical services."
            className="text-slate-450 text-xs font-light max-w-3xl mx-auto leading-relaxed"
          />
        </div>

        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5">
          <EditableText
            id="footer.copyright"
            as="p"
            label="Copyright Text"
            defaultText="© 2026 Project 201. All Rights Reserved."
            className="text-slate-500 text-xs font-light"
          />
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <span className="text-slate-650 text-[10px] font-bold uppercase tracking-widest">
              Apparel Powered by
            </span>
            <a
              href="https://www.instagram.com/201customsllc?utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-light-blue hover:text-white transition-colors font-bold tracking-tight text-xs uppercase border border-brand-light-blue/20 bg-brand-light-blue/5 px-2.5 py-1 rounded-lg"
            >
              201 Customs LLC
            </a>
            {!embeddedInConsole && (
              <button
                type="button"
                onClick={() => onPageChange?.('console')}
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-[11px] font-medium border border-white/10 bg-white/5 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Console</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

function User({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
