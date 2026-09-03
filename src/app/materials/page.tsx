import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { MATERIALS } from '@/content/materials';
import { getProductBySlug } from '@/content/products';
import { ReferenceDisclosure } from '@/components/layout/ReferenceDisclosure';
import { Hammer, Sparkles, ShieldCheck, Check, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Materials & Craftsmanship — Honesty in Regional Hardwoods & Textiles',
  description:
    'An unpadded exploration of Indian teakwood, American walnut, honed Dholpur sandstone, tactile bouclé, and spun brass used across Niyata furniture.',
};

export default function MaterialsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Editorial Header */}
      <div className="border-b border-mineral-300 pb-8 space-y-3">
        <div className="flex items-center gap-2">
          <Hammer className="w-4 h-4 text-mineral-600" />
          <span className="text-xs uppercase tracking-widest text-charcoal-muted font-semibold">
            Craftsmanship & Materiality
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal">
          Materials & Craft Standards
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-2xl leading-relaxed">
          Material honesty without pseudo-sustainability jargon. Every timber blank, textile weave, and stone slab is specified for tactile warmth and resilience in real Indian climates.
        </p>
      </div>

      {/* Workshop Atmosphere Feature */}
      <div className="bg-mineral-100 border border-mineral-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
          <div className="p-8 sm:p-12 lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-widest text-terracotta font-semibold block">
              Workshop Discipline
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal">
              Slow joinery in seasoned Indian hardwoods.
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Our workshops in Ahmedabad and Jodhpur honor timber grain direction, natural expansion relief slots, and traditional mortise-and-tenon joints. We reject quick-assembly staple guns, plastic veneers, and artificial distressing.
            </p>
            <div className="p-4 bg-mineral-50 border border-mineral-200 text-xs text-charcoal-muted space-y-1.5">
              <span className="font-semibold text-charcoal text-[11px] uppercase tracking-wider block">
                Zero Greenwashing Commitment
              </span>
              <p>
                We do not claim fictional carbon-neutrality or arbitrary recycled percentages. We focus on verifiable material honesty: solid kiln-seasoned hardwoods and repairable joinery designed to last generations.
              </p>
            </div>
          </div>

          <div className="relative aspect-[3/2] lg:aspect-auto lg:h-full lg:col-span-6 bg-mineral-200">
            <Image
              src="/images/studio/studio_craftsman_joinery.png"
              alt="Artisan hand-chiseling mortise and tenon teakwood joint in our Ahmedabad workshop"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* Material Specifications Grid */}
      <div className="space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-charcoal-muted font-semibold block">
            Material Library
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-charcoal mt-1">
            Material Macro Specifications
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MATERIALS.map((mat) => {
            const associatedProducts = mat.associatedProductSlugs
              .map((slug) => getProductBySlug(slug))
              .filter(Boolean);

            return (
              <article
                key={mat.id}
                className="bg-mineral-100 border border-mineral-200 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full bg-mineral-200 border-b border-mineral-200">
                    <Image
                      src={mat.image.src}
                      alt={mat.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-charcoal text-mineral-50 text-[10px] uppercase font-semibold px-2 py-0.5">
                      {mat.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-serif text-xl font-medium text-charcoal">
                        {mat.name}
                      </h3>
                      <span className="text-[11px] text-charcoal-subtle block mt-0.5">
                        Origin: {mat.origin}
                      </span>
                    </div>

                    <p className="text-xs text-charcoal-muted leading-relaxed">
                      {mat.tactileDescription}
                    </p>

                    <div className="p-3 bg-mineral-50 border border-mineral-200 text-xs space-y-1">
                      <span className="font-semibold text-charcoal text-[11px] uppercase tracking-wider block">
                        Surface Finish:
                      </span>
                      <p className="text-charcoal-muted">{mat.finishType}</p>
                    </div>

                    <div className="space-y-1.5 text-xs text-charcoal-muted">
                      <span className="font-semibold text-charcoal text-[11px] uppercase tracking-wider block">
                        Care Guidance:
                      </span>
                      <ul className="space-y-1 list-disc list-inside text-[11px]">
                        {mat.careGuidance.slice(0, 3).map((guide, i) => (
                          <li key={i}>{guide}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-mineral-200/60 mt-4">
                  <span className="text-[11px] uppercase tracking-wider text-charcoal-subtle block mb-2 font-medium">
                    Used in Products:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {associatedProducts.map((p) => (
                      <Link
                        key={p!.slug}
                        href={`/products/${p!.slug}`}
                        className="text-[11px] px-2 py-1 bg-mineral-50 border border-mineral-300 hover:border-charcoal text-charcoal transition-colors truncate max-w-full"
                      >
                        {p!.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <ReferenceDisclosure variant="card" className="mt-16" />
    </div>
  );
}
