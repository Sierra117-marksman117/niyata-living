import React from 'react';
import Link from 'next/link';
import { BRAND } from '@/config/brand';
import { COLLECTIONS } from '@/content/collections';
import { ROOMS } from '@/content/rooms';
import { ExternalLink, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-charcoal text-mineral-100 border-t border-charcoal-light mt-auto">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-widest text-mineral-50 block">
              {BRAND.name.toUpperCase()}
            </span>
            <p className="font-serif italic text-mineral-400 text-sm">
              {BRAND.tagline}
            </p>
            <p className="text-xs text-mineral-400 leading-relaxed max-w-sm">
              {BRAND.narrative}
            </p>
            <div className="pt-2">
              <span className="inline-block text-[11px] uppercase tracking-wider text-mineral-400 font-medium">
                Classification: {BRAND.publicClassification}
              </span>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-medium tracking-widest text-mineral-400">
              Collections
            </h3>
            <ul className="space-y-2 text-xs">
              {COLLECTIONS.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/collections/${c.slug}`}
                    className="text-mineral-300 hover:text-mineral-50 transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products/prana-modular-sofa?layout=chaise&fabric=moss"
                  className="text-mineral-300 hover:text-mineral-50 transition-colors flex items-center gap-1 text-accent-vermilion"
                >
                  <span>Sofa Configurator</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Room Lookbooks */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-medium tracking-widest text-mineral-400">
              Urban Rooms
            </h3>
            <ul className="space-y-2 text-xs">
              {ROOMS.map((r) => (
                <li key={r.slug}>
                  <Link
                    href="/rooms"
                    className="text-mineral-300 hover:text-mineral-50 transition-colors"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Previews & Contact */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-medium tracking-widest text-mineral-400">
              Showroom Studios
            </h3>
            <div className="space-y-3 text-xs text-mineral-300">
              {BRAND.studios.map((s) => (
                <div key={s.city} className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-mineral-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-mineral-100">{s.city}</span>
                    <span className="text-mineral-400 block text-[11px]">{s.neighbourhood}</span>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="text-xs text-mineral-100 underline hover:text-mineral-50 transition-colors"
                >
                  View all studio details & enquiries
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Reference Build Notice Card */}
        <div className="mt-14 p-6 bg-charcoal-light/70 border border-charcoal-muted/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-serif uppercase tracking-widest text-mineral-300 font-semibold block">
                Reference Architecture & Commerce Build
              </span>
              <p className="text-xs text-mineral-400 leading-relaxed max-w-2xl">
                {BRAND.referenceDisclosure}
              </p>
            </div>
            <a
              href={BRAND.links.webshastraa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-mineral-50 text-charcoal text-xs font-medium tracking-wide hover:bg-mineral-200 transition-colors flex-shrink-0"
            >
              <span>Webshastraa Reference Build</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright line */}
      <div className="border-t border-charcoal-light py-6 text-center text-xs text-mineral-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 {BRAND.name}. All rights reserved.</p>
          <p className="text-[11px] text-mineral-600">
            Internal Architecture Reference • Zero mock ecommerce claims
          </p>
        </div>
      </div>
    </footer>
  );
}
