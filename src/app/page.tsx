import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND } from '@/config/brand';
import { COLLECTIONS } from '@/content/collections';
import { PRODUCTS } from '@/content/products';
import { ROOMS } from '@/content/rooms';
import { ProductCard } from '@/components/catalogue/ProductCard';
import { formatINR } from '@/lib/formatters';
import {
  ArrowRight,
  Sparkles,
  Layers,
  Ruler,
  Compass,
  Hammer,
  ShieldCheck,
  Check,
} from 'lucide-react';

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 6);
  const flagshipSofa = PRODUCTS.find((p) => p.slug === 'prana-modular-sofa') || PRODUCTS[0];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* 1. Full-Width Editorial Room Hero */}
      <section className="relative w-full bg-mineral-200 border-b border-mineral-300 overflow-hidden">
        <div className="relative aspect-[16/9] min-h-[520px] sm:min-h-[640px] w-full">
          <Image
            src="/images/hero/hero_contemporary_living.png"
            alt="Contemporary Indian urban apartment living room featuring Niyata solid teak modular sofa and fluted coffee table"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Subtle architectural gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/30 to-transparent sm:from-charcoal/60 sm:via-transparent" />

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xl space-y-6 text-mineral-50">
                <div className="inline-flex items-center gap-2 bg-charcoal/80 backdrop-blur-md px-3 py-1 text-[11px] uppercase tracking-widest font-mono border border-mineral-400/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta-light" />
                  <span>Architecture For Urban Living</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]">
                  Thoughtful furniture for real Indian spaces.
                </h1>

                <p className="text-xs sm:text-sm text-mineral-200 leading-relaxed max-w-md">
                  Architectural proportions, honest regional hardwoods, and breathable textiles engineered purposefully for contemporary apartments.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link
                    href="/collections"
                    className="px-6 py-3.5 bg-mineral-50 text-charcoal hover:bg-mineral-200 text-xs font-medium tracking-wider uppercase transition-colors text-center shadow-lg"
                  >
                    Explore The Collection
                  </Link>
                  <Link
                    href="/products/prana-modular-sofa?layout=chaise&fabric=moss"
                    className="px-6 py-3.5 bg-charcoal/80 hover:bg-charcoal text-mineral-50 border border-mineral-300/40 text-xs font-medium tracking-wider uppercase transition-colors text-center backdrop-blur-md"
                  >
                    Configure The Sofa
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop by Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-mineral-300">
          <div>
            <span className="text-xs uppercase tracking-widest text-charcoal-muted font-semibold block">
              Curated Systems
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mt-1">
              Shop by Collection
            </h2>
          </div>
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-charcoal hover:text-charcoal-muted uppercase tracking-wider group"
          >
            <span>View All Pieces</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COLLECTIONS.slice(0, 3).map((col) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="group flex flex-col bg-mineral-100 border border-mineral-200 overflow-hidden hover:border-mineral-400 transition-all"
            >
              <div className="relative aspect-[16/10] w-full bg-mineral-200 overflow-hidden">
                <Image
                  src={col.heroImage.src}
                  alt={col.heroImage.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium block mb-1">
                    {col.productCount} Pieces Available
                  </span>
                  <h3 className="font-serif text-xl font-medium text-charcoal group-hover:underline">
                    {col.name}
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-1.5 leading-relaxed line-clamp-2">
                    {col.headline}
                  </p>
                </div>
                <span className="text-xs font-medium text-charcoal uppercase tracking-wider inline-flex items-center gap-1 mt-2">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Flagship Modular Sofa Feature */}
      <section className="bg-mineral-100 border-y border-mineral-300 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 relative aspect-[4/3] bg-mineral-200 border border-mineral-300 overflow-hidden shadow-sm">
              <Image
                src="/images/products/prana_sofa_3seat_oat.png"
                alt="Prana 3-Seat Modular Sofa on solid teak base plinth"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center"
              />
              <div className="absolute top-4 left-4 bg-charcoal text-mineral-50 text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1">
                Flagship Configurable Design
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-terracotta font-semibold">
                  Modular Seating Architecture
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal leading-tight">
                  The Prana Modular Sofa
                </h2>
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                  Engineered with an elevated solid Indian teak plinth that provides 14cm under-sofa clearance for traditional cleaning and robot vacuums. Modular German steel bayonets allow effortless transformation between 2-seat, 3-seat, and extended chaise layouts.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center border-y border-mineral-200 py-4">
                <div>
                  <span className="font-serif text-lg font-semibold text-charcoal block">3</span>
                  <span className="text-[10px] uppercase tracking-wider text-charcoal-muted">Layouts</span>
                </div>
                <div>
                  <span className="font-serif text-lg font-semibold text-charcoal block">3</span>
                  <span className="text-[10px] uppercase tracking-wider text-charcoal-muted">Fabrics</span>
                </div>
                <div>
                  <span className="font-serif text-lg font-semibold text-charcoal block">9</span>
                  <span className="text-[10px] uppercase tracking-wider text-charcoal-muted">Exact Renders</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-serif font-medium text-charcoal block">
                  Illustrative Range: ₹54,900 – ₹84,900
                </span>
                <Link
                  href="/products/prana-modular-sofa?layout=chaise&fabric=moss"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-charcoal text-mineral-50 hover:bg-charcoal-light text-xs font-medium uppercase tracking-widest transition-colors shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-terracotta-light" />
                  <span>Launch Interactive Configurator</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Shop by Room Lookbooks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-mineral-300">
          <div>
            <span className="text-xs uppercase tracking-widest text-charcoal-muted font-semibold block">
              Architectural Contexts
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mt-1">
              Shop by Room
            </h2>
          </div>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-charcoal hover:text-charcoal-muted uppercase tracking-wider group"
          >
            <span>Explore All 5 Rooms</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ROOMS.slice(0, 2).map((room) => (
            <Link
              key={room.slug}
              href={`/rooms#${room.slug}`}
              className="group flex flex-col bg-mineral-100 border border-mineral-200 overflow-hidden hover:border-mineral-400 transition-all"
            >
              <div className="relative aspect-[3/2] w-full bg-mineral-200 overflow-hidden">
                <Image
                  src={room.image.src}
                  alt={room.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-charcoal/80 text-mineral-50 text-[10px] uppercase tracking-wider px-2.5 py-1">
                  {room.subtitle}
                </div>
              </div>
              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-medium text-charcoal group-hover:underline">
                    {room.title}
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-1 leading-relaxed line-clamp-2">
                    {room.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-mineral-200 flex items-center justify-between text-xs text-charcoal">
                  <span>{room.productSlugs.length} Products in scene</span>
                  <span className="font-medium uppercase tracking-wider inline-flex items-center gap-1">
                    <span>View Lookbook</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Selected Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 pb-4 border-b border-mineral-300">
          <span className="text-xs uppercase tracking-widest text-charcoal-muted font-semibold block">
            Crafted Highlights
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mt-1">
            Featured Furniture
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Materials and Craftsmanship Preview */}
      <section className="bg-mineral-100 border-y border-mineral-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-charcoal-muted font-semibold">
                  Material Integrity
                </span>
                <h2 className="font-serif text-3xl font-medium text-charcoal leading-snug">
                  Regional Hardwoods & Unpadded Craft
                </h2>
                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                  We refuse artificial distressing, faux-Italian marketing, and fabricated sustainability claims. Our furniture uses kiln-seasoned Central Indian teak, sustainable walnut, honed Rajasthan sandstones, and spun solid brass that age honestly with touch.
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-charcoal">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-moss" />
                  <span>Kiln-seasoned teakwood with natural beeswax oil finish</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-moss" />
                  <span>Mortise, tenon, and steam-bent structural joinery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-moss" />
                  <span>Zero fabricated carbon-neutrality or pseudo-eco badges</span>
                </div>
              </div>

              <div>
                <Link
                  href="/materials"
                  className="inline-flex items-center gap-1.5 px-6 py-3 bg-charcoal text-mineral-50 hover:bg-charcoal-light text-xs font-medium uppercase tracking-wider transition-colors"
                >
                  <span>Explore Material Specifications</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="relative aspect-square bg-mineral-200 border border-mineral-300 overflow-hidden">
                <Image
                  src="/images/materials/macro_teak_wood_grain.png"
                  alt="Indian teak wood grain macro texture"
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-charcoal/80 text-mineral-50 text-[10px] px-2 py-0.5">
                  Solid Teak
                </span>
              </div>
              <div className="relative aspect-square bg-mineral-200 border border-mineral-300 overflow-hidden">
                <Image
                  src="/images/materials/macro_sandstone_texture.png"
                  alt="Honed Dholpur sandstone macro"
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-charcoal/80 text-mineral-50 text-[10px] px-2 py-0.5">
                  Dholpur Stone
                </span>
              </div>
              <div className="relative aspect-square bg-mineral-200 border border-mineral-300 overflow-hidden">
                <Image
                  src="/images/materials/macro_boucle_textile.png"
                  alt="Moss boucle upholstery texture"
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-charcoal/80 text-mineral-50 text-[10px] px-2 py-0.5">
                  Moss Bouclé
                </span>
              </div>
              <div className="relative aspect-square bg-mineral-200 border border-mineral-300 overflow-hidden">
                <Image
                  src="/images/materials/macro_brushed_brass.png"
                  alt="Solid brushed brass macro detail"
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-charcoal/80 text-mineral-50 text-[10px] px-2 py-0.5">
                  Brushed Brass
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Small-Space Design Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-mineral-100 border border-mineral-300 p-8 sm:p-12">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-terracotta font-semibold">
              Spatial Philosophy
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
              Proportioned for real apartments, not fictional mansions.
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Standard imported luxury furniture is often designed for 5,000-square-foot suburban homes with 12-foot ceilings. In a 2 BHK or 3 BHK apartment in Bandra, Indiranagar, or Surat, these pieces block balconies and obstruct cross-ventilation. Niyata engineers every footprint to preserve sightlines and floor clearances.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Interior Design Consultation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-charcoal text-mineral-50 p-8 sm:p-14 border border-charcoal-light flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-mineral-400 font-mono">
              <Compass className="w-3.5 h-3.5 text-accent-cobalt" />
              <span>Interactive Space Planning</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-mineral-50">
              Plan your space with our design consultation preview.
            </h2>
            <p className="text-xs text-mineral-400 leading-relaxed">
              Step through our client-side consultation wizard to map room dimensions, select material directions, and compile a tailored space brief.
            </p>
          </div>

          <Link
            href="/design-service"
            className="px-8 py-4 bg-mineral-50 text-charcoal hover:bg-mineral-200 text-xs font-medium tracking-wider uppercase transition-colors flex-shrink-0 shadow-lg"
          >
            Start Consultation Preview
          </Link>
        </div>
      </section>
    </div>
  );
}
