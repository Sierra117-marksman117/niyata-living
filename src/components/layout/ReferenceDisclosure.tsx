import React from 'react';
import { BRAND } from '@/config/brand';
import { AlertCircle } from 'lucide-react';

interface ReferenceDisclosureProps {
  variant?: 'banner' | 'card' | 'inline';
  className?: string;
}

export function ReferenceDisclosure({ variant = 'banner', className = '' }: ReferenceDisclosureProps) {
  if (variant === 'card') {
    return (
      <div
        className={`bg-mineral-100 border border-mineral-300 rounded-none p-5 text-sm text-charcoal-muted leading-relaxed ${className}`}
        role="note"
        aria-label="Reference Build Disclosure"
      >
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-mineral-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <span className="font-medium text-charcoal block mb-1">Architecture Reference Notice</span>
            <p>{BRAND.referenceDisclosure}</p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <p className={`text-xs text-charcoal-subtle tracking-wide ${className}`} role="note">
        {BRAND.referenceDisclosure}
      </p>
    );
  }

  return (
    <div
      className={`bg-mineral-200 border-b border-mineral-300 py-2 px-4 text-xs text-charcoal-muted text-center tracking-wide ${className}`}
      role="note"
      aria-label="Reference Build Notice"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-mineral-600" aria-hidden="true" />
        <span>{BRAND.referenceDisclosure}</span>
      </div>
    </div>
  );
}
