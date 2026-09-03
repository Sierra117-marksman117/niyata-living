'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Heart, Trash2, ArrowRight, Home, Ruler, FileText, User } from 'lucide-react';
import { useCustomer } from '@/lib/customerContext';
import { formatINR } from '@/lib/formatters';

export function CustomerDrawer() {
  const { state, isCustomerDrawerOpen, closeCustomerDrawer, removeWishlistItem } = useCustomer();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCustomerDrawerOpen) {
        closeCustomerDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCustomerDrawerOpen, closeCustomerDrawer]);

  // Lock scroll
  useEffect(() => {
    if (isCustomerDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isCustomerDrawerOpen]);

  return (
    <>
      {/* Backdrop */}
      {isCustomerDrawerOpen && (
        <div
          className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 transition-opacity"
          onClick={closeCustomerDrawer}
          aria-hidden="true"
        />
      )}

      {/* Slide-out Drawer */}
      <div
        id="customer-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Customer Profile & Saved Moodboard"
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-mineral-50 border-l border-mineral-300 z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
          isCustomerDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-mineral-200 flex items-center justify-between bg-mineral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-mineral-200 border border-mineral-300 flex items-center justify-center text-charcoal">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-serif font-medium text-charcoal leading-none">
                Customer Space Portal
              </h2>
              <span className="text-[11px] text-charcoal-muted mt-0.5 block">
                Local Moodboard & Apartment Profile
              </span>
            </div>
          </div>
          <button
            onClick={closeCustomerDrawer}
            className="p-2 text-charcoal-muted hover:text-charcoal hover:bg-mineral-200 transition-colors"
            aria-label="Close customer panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Section 1: My Apartment Space Profile */}
          <div className="bg-mineral-100 border border-mineral-200 p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-charcoal flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-mineral-600" />
                <span>My Apartment Footprint</span>
              </span>
              <Link
                href="/account"
                onClick={closeCustomerDrawer}
                className="text-[11px] text-charcoal hover:underline"
              >
                Edit
              </Link>
            </div>
            <div className="text-xs text-charcoal-muted space-y-1">
              <p className="font-medium text-charcoal">
                {state.spaceProfile.apartmentType} • {state.spaceProfile.city}
              </p>
              <p className="text-[11px]">
                Living Area: {state.spaceProfile.livingRoomLengthFt} × {state.spaceProfile.livingRoomWidthFt} ft (
                {state.spaceProfile.livingRoomLengthFt * state.spaceProfile.livingRoomWidthFt} sq ft)
              </p>
              <p className="text-[11px] text-charcoal-subtle italic">
                {state.spaceProfile.notes}
              </p>
            </div>
          </div>

          {/* Section 2: Saved Wishlist Pieces */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-mineral-200">
              <span className="text-xs uppercase tracking-wider font-semibold text-charcoal flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-terracotta" />
                <span>Saved Pieces ({state.wishlist.length})</span>
              </span>
            </div>

            {state.wishlist.length === 0 ? (
              <div className="py-8 text-center bg-mineral-100/50 border border-dashed border-mineral-300 p-4 space-y-2">
                <p className="text-xs text-charcoal-muted">No pieces bookmarked yet.</p>
                <p className="text-[11px] text-charcoal-subtle leading-relaxed">
                  Click the heart icon on any product to curate your personalized apartment moodboard.
                </p>
              </div>
            ) : (
              <ul className="space-y-3 divide-y divide-mineral-200">
                {state.wishlist.map((item) => (
                  <li key={item.slug} className="pt-3 first:pt-0 flex gap-3 items-center">
                    <div className="relative w-16 h-16 bg-mineral-200 border border-mineral-300 overflow-hidden flex-shrink-0">
                      <Image src={item.imageSrc} alt={item.name} fill sizes="64px" className="object-cover" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={closeCustomerDrawer}
                        className="text-xs font-medium text-charcoal hover:underline truncate block"
                      >
                        {item.name}
                      </Link>
                      <p className="text-[10px] text-charcoal-subtle">{item.material}</p>
                      <p className="text-xs font-serif font-semibold text-charcoal">
                        {formatINR(item.priceINR)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeWishlistItem(item.slug)}
                      className="p-1.5 text-charcoal-subtle hover:text-accent-vermilion"
                      aria-label={`Remove ${item.name} from wishlist`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Section 3: Saved Consultation Briefs */}
          {state.savedBriefs.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-charcoal flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-mineral-600" />
                <span>Recent Space Briefs</span>
              </span>
              <div className="space-y-2">
                {state.savedBriefs.slice(0, 2).map((brief) => (
                  <div key={brief.id} className="p-3 bg-mineral-100 border border-mineral-200 text-xs space-y-1">
                    <div className="flex justify-between font-medium text-charcoal">
                      <span className="capitalize">{brief.roomType} Room</span>
                      <span className="text-[10px] text-charcoal-subtle">{brief.createdAt}</span>
                    </div>
                    <p className="text-[11px] text-charcoal-muted">
                      Dimensions: {brief.dimensionLengthFt} × {brief.dimensionWidthFt} ft
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-mineral-200 bg-mineral-100 space-y-3">
          <Link
            href="/account"
            onClick={closeCustomerDrawer}
            className="flex items-center justify-center gap-2 w-full py-3 bg-charcoal text-mineral-50 hover:bg-charcoal-light text-xs font-medium tracking-wider uppercase transition-colors"
          >
            <span>Open Full Customer Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-[10px] text-charcoal-subtle text-center">
            Saved on this browser. No password or cloud account needed.
          </p>
        </div>
      </div>
    </>
  );
}
