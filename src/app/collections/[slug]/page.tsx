import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { COLLECTIONS, getCollectionBySlug } from '@/content/collections';
import { PRODUCTS } from '@/content/products';
import { ProductCard } from '@/components/catalogue/ProductCard';
import { ReferenceDisclosure } from '@/components/layout/ReferenceDisclosure';
import { ArrowLeft, Layers } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COLLECTIONS.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) {
    return { title: 'Collection Not Found' };
  }
  return {
    title: `${collection.name} Collection`,
    description: collection.description,
  };
}

export default async function SingleCollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const collectionProducts = PRODUCTS.filter((p) => p.category === collection.category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back Link */}
      <div>
        <Link
          href="/collections"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-charcoal-muted hover:text-charcoal uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Collections</span>
        </Link>
      </div>

      {/* Hero Banner */}
      <div className="bg-mineral-100 border border-mineral-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
          <div className="p-8 sm:p-12 lg:col-span-7 space-y-4">
            <span className="text-xs uppercase tracking-widest text-charcoal-muted font-semibold block">
              Curated Collection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal">
              {collection.name}
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed max-w-xl">
              {collection.description}
            </p>
            <div className="p-4 bg-mineral-50 border border-mineral-200 text-xs text-charcoal-muted space-y-1">
              <span className="font-semibold text-charcoal text-[11px] uppercase tracking-wider block">
                Curator Note
              </span>
              <p>{collection.curatorNote}</p>
            </div>
          </div>

          <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full lg:col-span-5 bg-mineral-200">
            <Image
              src={collection.heroImage.src}
              alt={collection.heroImage.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-mineral-200">
          <h2 className="font-serif text-xl font-medium text-charcoal">
            {collection.name} Pieces ({collectionProducts.length})
          </h2>
          <span className="text-xs text-charcoal-muted">All prices illustrative</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collectionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <ReferenceDisclosure variant="card" className="mt-12" />
    </div>
  );
}
