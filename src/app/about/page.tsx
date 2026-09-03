import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { BRAND } from '@/config/brand';
import { ReferenceDisclosure } from '@/components/layout/ReferenceDisclosure';
import { Compass, Sparkles, Hammer, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Niyata Living — Contemporary Indian Furniture Experience',
  description:
    'Thoughtful furniture for real Indian spaces. Architectural proportions, honest regional hardwoods, and breathable textiles engineered purposefully for contemporary apartments.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="border-b border-mineral-300 pb-8 space-y-3">
        <span className="text-xs uppercase tracking-widest text-charcoal-muted font-semibold block">
          About The Studio
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-charcoal max-w-3xl leading-tight">
          Thoughtful furniture for real Indian spaces.
        </h1>
        <p className="font-serif italic text-charcoal-muted text-base sm:text-lg max-w-2xl">
          {BRAND.mission}
        </p>
      </div>

      {/* Main Story & Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-6 space-y-5 text-xs sm:text-sm text-charcoal-muted leading-relaxed">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
            The Urban Proportion Dilemma
          </h2>
          <p>
            Modern furniture retail in India often swings between two extremes: mass-produced flat-pack pieces made from disposable fiberboard that sag in monsoon humidity, or oversized imported "luxury" suites engineered for sprawling European villas that overwhelm compact 2 BHK and 3 BHK apartment layouts.
          </p>
          <p>
            {BRAND.name} was conceived as a measured, architectural response. We design furniture around the real architectural parameters of Indian urban homes: practical ceiling heights, balcony sightlines, unblocked circulation pathways, and clearance for automated cleaning robots and traditional floor mopping.
          </p>
          <p>
            Every piece is made from seasoned regional hardwoods—predominantly Central Indian teakwood and sustainable walnut—paired with honest textiles like pre-washed linen-cotton slubs and textured bouclés that breathe naturally in tropical heat.
          </p>
        </div>

        <div className="lg:col-span-6 relative aspect-[4/3] bg-mineral-200 border border-mineral-300 overflow-hidden shadow-sm">
          <Image
            src="/images/hero/hero_contemporary_living.png"
            alt="Niyata Living contemporary urban interior setting"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* 3 Core Tenets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-mineral-300">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-charcoal">
            <Compass className="w-5 h-5 text-mineral-600" />
            <h3 className="font-serif text-lg font-medium">1. Architectural Restraint</h3>
          </div>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            We avoid visual clutter and bulbous geometry. Low profiles preserve sightlines and create visual airiness, making apartments feel larger and more grounded.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-charcoal">
            <Hammer className="w-5 h-5 text-mineral-600" />
            <h3 className="font-serif text-lg font-medium">2. Regional Hardwood Honesty</h3>
          </div>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            We use solid seasoned teakwood with natural beeswax oil finishes. No toxic polyurethane varnishes, no imitation wood grain foils, and no faux-distressed gimmicks.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-charcoal">
            <ShieldCheck className="w-5 h-5 text-mineral-600" />
            <h3 className="font-serif text-lg font-medium">3. Unpadded Authenticity</h3>
          </div>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            Zero fake sale timers, zero crossed-out inflated MRPs, and zero fabricated eco-credentials. We believe in transparent material specifications and fair pricing.
          </p>
        </div>
      </div>

      {/* Workshop Atmosphere Feature */}
      <div className="bg-mineral-100 border border-mineral-200 p-8 sm:p-12">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs uppercase tracking-widest text-charcoal-muted font-semibold">
            Craft Workshops
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
            Workshops in Ahmedabad & Jodhpur
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Our pieces are produced in small artisanal batches in Gujarat and Rajasthan. By uniting generational timber carpentry with precision digital milling, we achieve mortise-and-tenon tolerances that ensure decade-long structural silence.
          </p>
          <div className="pt-2">
            <Link
              href="/materials"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-charcoal hover:underline"
            >
              <span>Explore Materials & Craft</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <ReferenceDisclosure variant="card" className="mt-16" />
    </div>
  );
}
