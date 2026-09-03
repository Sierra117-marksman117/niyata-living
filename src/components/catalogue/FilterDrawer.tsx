'use client';

import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { ProductCategory, RoomCategory } from '@/types/product';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
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
  totalResults: number;
}

const CATEGORIES: { label: string; value: string }[] = [
  { label: 'All Categories', value: '' },
  { label: 'Seating', value: 'seating' },
  { label: 'Tables', value: 'tables' },
  { label: 'Storage', value: 'storage' },
  { label: 'Bedroom', value: 'bedroom' },
  { label: 'Selected Objects', value: 'objects' },
];

const ROOMS: { label: string; value: string }[] = [
  { label: 'All Rooms', value: '' },
  { label: 'Living Room', value: 'living' },
  { label: 'Dining Room', value: 'dining' },
  { label: 'Bedroom', value: 'bedroom' },
  { label: 'Study & Work', value: 'study' },
];

const MATERIALS: { label: string; value: string }[] = [
  { label: 'All Materials', value: '' },
  { label: 'Solid Teak', value: 'Solid Teak' },
  { label: 'Solid Walnut', value: 'Solid Walnut' },
  { label: 'Natural Stone', value: 'Natural Stone' },
  { label: 'Teak Veneer', value: 'Teak Veneer' },
  { label: 'Powder-Coated Steel', value: 'Powder-Coated Steel' },
  { label: 'Spun Brass', value: 'Spun Brass' },
];

export function FilterDrawer({
  isOpen,
  onClose,
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
  totalResults,
}: FilterDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filter Products"
        className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-mineral-50 border-l border-mineral-300 z-50 flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-mineral-200 flex items-center justify-between bg-mineral-100">
          <div>
            <h2 className="text-lg font-serif font-medium text-charcoal">Filter Catalogue</h2>
            <span className="text-xs text-charcoal-muted">{totalResults} products found</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-charcoal-muted hover:text-charcoal hover:bg-mineral-200"
            aria-label="Close filters"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filters */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Sort By */}
          <div>
            <label htmlFor="drawer-sort" className="text-xs font-semibold uppercase tracking-wider text-charcoal block mb-2">
              Sort By
            </label>
            <select
              id="drawer-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full bg-mineral-100 border border-mineral-300 p-2.5 text-xs text-charcoal focus:outline-none focus:border-charcoal"
            >
              <option value="featured">Featured / Editorial Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal block mb-2">
              Collection Category
            </span>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => onCategoryChange(cat.value)}
                  className={`w-full flex items-center justify-between p-2 text-xs text-left transition-colors ${
                    selectedCategory === cat.value
                      ? 'bg-mineral-200 font-semibold text-charcoal'
                      : 'hover:bg-mineral-100 text-charcoal-muted'
                  }`}
                >
                  <span>{cat.label}</span>
                  {selectedCategory === cat.value && <Check className="w-3.5 h-3.5 text-charcoal" />}
                </button>
              ))}
            </div>
          </div>

          {/* Room */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal block mb-2">
              Room Environment
            </span>
            <div className="space-y-1">
              {ROOMS.map((r) => (
                <button
                  key={r.value}
                  onClick={() => onRoomChange(r.value)}
                  className={`w-full flex items-center justify-between p-2 text-xs text-left transition-colors ${
                    selectedRoom === r.value
                      ? 'bg-mineral-200 font-semibold text-charcoal'
                      : 'hover:bg-mineral-100 text-charcoal-muted'
                  }`}
                >
                  <span>{r.label}</span>
                  {selectedRoom === r.value && <Check className="w-3.5 h-3.5 text-charcoal" />}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Material */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal block mb-2">
              Primary Material
            </span>
            <div className="space-y-1">
              {MATERIALS.map((mat) => (
                <button
                  key={mat.value}
                  onClick={() => onMaterialChange(mat.value)}
                  className={`w-full flex items-center justify-between p-2 text-xs text-left transition-colors ${
                    selectedMaterial === mat.value
                      ? 'bg-mineral-200 font-semibold text-charcoal'
                      : 'hover:bg-mineral-100 text-charcoal-muted'
                  }`}
                >
                  <span>{mat.label}</span>
                  {selectedMaterial === mat.value && <Check className="w-3.5 h-3.5 text-charcoal" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal block mb-2">
              Price Range (INR)
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="drawer-min-price" className="text-[10px] text-charcoal-subtle block mb-1">
                  Min Price
                </label>
                <input
                  id="drawer-min-price"
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="₹0"
                  value={minPrice}
                  onChange={(e) => onMinPriceChange(e.target.value)}
                  className="w-full bg-mineral-100 border border-mineral-300 p-2 text-xs text-charcoal focus:outline-none focus:border-charcoal"
                />
              </div>
              <div>
                <label htmlFor="drawer-max-price" className="text-[10px] text-charcoal-subtle block mb-1">
                  Max Price
                </label>
                <input
                  id="drawer-max-price"
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="₹100,000"
                  value={maxPrice}
                  onChange={(e) => onMaxPriceChange(e.target.value)}
                  className="w-full bg-mineral-100 border border-mineral-300 p-2 text-xs text-charcoal focus:outline-none focus:border-charcoal"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-mineral-200 bg-mineral-100 flex gap-3">
          <button
            onClick={onClearAll}
            className="flex-1 py-2.5 border border-mineral-300 text-xs font-medium text-charcoal hover:bg-mineral-200 uppercase tracking-wider transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-charcoal text-mineral-50 text-xs font-medium hover:bg-charcoal-light uppercase tracking-wider transition-colors"
          >
            Apply ({totalResults})
          </button>
        </div>
      </div>
    </>
  );
}
