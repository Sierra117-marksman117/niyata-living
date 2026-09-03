import React from 'react';
import { Product } from '@/types/product';
import { Ruler, Sparkles, Hammer, Compass, ShieldCheck } from 'lucide-react';

interface ProductSpecsProps {
  product: Product;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  return (
    <div className="space-y-8 pt-8 border-t border-mineral-200">
      {/* Specifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Dimensions Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-charcoal font-medium text-sm">
            <Ruler className="w-4 h-4 text-mineral-600" />
            <h3 className="font-serif text-base">Dimensions & Footprint</h3>
          </div>

          <div className="bg-mineral-100 p-4 border border-mineral-200 space-y-2.5 text-xs text-charcoal-muted">
            <div className="flex justify-between pb-1.5 border-b border-mineral-200">
              <span>Overall Dimensions:</span>
              <span className="font-medium text-charcoal">{product.dimensions.formatted}</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-mineral-200">
              <span>Width × Depth × Height:</span>
              <span className="font-medium text-charcoal">
                {product.dimensions.widthCm} × {product.dimensions.depthCm} × {product.dimensions.heightCm} cm
              </span>
            </div>
            {product.dimensions.seatHeightCm && (
              <div className="flex justify-between pb-1.5 border-b border-mineral-200">
                <span>Seat Height:</span>
                <span className="font-medium text-charcoal">{product.dimensions.seatHeightCm} cm</span>
              </div>
            )}
            {product.dimensions.clearanceCm && (
              <div className="flex justify-between pb-1.5 border-b border-mineral-200">
                <span>Floor Under-Clearance:</span>
                <span className="font-medium text-charcoal">{product.dimensions.clearanceCm} cm</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Product Weight:</span>
              <span className="font-medium text-charcoal">{product.dimensions.weightKg} kg</span>
            </div>
          </div>

          <p className="text-xs text-charcoal-muted leading-relaxed">
            <span className="font-semibold text-charcoal">Spatial Suitability:</span>{' '}
            {product.spatialSuitability}
          </p>
        </div>

        {/* Material & Construction Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-charcoal font-medium text-sm">
            <Hammer className="w-4 h-4 text-mineral-600" />
            <h3 className="font-serif text-base">Materials & Construction</h3>
          </div>

          <div className="bg-mineral-100 p-4 border border-mineral-200 space-y-2 text-xs text-charcoal-muted">
            <p className="font-medium text-charcoal mb-1">Components & Materials:</p>
            <ul className="space-y-1.5 list-disc list-inside">
              {product.materialsList.map((mat, idx) => (
                <li key={idx}>{mat}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-1.5 text-xs text-charcoal-muted">
            <p className="font-medium text-charcoal">Joinery & Architecture:</p>
            <ul className="space-y-1 list-disc list-inside">
              {product.constructionDetails.map((det, idx) => (
                <li key={idx}>{det}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Assembly & Origin Banner */}
      <div className="bg-mineral-100 border border-mineral-200 p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-charcoal-muted">
        <div>
          <span className="text-[10px] uppercase font-semibold text-charcoal block mb-0.5">
            Assembly Service
          </span>
          <p className="font-medium text-charcoal">{product.assemblyInfo.level}</p>
          <p className="text-[11px] text-charcoal-subtle mt-0.5">
            {product.assemblyInfo.instructions}
          </p>
        </div>

        <div>
          <span className="text-[10px] uppercase font-semibold text-charcoal block mb-0.5">
            Workshop Origin
          </span>
          <p className="font-medium text-charcoal">{product.origin}</p>
          <p className="text-[11px] text-charcoal-subtle mt-0.5">
            Handcrafted with regional hardwoods.
          </p>
        </div>

        <div>
          <span className="text-[10px] uppercase font-semibold text-charcoal block mb-0.5">
            Illustrative Production
          </span>
          <p className="font-medium text-charcoal">
            {product.leadTimeWeeks ? `${product.leadTimeWeeks} Weeks Craft Time` : 'Made to Order'}
          </p>
          <p className="text-[11px] text-charcoal-subtle mt-0.5">
            Reference build illustrative timeframe.
          </p>
        </div>
      </div>
    </div>
  );
}
