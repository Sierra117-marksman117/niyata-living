'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductImage } from '@/types/product';
import { ProductLightbox } from './ProductLightbox';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const currentImage = images[selectedIndex] || images[0];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Frame */}
      <div className="relative aspect-[4/3] w-full bg-mineral-200 border border-mineral-300 overflow-hidden group">
        <Image
          src={currentImage.src}
          alt={currentImage.alt || productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-center transition-all duration-300"
        />

        {/* Fullscreen Magnify Trigger */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-4 right-4 p-2.5 bg-mineral-50/90 hover:bg-mineral-50 border border-mineral-300 text-charcoal shadow-sm transition-all opacity-90 group-hover:opacity-100"
          aria-label="View fullscreen gallery"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Prev / Next Overlay Buttons for Desktop & Tablet */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-mineral-50/80 hover:bg-mineral-50 border border-mineral-300 text-charcoal opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-mineral-50/80 hover:bg-mineral-50 border border-mineral-300 text-charcoal opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Image Counter Badge */}
        <div className="absolute bottom-3 left-3 px-2 py-1 bg-charcoal/80 text-mineral-50 text-[10px] uppercase font-mono tracking-wider">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div
          className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin"
          role="tablist"
          aria-label="Product image thumbnails"
        >
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setSelectedIndex(idx)}
              role="tab"
              aria-selected={idx === selectedIndex}
              className={`relative w-20 h-16 sm:w-24 sm:h-18 flex-shrink-0 bg-mineral-200 border transition-all overflow-hidden ${
                idx === selectedIndex
                  ? 'border-charcoal ring-1 ring-charcoal'
                  : 'border-mineral-300 opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <ProductLightbox
        images={images}
        currentIndex={selectedIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
        onSelectIndex={(idx) => setSelectedIndex(idx)}
      />
    </div>
  );
}
