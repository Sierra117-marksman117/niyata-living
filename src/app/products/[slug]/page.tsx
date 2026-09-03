import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { PRODUCTS, getProductBySlug, getRelatedProducts } from '@/content/products';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductSpecs } from '@/components/product/ProductSpecs';
import { CareAndAssembly } from '@/components/product/CareAndAssembly';
import { AddToCartButton } from '@/components/product/AddToCartButton';
import { ModularSofaConfigurator } from '@/components/configurator/ModularSofaConfigurator';
import { ProductCard } from '@/components/catalogue/ProductCard';
import { ReferenceDisclosure } from '@/components/layout/ReferenceDisclosure';
import { formatINR, formatINRRange } from '@/lib/formatters';
import { ArrowLeft, Sparkles, MapPin, Check, ShieldCheck } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: 'Product Not Found' };
  }
  return {
    title: `${product.name} — Contemporary Indian Furniture`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Niyata Living`,
      description: product.tagline,
      images: [
        {
          url: product.images[0].src,
          width: product.images[0].width,
          height: product.images[0].height,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.slug, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* Breadcrumb / Back Link */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-charcoal-muted">
        <Link href="/collections" className="hover:text-charcoal transition-colors">
          Catalogue
        </Link>
        <span>/</span>
        <Link
          href={`/collections?category=${product.category}`}
          className="hover:text-charcoal transition-colors capitalize"
        >
          {product.categoryLabel}
        </Link>
        <span>/</span>
        <span className="text-charcoal font-medium">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Column: Product Narrative & Purchasing Journey */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3 pb-6 border-b border-mineral-200">
            <div className="flex items-center justify-between text-xs text-charcoal-muted">
              <span className="uppercase tracking-widest font-semibold text-[11px]">
                {product.categoryLabel}
              </span>
              <span>{product.origin}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal">
              {product.name}
            </h1>

            <p className="font-serif italic text-charcoal-muted text-sm leading-relaxed">
              {product.tagline}
            </p>

            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-widest text-charcoal-subtle block">
                Illustrative Price
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal">
                {product.priceRange
                  ? formatINRRange(product.priceRange.minINR, product.priceRange.maxINR)
                  : formatINR(product.priceINR)}
              </span>
            </div>
          </div>

          {/* Description & Narrative */}
          <div className="space-y-3 text-xs text-charcoal-muted leading-relaxed">
            <p>{product.description}</p>
            <p>{product.detailedStory}</p>
          </div>

          {/* Available Finishes & Materials */}
          <div className="space-y-3 pt-2">
            <span className="text-xs uppercase font-semibold tracking-wider text-charcoal block">
              Available Tones & Finishes
            </span>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <div
                  key={c.code}
                  className="flex items-center gap-2 px-3 py-1.5 bg-mineral-100 border border-mineral-300 text-xs text-charcoal"
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-mineral-400 shadow-inner flex-shrink-0"
                    style={{ backgroundColor: c.hex }}
                    aria-hidden="true"
                  />
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* If NOT flagship sofa: show normal Add to Cart button */}
          {!product.isFlagshipConfigurable && (
            <div className="pt-4">
              <AddToCartButton product={product} />
            </div>
          )}

          {/* If flagship sofa: anchor link to interactive configurator below */}
          {product.isFlagshipConfigurable && (
            <div className="p-4 bg-mineral-100 border border-mineral-300 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-terracotta" />
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Configurable Modular Sofa
                </span>
              </div>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Prana is configurable in 3 layouts (2-Seat, 3-Seat, Chaise) and 3 tactile fabrics.
              </p>
              <a
                href="#configurator-section"
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-charcoal text-mineral-50 hover:bg-charcoal-light text-xs font-medium uppercase tracking-wider transition-colors"
              >
                <span>Launch Sofa Configurator Below</span>
              </a>
            </div>
          )}

          {/* Key Quick Facts */}
          <div className="p-4 bg-mineral-100 border border-mineral-200 text-xs text-charcoal-muted space-y-2">
            <div className="flex items-center gap-2 text-charcoal font-medium">
              <ShieldCheck className="w-4 h-4 text-mineral-600" />
              <span>Reference Build Specifications</span>
            </div>
            <ul className="space-y-1 text-[11px] list-disc list-inside">
              <li>Primary material: {product.primaryMaterial}</li>
              <li>Dimensions: {product.dimensions.formatted}</li>
              <li>{product.assemblyInfo.level}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Flagship Configurator Section (if configurable sofa) */}
      {product.isFlagshipConfigurable && (
        <Suspense fallback={<div className="p-8 text-center text-xs">Loading configurator...</div>}>
          <ModularSofaConfigurator product={product} />
        </Suspense>
      )}

      {/* Detailed Technical Specs & Dimensions */}
      <ProductSpecs product={product} />

      {/* Care, Assembly & Warranty Accordions */}
      <CareAndAssembly product={product} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-mineral-200 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-mineral-200">
            <h2 className="font-serif text-2xl font-medium text-charcoal">
              Complementary Pieces
            </h2>
            <Link
              href="/collections"
              className="text-xs font-medium text-charcoal-muted hover:text-charcoal uppercase tracking-wider"
            >
              View Catalogue
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <ReferenceDisclosure variant="card" className="mt-12" />
    </div>
  );
}
