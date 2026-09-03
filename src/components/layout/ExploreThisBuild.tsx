'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, X, ExternalLink, ArrowRight, Layers, Box, Home, Sparkles, ShoppingBag, Palette } from 'lucide-react';
import { BRAND } from '@/config/brand';

export function ExploreThisBuild() {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevent background scrolling when open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const showcaseLinks = [
    {
      title: 'Homepage Experience',
      description: 'Editorial brand narrative, hero space preview, and collection highlights',
      href: '/',
      icon: Home,
    },
    {
      title: 'Collections & Filters',
      description: 'Typed local filtering by category, room, material, price range & URL sync',
      href: '/collections',
      icon: Layers,
    },
    {
      title: 'Flagship Modular Sofa',
      description: 'Prana modular sofa flagship product detail and specs',
      href: '/products/prana-modular-sofa',
      icon: Box,
    },
    {
      title: 'Flagship Sofa Configurator',
      description: 'Interactive 3 layouts × 3 fabrics configuration matrix with live URL state',
      href: '/products/prana-modular-sofa?layout=chaise&fabric=moss',
      icon: Palette,
      badge: '9 Renders',
    },
    {
      title: 'Room Lookbook',
      description: 'Five authentic Indian urban proportions (Bandra, Koramangala, Ahmedabad, Surat)',
      href: '/rooms',
      icon: Sparkles,
      badge: '5 Rooms',
    },
    {
      title: 'Materials & Craftsmanship',
      description: 'Honest regional hardwoods, unpadded sustainability claims & macro textures',
      href: '/materials',
      icon: Box,
    },
    {
      title: 'Design Consultation Journey',
      description: 'Client-side multi-step room brief wizard with zero backend data transmission',
      href: '/design-service',
      icon: Compass,
      badge: 'Interactive',
    },
    {
      title: 'Local Cart Preview',
      description: 'Hydration-safe localStorage cart with positive integer INR calculations',
      href: '/cart-preview',
      icon: ShoppingBag,
    },
    {
      title: 'Customer Space Portal',
      description: 'Saved pieces moodboard, apartment footprint specs, and room brief history',
      href: '/account',
      icon: Home,
      badge: 'Client',
    },
    {
      title: 'Studio Admin Operations',
      description: 'Catalogue manager, 9-render configurator matrix, and consultation inbox',
      href: '/admin',
      icon: Compass,
      badge: 'Admin',
    },
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <aside aria-label="Reference Build Quick Navigator" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-charcoal hover:bg-charcoal-light text-mineral-50 px-4 py-3 shadow-lg border border-charcoal-muted text-xs font-medium tracking-wider uppercase transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-charcoal"
          aria-expanded={isOpen}
          aria-controls="explore-build-drawer"
          aria-label="Open Explore This Build Navigation"
        >
          <Compass className="w-4 h-4 text-mineral-300" aria-hidden="true" />
          <span>Explore This Build</span>
        </button>
      </aside>

      {/* Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-out Drawer */}
      <div
        id="explore-build-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Explore This Build Navigation"
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-mineral-50 border-l border-mineral-300 z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-mineral-200 flex items-center justify-between bg-mineral-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-accent-cobalt" />
              <span className="text-xs uppercase font-medium tracking-widest text-charcoal-muted">
                Reference Architecture
              </span>
            </div>
            <h2 className="text-lg font-serif font-medium text-charcoal mt-1">Explore This Build</h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-charcoal-muted hover:text-charcoal hover:bg-mineral-200 transition-colors"
            aria-label="Close Explore Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
            Direct crawlable routes to key commerce experiences built for this showcase:
          </p>

          <nav className="space-y-2.5">
            {showcaseLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-start justify-between p-3.5 bg-mineral-100 hover:bg-mineral-200/80 border border-mineral-200 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-mineral-50 border border-mineral-300 text-charcoal mt-0.5">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-charcoal group-hover:text-charcoal-light">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 bg-mineral-300 text-charcoal-muted">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-charcoal-muted mt-0.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className="w-4 h-4 text-charcoal-subtle group-hover:text-charcoal group-hover:translate-x-0.5 transition-all mt-1 ml-2 flex-shrink-0"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info & Webshastraa link */}
        <div className="p-6 border-t border-mineral-200 bg-mineral-100 space-y-3">
          <p className="text-xs text-charcoal-subtle leading-relaxed">
            {BRAND.referenceDisclosure}
          </p>
          <a
            href={BRAND.links.webshastraa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full py-2.5 px-4 bg-charcoal text-mineral-50 hover:bg-charcoal-light text-xs font-medium tracking-wide transition-colors"
          >
            <span>Built by Webshastraa</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </>
  );
}
