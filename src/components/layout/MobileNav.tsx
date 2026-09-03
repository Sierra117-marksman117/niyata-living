'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import { BRAND } from '@/config/brand';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const navLinks = [
    { label: 'Collections', href: '/collections' },
    { label: 'Modular Sofa Configurator', href: '/products/prana-modular-sofa?layout=chaise&fabric=moss' },
    { label: 'Room Lookbook', href: '/rooms' },
    { label: 'Materials & Craft', href: '/materials' },
    { label: 'Design Consultation', href: '/design-service' },
    { label: 'Customer Space Portal', href: '/account' },
    { label: 'Studio Admin Panel', href: '/admin' },
    { label: 'About Niyata', href: '/about' },
    { label: 'Contact & Studios', href: '/contact' },
    { label: 'Cart Preview', href: '/cart-preview' },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-mineral-50 border-r border-mineral-300 z-50 flex flex-col shadow-2xl"
      >
        <div className="p-6 border-b border-mineral-200 flex items-center justify-between bg-mineral-100">
          <Link href="/" onClick={onClose} className="font-serif text-lg tracking-wider font-semibold text-charcoal">
            {BRAND.name.toUpperCase()}
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-charcoal-muted hover:text-charcoal hover:bg-mineral-200"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center justify-between py-3.5 px-3 border-b border-mineral-200 text-sm font-medium text-charcoal hover:bg-mineral-100 hover:text-charcoal-light transition-colors"
            >
              <span>{link.label}</span>
              <ArrowRight className="w-4 h-4 text-charcoal-subtle" />
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-mineral-200 bg-mineral-100 space-y-2 text-xs text-charcoal-muted">
          <p className="font-serif italic">{BRAND.tagline}</p>
          <p className="text-[11px] text-charcoal-subtle">{BRAND.referenceDisclosure}</p>
        </div>
      </div>
    </>
  );
}
