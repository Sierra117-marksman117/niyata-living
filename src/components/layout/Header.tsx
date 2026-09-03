'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, ShoppingBag, User, Heart, Shield } from 'lucide-react';
import { BRAND } from '@/config/brand';
import { useCart } from '@/hooks/useCart';
import { useCustomer } from '@/lib/customerContext';
import { MobileNav } from './MobileNav';
import { ReferenceDisclosure } from './ReferenceDisclosure';

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { state: cartState, openCart } = useCart();
  const { state: customerState, openCustomerDrawer } = useCustomer();

  return (
    <>
      <ReferenceDisclosure variant="banner" />
      <header className="sticky top-0 z-30 bg-mineral-50/95 backdrop-blur-md border-b border-mineral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                className="p-2 -ml-2 text-charcoal hover:text-charcoal-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-1 lg:flex-initial text-center lg:text-left">
              <Link
                href="/"
                className="inline-block group focus-visible:ring-2 focus-visible:ring-charcoal"
              >
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-charcoal group-hover:text-charcoal-muted transition-colors">
                  {BRAND.name.toUpperCase()}
                </span>
                <span className="hidden sm:block text-[10px] uppercase tracking-[0.25em] text-charcoal-muted -mt-1 font-sans">
                  Contemporary Indian Living
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wide">
              <Link
                href="/collections"
                className="text-charcoal hover:text-charcoal-muted transition-colors py-2 border-b-2 border-transparent hover:border-charcoal"
              >
                Collections
              </Link>
              <Link
                href="/products/prana-modular-sofa?layout=chaise&fabric=moss"
                className="text-charcoal hover:text-charcoal-muted transition-colors py-2 border-b-2 border-transparent hover:border-charcoal"
              >
                Configurator
              </Link>
              <Link
                href="/rooms"
                className="text-charcoal hover:text-charcoal-muted transition-colors py-2 border-b-2 border-transparent hover:border-charcoal"
              >
                Rooms
              </Link>
              <Link
                href="/materials"
                className="text-charcoal hover:text-charcoal-muted transition-colors py-2 border-b-2 border-transparent hover:border-charcoal"
              >
                Materials
              </Link>
              <Link
                href="/design-service"
                className="text-charcoal hover:text-charcoal-muted transition-colors py-2 border-b-2 border-transparent hover:border-charcoal"
              >
                Design Service
              </Link>
              <Link
                href="/about"
                className="text-charcoal-muted hover:text-charcoal transition-colors py-2"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-charcoal-muted hover:text-charcoal transition-colors py-2"
              >
                Studios
              </Link>
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Customer Space Profile / Wishlist Button */}
              <button
                type="button"
                onClick={openCustomerDrawer}
                className="relative p-2 text-charcoal hover:text-charcoal-muted transition-colors focus-visible:ring-2 focus-visible:ring-charcoal"
                aria-label={`Customer space portal with ${customerState.wishlist.length} saved pieces`}
              >
                <User className="w-5 h-5" />
                {customerState.wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-mineral-50 bg-terracotta rounded-full">
                    {customerState.wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 text-charcoal hover:text-charcoal-muted transition-colors focus-visible:ring-2 focus-visible:ring-charcoal"
                aria-label={`Cart with ${cartState.itemCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartState.itemCount > 0 && (
                  <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-mineral-50 bg-charcoal rounded-full">
                    {cartState.itemCount}
                  </span>
                )}
              </button>

              {/* Admin Studio Quick Link */}
              <Link
                href="/admin"
                className="hidden xl:inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1.5 bg-mineral-200 hover:bg-mineral-300 text-charcoal transition-colors border border-mineral-300"
                title="Studio Operations Panel"
              >
                <Shield className="w-3.5 h-3.5 text-accent-cobalt" />
                <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
