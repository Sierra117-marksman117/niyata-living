'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { RoomCategory } from '@/types/product';
import { PRODUCTS } from '@/content/products';
import { COLLECTIONS } from '@/content/collections';
import { ProductCard } from '@/components/catalogue/ProductCard';
import { FilterBar } from '@/components/catalogue/FilterBar';
import { FilterDrawer } from '@/components/catalogue/FilterDrawer';
import { ActiveFilterPills } from '@/components/catalogue/ActiveFilterPills';
import { ReferenceDisclosure } from '@/components/layout/ReferenceDisclosure';
import { Layers, RotateCcw } from 'lucide-react';

function CollectionsCatalogue() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Read state from URL searchParams
  const selectedCategory = searchParams.get('category') || '';
  const selectedRoom = searchParams.get('room') || '';
  const selectedMaterial = searchParams.get('material') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sortBy = searchParams.get('sort') || 'featured';

  // Helper to push updated search params to URL
  const updateUrlParams = (newParams: Record<string, string | null>) => {
    const current = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === '') {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });
    router.replace(`/collections?${current.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (val: string) => updateUrlParams({ category: val });
  const handleRoomChange = (val: string) => updateUrlParams({ room: val });
  const handleMaterialChange = (val: string) => updateUrlParams({ material: val });

  const handleMinPriceChange = (val: string) => {
    const num = parseInt(val, 10);
    if (val === '' || (!isNaN(num) && num >= 0)) {
      updateUrlParams({ minPrice: val === '' ? null : val });
    }
  };

  const handleMaxPriceChange = (val: string) => {
    const num = parseInt(val, 10);
    if (val === '' || (!isNaN(num) && num >= 0)) {
      updateUrlParams({ maxPrice: val === '' ? null : val });
    }
  };

  const handleSortChange = (val: string) => updateUrlParams({ sort: val });

  const handleClearAll = () => {
    router.replace('/collections', { scroll: false });
  };

  const handleRemovePill = (key: string) => {
    updateUrlParams({ [key]: null });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedRoom) {
      list = list.filter((p) => p.roomCategories.includes(selectedRoom as RoomCategory));
    }

    if (selectedMaterial) {
      list = list.filter((p) => p.primaryMaterial === selectedMaterial);
    }

    const minNum = parseInt(minPrice, 10);
    if (!isNaN(minNum) && minNum > 0) {
      list = list.filter((p) => (p.priceRange ? p.priceRange.minINR >= minNum : p.priceINR >= minNum));
    }

    const maxNum = parseInt(maxPrice, 10);
    if (!isNaN(maxNum) && maxNum > 0) {
      list = list.filter((p) => (p.priceRange ? p.priceRange.minINR <= maxNum : p.priceINR <= maxNum));
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.priceINR - b.priceINR);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.priceINR - a.priceINR);
    }

    return list;
  }, [selectedCategory, selectedRoom, selectedMaterial, minPrice, maxPrice, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-mineral-300 pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-mineral-600" />
          <span className="text-xs uppercase tracking-widest text-charcoal-muted font-semibold">
            Product Catalogue
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal">
          Collections & Pieces
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-2xl leading-relaxed">
          Explore ten complete product experiences handcrafted from seasoned Indian teak, walnut, natural stone, and tailored textiles.
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar
        selectedCategory={selectedCategory}
        selectedRoom={selectedRoom}
        selectedMaterial={selectedMaterial}
        minPrice={minPrice}
        maxPrice={maxPrice}
        sortBy={sortBy}
        onCategoryChange={handleCategoryChange}
        onRoomChange={handleRoomChange}
        onMaterialChange={handleMaterialChange}
        onMinPriceChange={handleMinPriceChange}
        onMaxPriceChange={handleMaxPriceChange}
        onSortChange={handleSortChange}
        onClearAll={handleClearAll}
        onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
        totalResults={filteredProducts.length}
      />

      {/* Active Filter Pills */}
      <ActiveFilterPills
        category={selectedCategory}
        room={selectedRoom}
        material={selectedMaterial}
        minPrice={minPrice ? parseInt(minPrice, 10) : undefined}
        maxPrice={maxPrice ? parseInt(maxPrice, 10) : undefined}
        onRemove={handleRemovePill}
        onClearAll={handleClearAll}
      />

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="p-16 text-center bg-mineral-100 border border-mineral-300 space-y-4">
          <h2 className="font-serif text-xl font-medium text-charcoal">
            No furniture matching your criteria
          </h2>
          <p className="text-xs text-charcoal-muted max-w-md mx-auto leading-relaxed">
            Try adjusting your price range, clearing selected material filters, or browsing by all collection categories.
          </p>
          <button
            onClick={handleClearAll}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal text-mineral-50 hover:bg-charcoal-light text-xs font-medium uppercase tracking-wider transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        selectedCategory={selectedCategory}
        selectedRoom={selectedRoom}
        selectedMaterial={selectedMaterial}
        minPrice={minPrice}
        maxPrice={maxPrice}
        sortBy={sortBy}
        onCategoryChange={handleCategoryChange}
        onRoomChange={handleRoomChange}
        onMaterialChange={handleMaterialChange}
        onMinPriceChange={handleMinPriceChange}
        onMaxPriceChange={handleMaxPriceChange}
        onSortChange={handleSortChange}
        onClearAll={handleClearAll}
        totalResults={filteredProducts.length}
      />

      <ReferenceDisclosure variant="card" className="mt-12" />
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-charcoal-muted">Loading catalogue...</div>}>
      <CollectionsCatalogue />
    </Suspense>
  );
}
