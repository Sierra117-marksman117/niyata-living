'use client';

import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  selectedCategory: string;
  selectedRoom: string;
  selectedMaterial: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;
  onCategoryChange: (cat: string) => void;
  onRoomChange: (room: string) => void;
  onMaterialChange: (mat: string) => void;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  onSortChange: (val: string) => void;
  onClearAll: () => void;
  onOpenMobileDrawer: () => void;
  totalResults: number;
}

const CATEGORIES = [
  { label: 'All Categories', value: '' },
  { label: 'Seating', value: 'seating' },
  { label: 'Tables', value: 'tables' },
  { label: 'Storage', value: 'storage' },
  { label: 'Bedroom', value: 'bedroom' },
  { label: 'Selected Objects', value: 'objects' },
];

const ROOMS = [
  { label: 'All Rooms', value: '' },
  { label: 'Living', value: 'living' },
  { label: 'Dining', value: 'dining' },
  { label: 'Bedroom', value: 'bedroom' },
  { label: 'Study', value: 'study' },
];

const MATERIALS = [
  { label: 'All Materials', value: '' },
  { label: 'Solid Teak', value: 'Solid Teak' },
  { label: 'Solid Walnut', value: 'Solid Walnut' },
  { label: 'Natural Stone', value: 'Natural Stone' },
  { label: 'Teak Veneer', value: 'Teak Veneer' },
  { label: 'Powder-Coated Steel', value: 'Powder-Coated Steel' },
  { label: 'Spun Brass', value: 'Spun Brass' },
];

export function FilterBar({
  selectedCategory,
  selectedRoom,
  selectedMaterial,
  minPrice,
  maxPrice,
  sortBy,
  onCategoryChange,
  onRoomChange,
  onMaterialChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSortChange,
  onClearAll,
  onOpenMobileDrawer,
  totalResults,
}: FilterBarProps) {
  const hasActiveFilters = Boolean(
    selectedCategory || selectedRoom || selectedMaterial || minPrice || maxPrice || sortBy !== 'featured'
  );

  return (
    <div className="bg-mineral-100 border border-mineral-200 p-4 mb-6">
      {/* Mobile Top Bar */}
      <div className="flex lg:hidden items-center justify-between">
        <button
          onClick={onOpenMobileDrawer}
          className="flex items-center gap-2 px-3.5 py-2 bg-mineral-50 border border-mineral-300 text-xs font-medium text-charcoal uppercase tracking-wider"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters & Sort</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-charcoal inline-block" />
          )}
        </button>

        <span className="text-xs text-charcoal-muted">{totalResults} pieces</span>
      </div>

      {/* Desktop Inline Controls */}
      <div className="hidden lg:flex items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Category */}
          <div>
            <label htmlFor="filter-cat" className="sr-only">Category</label>
            <select
              id="filter-cat"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="bg-mineral-50 border border-mineral-300 px-3 py-1.5 text-xs text-charcoal focus:outline-none focus:border-charcoal"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Room */}
          <div>
            <label htmlFor="filter-room" className="sr-only">Room</label>
            <select
              id="filter-room"
              value={selectedRoom}
              onChange={(e) => onRoomChange(e.target.value)}
              className="bg-mineral-50 border border-mineral-300 px-3 py-1.5 text-xs text-charcoal focus:outline-none focus:border-charcoal"
            >
              {ROOMS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Material */}
          <div>
            <label htmlFor="filter-mat" className="sr-only">Material</label>
            <select
              id="filter-mat"
              value={selectedMaterial}
              onChange={(e) => onMaterialChange(e.target.value)}
              className="bg-mineral-50 border border-mineral-300 px-3 py-1.5 text-xs text-charcoal focus:outline-none focus:border-charcoal"
            >
              {MATERIALS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-1.5 bg-mineral-50 border border-mineral-300 px-2 py-1">
            <span className="text-[10px] text-charcoal-subtle uppercase">₹</span>
            <label htmlFor="filter-min-price" className="sr-only">Min Price</label>
            <input
              id="filter-min-price"
              type="number"
              min="0"
              step="1000"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
              className="w-16 bg-transparent text-xs text-charcoal focus:outline-none"
            />
            <span className="text-charcoal-subtle text-xs">–</span>
            <label htmlFor="filter-max-price" className="sr-only">Max Price</label>
            <input
              id="filter-max-price"
              type="number"
              min="0"
              step="1000"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              className="w-16 bg-transparent text-xs text-charcoal focus:outline-none"
            />
          </div>

          {/* Reset button */}
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="flex items-center gap-1 text-xs text-charcoal-muted hover:text-accent-vermilion p-1.5"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Desktop Sort & Count */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-charcoal-muted">{totalResults} pieces</span>

          <div className="flex items-center gap-2">
            <label htmlFor="filter-sort" className="text-xs text-charcoal-muted">Sort:</label>
            <select
              id="filter-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-mineral-50 border border-mineral-300 px-3 py-1.5 text-xs text-charcoal focus:outline-none focus:border-charcoal"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
