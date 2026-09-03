import React from 'react';
import { Metadata } from 'next';
import { ConsultationForm } from '@/components/design-service/ConsultationForm';
import { ReferenceDisclosure } from '@/components/layout/ReferenceDisclosure';
import { Compass, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Interior Design Consultation Journey — Interactive Space Planning',
  description:
    'Interactive client-side consultation wizard to map room dimensions, select material directions, and compile a tailored space brief.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DesignServicePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-mineral-300 pb-8 space-y-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-mineral-200 px-3 py-1 text-xs uppercase tracking-widest text-charcoal font-semibold">
          <Compass className="w-3.5 h-3.5 text-accent-cobalt" />
          <span>Design-Service Preview</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal">
          Space-Planning Consultation
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
          Experience our guided space-planning brief generator. Tailor your urban footprint, select material palettes, and define lifestyle priorities.
        </p>
      </div>

      {/* Interactive Consultation Flow */}
      <ConsultationForm />

      <ReferenceDisclosure variant="card" className="mt-16" />
    </div>
  );
}
