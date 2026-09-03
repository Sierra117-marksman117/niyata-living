'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { formatINR } from '@/lib/formatters';
import { ReferenceDisclosure } from '@/components/layout/ReferenceDisclosure';
import { BRAND } from '@/config/brand';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

export default function CartPreviewPage() {
  const { state, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-mineral-300 pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-mineral-600" />
          <span className="text-xs uppercase tracking-widest text-charcoal-muted font-semibold">
            Local Browser State
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal">
          Cart Preview ({state.itemCount} {state.itemCount === 1 ? 'Item' : 'Items'})
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-xl leading-relaxed">
          Review your selected furniture pieces and configured modular systems. This cart operates strictly via client-side storage.
        </p>
      </div>

      {state.items.length === 0 ? (
        /* Empty State */
        <div className="p-16 text-center bg-mineral-100 border border-mineral-300 space-y-4 max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-mineral-200 rounded-full flex items-center justify-center mx-auto text-charcoal-muted">
            <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="font-serif text-2xl font-medium text-charcoal">
            Your Cart Preview Is Empty
          </h2>
          <p className="text-xs text-charcoal-muted leading-relaxed max-w-md mx-auto">
            Browse our modular seating collections, solid hardwood dining tables, or bedroom sanctuaries to add pieces to your preview.
          </p>
          <div className="pt-2">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-mineral-50 hover:bg-charcoal-light text-xs font-medium uppercase tracking-wider transition-colors"
            >
              <span>Explore Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* Active Cart Table & Summary */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-mineral-200 text-xs text-charcoal-muted">
              <span>Selected Products</span>
              <button
                onClick={clearCart}
                className="flex items-center gap-1 text-charcoal-subtle hover:text-accent-vermilion transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Cart Preview</span>
              </button>
            </div>

            <div className="divide-y divide-mineral-200 bg-mineral-100 border border-mineral-200">
              {state.items.map((item) => (
                <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-start">
                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-mineral-200 border border-mineral-300 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.imageSrc}
                      alt={item.productName}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <Link
                        href={`/products/${item.productSlug}`}
                        className="font-serif text-lg font-medium text-charcoal hover:underline"
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

                    <div className="text-xs text-charcoal-muted space-y-0.5">
                      {item.selectedLayout && (
                        <p>
                          <span className="text-charcoal-subtle">Layout:</span> {item.selectedLayout}
                        </p>
                      )}
                      {item.selectedFabric && (
                        <p>
                          <span className="text-charcoal-subtle">Upholstery:</span> {item.selectedFabric}
                        </p>
                      )}
                      {item.selectedColor && (
                        <p>
                          <span className="text-charcoal-subtle">Tone:</span> {item.selectedColor}
                        </p>
                      )}
                      {item.dimensionsSummary && (
                        <p>
                          <span className="text-charcoal-subtle">Footprint:</span> {item.dimensionsSummary}
                        </p>
                      )}
                    </div>

                    {/* Quantity & Unit Price */}
                    <div className="flex items-center justify-between pt-3 border-t border-mineral-200/60">
                      <div className="flex items-center border border-mineral-300 bg-mineral-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs text-charcoal hover:bg-mineral-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 py-1 text-xs font-medium text-charcoal min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs text-charcoal hover:bg-mineral-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-charcoal-subtle uppercase block">
                          {item.quantity} × {formatINR(item.unitPriceINR)}
                        </span>
                        <span className="font-serif text-base font-semibold text-charcoal">
                          {formatINR(item.unitPriceINR * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary Column */}
          <div className="lg:col-span-4 bg-mineral-100 border border-mineral-300 p-6 sm:p-8 space-y-6">
            <h2 className="font-serif text-xl font-medium text-charcoal pb-3 border-b border-mineral-200">
              Illustrative Calculation
            </h2>

            <div className="space-y-3 text-xs text-charcoal-muted">
              <div className="flex justify-between">
                <span>Subtotal ({state.itemCount} items)</span>
                <span className="font-medium text-charcoal">{formatINR(state.subtotalINR)}</span>
              </div>
              <div className="flex justify-between">
                <span>Illustrative GST (18%)</span>
                <span>{formatINR(state.illustrativeTaxINR)}</span>
              </div>
              <div className="flex justify-between">
                <span>White-Glove Delivery & Assembly</span>
                <span className="text-moss font-medium">Included Preview</span>
              </div>
              <div className="flex justify-between text-base font-serif font-semibold text-charcoal pt-3 border-t border-mineral-200">
                <span>Estimated Total</span>
                <span>{formatINR(state.totalINR)}</span>
              </div>
            </div>

            {/* Crucial Reference Build Warning */}
            <div className="p-4 bg-mineral-200 border border-mineral-300 space-y-2 text-xs text-charcoal-muted">
              <div className="flex items-center gap-2 font-medium text-charcoal">
                <AlertTriangle className="w-4 h-4 text-terracotta flex-shrink-0" />
                <span>Reference Checkout Journey</span>
              </div>
              <p className="leading-relaxed">
                This reference build does not process orders or payments. Card, address, or payment details are never collected or stored.
              </p>
            </div>

            <button
              type="button"
              onClick={() => alert('This reference build does not process orders or payments. Thank you for exploring!')}
              className="w-full py-3.5 px-6 bg-charcoal text-mineral-50 hover:bg-charcoal-light text-xs font-medium uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <span>Preview checkout journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <ReferenceDisclosure variant="card" className="mt-16" />
    </div>
  );
}
