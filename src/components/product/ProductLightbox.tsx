'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { ProductImage } from '@/types/product';

interface ProductLightboxProps {
  images: ProductImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectIndex: (idx: number) => void;
}

export function ProductLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onSelectIndex,
}: ProductLightboxProps) {
  const currentImage = images[currentIndex] || images[0];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen Image View"
      className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex flex-col justify-between"
    >
      {/* Top Bar */}
      <div className="p-4 sm:p-6 flex items-center justify-between text-mineral-100 z-10">
        <div className="flex items-center gap-3">
          <Maximize2 className="w-4 h-4 text-mineral-400" />
          <span className="text-xs tracking-wider uppercase font-medium">
            Image {currentIndex + 1} of {images.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-mineral-300 hover:text-mineral-50 hover:bg-charcoal-light/50 transition-colors"
          aria-label="Close fullscreen view"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Center Image with Prev / Next Buttons */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-12 overflow-hidden">
        {/* Prev Button */}
        {images.length > 1 && (
          <button
            onClick={onPrev}
            className="absolute left-4 sm:left-8 p-3 bg-charcoal/70 hover:bg-charcoal-light border border-charcoal-muted text-mineral-100 transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Main Image Container */}
        <div className="relative w-full h-full max-w-5xl max-h-[75vh]">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={onNext}
            className="absolute right-4 sm:right-8 p-3 bg-charcoal/70 hover:bg-charcoal-light border border-charcoal-muted text-mineral-100 transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip & Caption */}
      <div className="p-4 sm:p-6 bg-charcoal-light/30 border-t border-charcoal-muted/30">
        <p className="text-center text-xs text-mineral-400 max-w-2xl mx-auto mb-3 line-clamp-1">
          {currentImage.alt}
        </p>

        {images.length > 1 && (
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
            {images.map((img, idx) => (
              <button
                key={img.id || idx}
                onClick={() => onSelectIndex(idx)}
                className={`relative w-14 h-10 flex-shrink-0 border transition-all overflow-hidden ${
                  idx === currentIndex
                    ? 'border-mineral-50 scale-105 shadow-md'
                    : 'border-charcoal-muted opacity-60 hover:opacity-100'
                }`}
                aria-label={`Jump to image ${idx + 1}`}
              >
                <Image src={img.src} alt="" fill sizes="60px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
