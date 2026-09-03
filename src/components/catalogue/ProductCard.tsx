'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { formatINR, formatINRRange } from '@/lib/formatters';
import { useCustomer } from '@/lib/customerContext';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { isWishlisted, toggleWishlist } = useCustomer();
  const wishlisted = isWishlisted(product.slug);
  const heroImage = product.images.find((img) => img.role === 'hero') || product.images[0];

  return (
    <article className="group relative flex flex-col bg-mineral-50 border border-mineral-200/80 hover:border-mineral-400 transition-all duration-300">
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full bg-mineral-200 overflow-hidden block">
        <Link
          href={`/products/${product.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="block w-full h-full"
        >
          <Image
            src={heroImage.src}
            alt={heroImage.alt || product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Flagship / Badge Tag */}
        {product.isFlagshipConfigurable && (
          <span className="absolute top-3 left-3 bg-charcoal/90 backdrop-blur-sm text-mineral-50 text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold flex items-center gap-1 shadow-sm pointer-events-none">
            <Sparkles className="w-3 h-3 text-terracotta-light" />
            <span>Configurable</span>
          </span>
        )}

        {/* Wishlist Heart Toggle Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 p-2 rounded-full bg-mineral-50/90 hover:bg-mineral-50 text-charcoal shadow-sm transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal"
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? 'fill-terracotta text-terracotta' : 'text-charcoal-muted'
            }`}
          />
        </button>

        <span className="absolute bottom-3 right-3 bg-mineral-50/90 backdrop-blur-sm text-charcoal text-[11px] font-medium px-2 py-0.5 border border-mineral-200 pointer-events-none">
          {product.primaryMaterial}
        </span>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-charcoal-muted mb-1">
            <span className="uppercase tracking-wider font-medium text-[11px]">
              {product.categoryLabel}
            </span>
            <span>{product.roomLabels[0]}</span>
          </div>

          <h3 className="font-serif text-lg font-medium text-charcoal group-hover:text-charcoal-light transition-colors">
            <Link href={`/products/${product.slug}`} className="focus:outline-none focus-visible:underline">
              {product.name}
            </Link>
          </h3>

          <p className="text-xs text-charcoal-muted mt-1.5 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-mineral-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-charcoal-subtle block text-[10px] uppercase tracking-wider">
              Illustrative Price
            </span>
            <span className="font-serif text-sm font-semibold text-charcoal">
              {product.priceRange
                ? formatINRRange(product.priceRange.minINR, product.priceRange.maxINR)
                : formatINR(product.priceINR)}
            </span>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-charcoal hover:text-charcoal-muted uppercase tracking-wider group-hover:translate-x-0.5 transition-transform p-1"
            aria-label={`View details for ${product.name}`}
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
