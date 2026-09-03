'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND } from '@/config/brand';
import { PRODUCTS } from '@/content/products';
import { COLLECTIONS } from '@/content/collections';
import { ROOMS } from '@/content/rooms';
import { AdminCatalogueTable } from '@/components/admin/AdminCatalogueTable';
import { AdminInquiriesInbox } from '@/components/admin/AdminInquiriesInbox';
import { ReferenceDisclosure } from '@/components/layout/ReferenceDisclosure';
import {
  LayoutDashboard,
  Layers,
  Sparkles,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Box,
  Eye,
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'catalogue' | 'inquiries' | 'matrix' | 'studios'>('catalogue');

  const totalCatalogueValue = PRODUCTS.reduce((sum, p) => sum + p.priceINR, 0);

  // 9 Sofa combinations
  const sofaCombinations = [
    { layout: '2-Seat Compact', fabric: 'Oat Natural', src: '/images/products/prana_sofa_2seat_oat.png', price: '₹54,900' },
    { layout: '2-Seat Compact', fabric: 'Muted Moss', src: '/images/products/prana_sofa_2seat_moss.png', price: '₹54,900' },
    { layout: '2-Seat Compact', fabric: 'Terracotta Clay', src: '/images/products/prana_sofa_2seat_clay.png', price: '₹54,900' },
    { layout: '3-Seat Standard', fabric: 'Oat Natural', src: '/images/products/prana_sofa_3seat_oat.png', price: '₹68,900' },
    { layout: '3-Seat Standard', fabric: 'Muted Moss', src: '/images/products/prana_sofa_3seat_moss.png', price: '₹68,900' },
    { layout: '3-Seat Standard', fabric: 'Terracotta Clay', src: '/images/products/prana_sofa_3seat_clay.png', price: '₹68,900' },
    { layout: 'Chaise Lounge', fabric: 'Oat Natural', src: '/images/products/prana_sofa_chaise_oat.png', price: '₹84,900' },
    { layout: 'Chaise Lounge', fabric: 'Muted Moss', src: '/images/products/prana_sofa_chaise_moss.png', price: '₹84,900' },
    { layout: 'Chaise Lounge', fabric: 'Terracotta Clay', src: '/images/products/prana_sofa_chaise_clay.png', price: '₹84,900' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Admin Header */}
      <div className="border-b border-mineral-300 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-cobalt" />
            <span className="text-xs uppercase tracking-widest text-charcoal-muted font-mono font-semibold">
              Studio Operations Panel
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-charcoal mt-1">
            Niyata Studio Admin
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-1 leading-relaxed">
            Centralized management preview for product catalogue, sofa render matrix, consultation leads, and showroom studios.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-mineral-300 bg-mineral-100 hover:bg-mineral-200 text-xs font-medium uppercase tracking-wider text-charcoal transition-colors"
          >
            <span>Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-mineral-100 border border-mineral-300 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-charcoal-muted">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Catalogue Pieces</span>
            <Box className="w-4 h-4 text-mineral-600" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-charcoal block">
            {PRODUCTS.length}
          </span>
          <span className="text-[11px] text-charcoal-subtle block">Across 5 collections</span>
        </div>

        <div className="bg-mineral-100 border border-mineral-300 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-charcoal-muted">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Configurator Variations</span>
            <Sparkles className="w-4 h-4 text-terracotta" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-charcoal block">
            9 Renders
          </span>
          <span className="text-[11px] text-charcoal-subtle block">3 Layouts × 3 Fabrics</span>
        </div>

        <div className="bg-mineral-100 border border-mineral-300 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-charcoal-muted">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Urban Lookbooks</span>
            <Layers className="w-4 h-4 text-mineral-600" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-charcoal block">
            {ROOMS.length} Rooms
          </span>
          <span className="text-[11px] text-charcoal-subtle block">Indian urban footprints</span>
        </div>

        <div className="bg-mineral-100 border border-mineral-300 p-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-charcoal-muted">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Showroom Studios</span>
            <MapPin className="w-4 h-4 text-moss" />
          </div>
          <span className="font-serif text-2xl sm:text-3xl font-bold text-charcoal block">
            {BRAND.studios.length}
          </span>
          <span className="text-[11px] text-charcoal-subtle block">Mumbai, Bengaluru, Ahmedabad</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-mineral-300 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('catalogue')}
          className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'catalogue'
              ? 'border-charcoal text-charcoal'
              : 'border-transparent text-charcoal-muted hover:text-charcoal'
          }`}
        >
          Catalogue & Pricing ({PRODUCTS.length})
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'inquiries'
              ? 'border-charcoal text-charcoal'
              : 'border-transparent text-charcoal-muted hover:text-charcoal'
          }`}
        >
          Consultation Leads & Inquiries
        </button>

        <button
          onClick={() => setActiveTab('matrix')}
          className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'matrix'
              ? 'border-charcoal text-charcoal'
              : 'border-transparent text-charcoal-muted hover:text-charcoal'
          }`}
        >
          Sofa 9-Render Matrix
        </button>

        <button
          onClick={() => setActiveTab('studios')}
          className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap ${
            activeTab === 'studios'
              ? 'border-charcoal text-charcoal'
              : 'border-transparent text-charcoal-muted hover:text-charcoal'
          }`}
        >
          Showroom Studios
        </button>
      </div>

      {/* Tab 1: Catalogue & Pricing Table */}
      {activeTab === 'catalogue' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-medium text-charcoal">
              Catalogue Management
            </h2>
            <span className="text-xs text-charcoal-muted font-mono">
              Total Valuation: ₹{totalCatalogueValue.toLocaleString('en-IN')}
            </span>
          </div>
          <AdminCatalogueTable />
        </div>
      )}

      {/* Tab 2: Inquiries Inbox */}
      {activeTab === 'inquiries' && <AdminInquiriesInbox />}

      {/* Tab 3: Sofa Matrix Inspector */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div>
            <h2 className="font-serif text-xl font-medium text-charcoal">
              Flagship Sofa 9-Combination Render Matrix
            </h2>
            <p className="text-xs text-charcoal-muted mt-1">
              Every layout and fabric combination mapped directly to approved commercial photography.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sofaCombinations.map((combo, i) => (
              <div
                key={i}
                className="bg-mineral-100 border border-mineral-300 overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] bg-mineral-200">
                  <Image
                    src={combo.src}
                    alt={`${combo.layout} in ${combo.fabric}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-charcoal/80 text-mineral-50 text-[10px] font-mono">
                    {combo.price}
                  </span>
                </div>

                <div className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-charcoal block">{combo.layout}</span>
                    <span className="text-charcoal-muted text-[11px]">{combo.fabric}</span>
                  </div>
                  <Link
                    href={`/products/prana-modular-sofa?layout=${combo.layout.toLowerCase().split(' ')[0]}&fabric=${combo.fabric.toLowerCase().split(' ')[0]}`}
                    target="_blank"
                    className="text-[11px] text-charcoal underline hover:text-charcoal-muted"
                  >
                    Test URL
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Showrooms Manager */}
      {activeTab === 'studios' && (
        <div className="space-y-6">
          <div>
            <h2 className="font-serif text-xl font-medium text-charcoal">
              Showroom Studio Network
            </h2>
            <p className="text-xs text-charcoal-muted mt-1">
              Active physical customer consultation locations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BRAND.studios.map((studio) => (
              <div key={studio.city} className="bg-mineral-100 border border-mineral-300 p-6 space-y-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-accent-cobalt">
                    {studio.type}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-charcoal mt-1">
                    {studio.city} Atelier
                  </h3>
                  <p className="text-xs text-charcoal font-medium mt-1">
                    {studio.address}, {studio.neighbourhood}
                  </p>
                  <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">{studio.note}</p>
                </div>

                <div className="pt-4 border-t border-mineral-200 text-xs text-charcoal-muted space-y-1">
                  <p>
                    <strong>Email:</strong> {BRAND.contact.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {BRAND.contact.phone}
                  </p>
                  <p>
                    <strong>Hours:</strong> {BRAND.contact.enquiryHours}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ReferenceDisclosure variant="card" className="mt-16" />
    </div>
  );
}
