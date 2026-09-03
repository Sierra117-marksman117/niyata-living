'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatINR } from '@/lib/formatters';
import { BRAND } from '@/config/brand';

export function CartDrawer() {
  const { state, isCartOpen, closeCart, updateQuantity, removeItem, clearCart } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock scroll
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isCartOpen]);

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 transition-opacity"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Slide-out Drawer */}
      <div
        id="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart Preview"
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-mineral-50 border-l border-mineral-300 z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-mineral-200 flex items-center justify-between bg-mineral-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-charcoal" aria-hidden="true" />
            <h2 className="text-lg font-serif font-medium text-charcoal">
              Cart Preview ({state.itemCount})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-charcoal-muted hover:text-charcoal hover:bg-mineral-200 transition-colors"
            aria-label="Close Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items or Empty State */}
        <div className="flex-1 overflow-y-auto p-6">
          {state.items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-mineral-200 rounded-full flex items-center justify-center mb-4 text-charcoal-muted">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-serif font-medium text-charcoal mb-2">
                Your cart is empty
              </h3>
              <p className="text-xs text-charcoal-muted max-w-xs mb-6 leading-relaxed">
                Explore our modular seating, crafted dining tables, or bedroom collections to add items to your preview.
              </p>
              <Link
                href="/collections"
                onClick={closeCart}
                className="px-6 py-2.5 bg-charcoal text-mineral-50 hover:bg-charcoal-light text-xs font-medium tracking-wider uppercase transition-colors"
              >
                Browse Collections
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-mineral-200">
                <span className="text-xs text-charcoal-muted">Selected Pieces</span>
                <button
                  onClick={clearCart}
                  className="text-xs text-charcoal-subtle hover:text-accent-vermilion transition-colors"
                >
                  Clear all
                </button>
              </div>

              <ul className="space-y-4 divide-y divide-mineral-200">
                {state.items.map((item) => (
                  <li key={item.id} className="pt-4 first:pt-0 flex gap-4">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 bg-mineral-200 flex-shrink-0 overflow-hidden border border-mineral-300">
                      <Image
                        src={item.imageSrc}
                        alt={item.productName}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.productSlug}`}
                          onClick={closeCart}
                          className="text-sm font-medium text-charcoal hover:underline truncate"
                        >
                          {item.productName}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-charcoal-subtle hover:text-accent-vermilion p-1"
                          aria-label={`Remove ${item.productName}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Configurations info */}
                      <div className="text-xs text-charcoal-muted mt-1 space-y-0.5">
                        {item.selectedLayout && (
                          <p>
                            <span className="text-charcoal-subtle">Layout:</span>{' '}
                            <span className="font-medium">{item.selectedLayout}</span>
                          </p>
                        )}
                        {item.selectedFabric && (
                          <p>
                            <span className="text-charcoal-subtle">Fabric:</span>{' '}
                            <span className="font-medium">{item.selectedFabric}</span>
                          </p>
                        )}
                        {item.selectedColor && (
                          <p>
                            <span className="text-charcoal-subtle">Tone:</span>{' '}
                            <span className="font-medium">{item.selectedColor}</span>
                          </p>
                        )}
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-mineral-300 bg-mineral-100">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-charcoal-muted hover:text-charcoal hover:bg-mineral-200"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-medium text-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-charcoal-muted hover:text-charcoal hover:bg-mineral-200"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-sm font-medium text-charcoal">
                          {formatINR(item.unitPriceINR * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer & Checkout preview CTA */}
        {state.items.length > 0 && (
          <div className="p-6 border-t border-mineral-200 bg-mineral-100 space-y-4">
            <div className="space-y-1.5 text-xs text-charcoal-muted">
              <div className="flex justify-between">
                <span>Subtotal (Illustrative)</span>
                <span className="font-medium text-charcoal">{formatINR(state.subtotalINR)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated GST (18% illustrative)</span>
                <span>{formatINR(state.illustrativeTaxINR)}</span>
              </div>
              <div className="flex justify-between text-sm font-serif font-medium text-charcoal pt-2 border-t border-mineral-200">
                <span>Total Preview</span>
                <span>{formatINR(state.totalINR)}</span>
              </div>
            </div>

            {/* Reference disclosure badge */}
            <div className="p-3 bg-mineral-200/70 border border-mineral-300 text-[11px] text-charcoal-muted leading-relaxed flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-mineral-600 flex-shrink-0 mt-0.5" />
              <span>{BRAND.referenceDisclosure}</span>
            </div>

            <div className="flex flex-col gap-2">
              <Link
                href="/cart-preview"
                onClick={closeCart}
                className="flex items-center justify-center gap-2 w-full py-3 bg-charcoal text-mineral-50 hover:bg-charcoal-light text-xs font-medium tracking-wider uppercase transition-colors"
              >
                <span>Preview Checkout Journey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
