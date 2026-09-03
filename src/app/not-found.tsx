import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Home, Layers } from 'lucide-react';
import { ReferenceDisclosure } from '@/components/layout/ReferenceDisclosure';

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
      <div className="space-y-4">
        <span className="text-xs uppercase tracking-widest text-terracotta font-mono font-semibold">
          Error 404 • Page Not Found
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-medium text-charcoal">
          This piece or space does not exist.
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto leading-relaxed">
          The collection category, room lookbook, or product slug you requested is not part of this furniture reference build.
        </p>
      </div>

      {/* Suggested Crawlable Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4">
        <Link
          href="/"
          className="p-5 bg-mineral-100 hover:bg-mineral-200/80 border border-mineral-300 text-left transition-colors group flex flex-col justify-between space-y-3"
        >
          <div className="flex items-center justify-between">
            <Home className="w-5 h-5 text-mineral-600" />
            <ArrowRight className="w-4 h-4 text-charcoal-subtle group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div>
            <span className="text-sm font-medium text-charcoal block">Homepage</span>
            <span className="text-[11px] text-charcoal-muted block mt-0.5">Return to brand overview</span>
          </div>
        </Link>

        <Link
          href="/collections"
          className="p-5 bg-mineral-100 hover:bg-mineral-200/80 border border-mineral-300 text-left transition-colors group flex flex-col justify-between space-y-3"
        >
          <div className="flex items-center justify-between">
            <Layers className="w-5 h-5 text-mineral-600" />
            <ArrowRight className="w-4 h-4 text-charcoal-subtle group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div>
            <span className="text-sm font-medium text-charcoal block">All Collections</span>
            <span className="text-[11px] text-charcoal-muted block mt-0.5">Filter the complete catalogue</span>
          </div>
        </Link>

        <Link
          href="/products/prana-modular-sofa?layout=chaise&fabric=moss"
          className="p-5 bg-mineral-100 hover:bg-mineral-200/80 border border-mineral-300 text-left transition-colors group flex flex-col justify-between space-y-3"
        >
          <div className="flex items-center justify-between">
            <Compass className="w-5 h-5 text-mineral-600" />
            <ArrowRight className="w-4 h-4 text-charcoal-subtle group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div>
            <span className="text-sm font-medium text-charcoal block">Sofa Configurator</span>
            <span className="text-[11px] text-charcoal-muted block mt-0.5">Launch 9-render preview</span>
          </div>
        </Link>
      </div>

      <div className="pt-8">
        <ReferenceDisclosure variant="inline" />
      </div>
    </div>
  );
}
