'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/content/products';
import { Product } from '@/types/product';
import { formatINR } from '@/lib/formatters';
import { ExternalLink, Search, Sparkles, Check, Eye } from 'lucide-react';

export function AdminCatalogueTable() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filtered = PRODUCTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.slug.includes(search.toLowerCase());
    const matchesCat = !categoryFilter || p.category === categoryFilter; //git push
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-mineral-50 p-4 border border-mineral-200">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-charcoal-subtle absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search piece name or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-mineral-100 border border-mineral-300 pl-9 pr-3 py-2 text-xs text-charcoal focus:outline-none focus:border-charcoal"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="admin-cat-filter" className="text-xs text-charcoal-muted">Filter:</label>
          <select
            id="admin-cat-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-mineral-100 border border-mineral-300 px-3 py-2 text-xs text-charcoal focus:outline-none"
          >
            <option value="">All Categories ({PRODUCTS.length})</option>
            <option value="seating">Seating</option>
            <option value="tables">Tables</option>
            <option value="storage">Storage</option>
            <option value="bedroom">Bedroom</option>
            <option value="objects">Objects</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-mineral-300 bg-mineral-100">
        <table className="w-full text-left text-xs">
          <thead className="bg-mineral-200/80 text-charcoal-muted uppercase text-[10px] tracking-wider border-b border-mineral-300">
            <tr>
              <th className="p-3.5">Product</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Primary Material</th>
              <th className="p-3.5">Dimensions</th>
              <th className="p-3.5 text-right">Illustrative Price</th>
              <th className="p-3.5 text-center">Status</th>
              <th className="p-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mineral-200 text-charcoal">
            {filtered.map((product) => (
              <tr key={product.id} className="hover:bg-mineral-50/70 transition-colors">
                <td className="p-3.5">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 bg-mineral-200 border border-mineral-300 overflow-hidden flex-shrink-0">
                      <Image
                        src={product.images[0]?.src || '/images/hero/hero_contemporary_living.png'}
                        alt={product.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-medium text-charcoal block">{product.name}</span>
                      <span className="text-[10px] text-charcoal-subtle font-mono">{product.slug}</span>
                    </div>
                  </div>
                </td>

                <td className="p-3.5 capitalize text-charcoal-muted">{product.categoryLabel}</td>
                <td className="p-3.5 text-charcoal-muted">{product.primaryMaterial}</td>
                <td className="p-3.5 font-mono text-[11px] text-charcoal-muted">
                  {product.dimensions.widthCm}×{product.dimensions.depthCm}×{product.dimensions.heightCm} cm
                </td>

                <td className="p-3.5 text-right font-serif font-semibold text-charcoal">
                  {product.priceRange
                    ? `${formatINR(product.priceRange.minINR)} – ${formatINR(product.priceRange.maxINR)}`
                    : formatINR(product.priceINR)}
                </td>

                <td className="p-3.5 text-center">
                  {product.isFlagshipConfigurable ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent-cobalt/10 text-accent-cobalt text-[10px] font-semibold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      <span>9 Renders</span>
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 bg-moss/10 text-moss text-[10px] font-medium uppercase">
                      Active Piece
                    </span>
                  )}
                </td>

                <td className="p-3.5 text-right">
                  <Link
                    href={`/products/${product.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs text-charcoal hover:underline"
                    aria-label={`Preview ${product.name} on storefront`}
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3 text-charcoal-subtle" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
