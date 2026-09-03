'use client';

import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Product, ProductColorOption } from '@/types/product';
import { ShoppingBag, Check, ArrowRight } from 'lucide-react';
import { formatINR } from '@/lib/formatters';

interface AddToCartButtonProps {
  product: Product;
  selectedLayoutId?: string;
  selectedFabricId?: string;
  selectedColor?: ProductColorOption;
  customPriceINR?: number;
  customImageSrc?: string;
}

export function AddToCartButton({
  product,
  selectedLayoutId,
  selectedFabricId,
  selectedColor,
  customPriceINR,
  customImageSrc,
}: AddToCartButtonProps) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const price = customPriceINR || product.priceINR;
  const image =
    customImageSrc ||
    product.images.find((img) => img.role === 'hero')?.src ||
    product.images[0].src;

  const handleAddToCart = () => {
    addItem({
      productSlug: product.slug,
      productName: product.name,
      category: product.categoryLabel,
      imageSrc: image,
      unitPriceINR: price,
      quantity,
      selectedLayout: selectedLayoutId,
      selectedFabric: selectedFabricId,
      selectedColor: selectedColor?.name,
      selectedMaterial: product.primaryMaterial,
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        {/* Quantity selector */}
        <div className="flex items-center border border-mineral-300 bg-mineral-100">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-3 text-xs font-semibold text-charcoal hover:bg-mineral-200 transition-colors"
            aria-label="Decrease quantity"
          >
            –
          </button>
          <span className="px-3 py-3 text-xs font-medium text-charcoal min-w-[2.5rem] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            className="px-3 py-3 text-xs font-semibold text-charcoal hover:bg-mineral-200 transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Add to Cart Preview CTA */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex-1 py-3.5 px-6 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-widest transition-all duration-200 ${
            added
              ? 'bg-moss text-mineral-50'
              : 'bg-charcoal text-mineral-50 hover:bg-charcoal-light'
          }`}
          aria-label={`Add ${product.name} to cart preview`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Cart Preview</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart Preview • {formatINR(price * quantity)}</span>
            </>
          )}
        </button>
      </div>

      <p className="text-[11px] text-charcoal-subtle text-center">
        Local browser preview only. No real orders or transactions are processed.
      </p>
    </div>
  );
}
