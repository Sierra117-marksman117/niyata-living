'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { ChevronDown, ShieldCheck, Sparkles, Wrench } from 'lucide-react';

interface CareAndAssemblyProps {
  product: Product;
}

export function CareAndAssembly({ product }: CareAndAssemblyProps) {
  const [openSection, setOpenSection] = useState<'care' | 'assembly' | 'warranty' | null>('care');

  return (
    <div className="pt-8 border-t border-mineral-200">
      <h3 className="font-serif text-lg font-medium text-charcoal mb-4">
        Care, Maintenance & Service
      </h3>

      <div className="space-y-3">
        {/* Care Guidance */}
        <div className="border border-mineral-300 bg-mineral-100">
          <button
            onClick={() => setOpenSection(openSection === 'care' ? null : 'care')}
            className="w-full p-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal"
            aria-expanded={openSection === 'care'}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-mineral-600" />
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                Routine Care & Material Preservation
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-charcoal-muted transition-transform duration-200 ${
                openSection === 'care' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSection === 'care' && (
            <div className="px-4 pb-4 pt-1 text-xs text-charcoal-muted border-t border-mineral-200/60 space-y-2">
              <ul className="space-y-1.5 list-disc list-inside">
                {product.careInstructions.map((instruction, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {instruction}
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-charcoal-subtle pt-1 italic">
                Our finishes use natural plant-based oils and water-borne sealants that mature with quiet dignity.
              </p>
            </div>
          )}
        </div>

        {/* Assembly & Unboxing */}
        <div className="border border-mineral-300 bg-mineral-100">
          <button
            onClick={() => setOpenSection(openSection === 'assembly' ? null : 'assembly')}
            className="w-full p-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal"
            aria-expanded={openSection === 'assembly'}
          >
            <div className="flex items-center gap-2.5">
              <Wrench className="w-4 h-4 text-mineral-600" />
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                Assembly & Placement Details
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-charcoal-muted transition-transform duration-200 ${
                openSection === 'assembly' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSection === 'assembly' && (
            <div className="px-4 pb-4 pt-1 text-xs text-charcoal-muted border-t border-mineral-200/60 space-y-2">
              <p className="font-medium text-charcoal">
                Assembly Level: {product.assemblyInfo.level}
              </p>
              <p className="leading-relaxed">{product.assemblyInfo.instructions}</p>
              {product.assemblyInfo.estimatedMinutes > 0 && (
                <p className="text-[11px] text-charcoal-subtle">
                  Estimated setup duration: {product.assemblyInfo.estimatedMinutes} minutes.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Reference Build Note */}
        <div className="border border-mineral-300 bg-mineral-100">
          <button
            onClick={() => setOpenSection(openSection === 'warranty' ? null : 'warranty')}
            className="w-full p-4 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal"
            aria-expanded={openSection === 'warranty'}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-mineral-600" />
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                Reference Architecture Disclosure
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-charcoal-muted transition-transform duration-200 ${
                openSection === 'warranty' ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSection === 'warranty' && (
            <div className="px-4 pb-4 pt-1 text-xs text-charcoal-muted border-t border-mineral-200/60 space-y-2 leading-relaxed">
              <p>
                This product page is part of the Niyata Living furniture commerce reference experience. Dimensions, materials, joinery methods, and care guidelines reflect genuine architectural and furniture-making principles.
              </p>
              <p className="text-[11px] text-charcoal-subtle">
                Products, prices, materials, and dispatch estimations shown are illustrative for demonstration of optimal e-commerce product detail journeys.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
