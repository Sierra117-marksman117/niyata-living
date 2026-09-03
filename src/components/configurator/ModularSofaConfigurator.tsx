'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product, SofaLayoutOption, SofaFabricOption } from '@/types/product';
import { formatINR } from '@/lib/formatters';
import { useCart } from '@/hooks/useCart';
import { Sparkles, ShoppingBag, Check, Layers, Palette, Ruler, Info } from 'lucide-react';
import { ReferenceDisclosure } from '../layout/ReferenceDisclosure';

interface ModularSofaConfiguratorProps {
  product: Product;
}

export function ModularSofaConfigurator({ product }: ModularSofaConfiguratorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem } = useCart();

  const layouts = useMemo(() => product.sofaLayouts || [], [product.sofaLayouts]);
  const fabrics = useMemo(() => product.sofaFabrics || [], [product.sofaFabrics]);

  // Derived directly from URL searchParams
  const layoutParam = searchParams.get('layout') || '3-seat';
  const fabricParam = searchParams.get('fabric') || 'oat';

  const selectedLayoutId = layouts.some((l) => l.id === layoutParam) ? layoutParam : '3-seat';
  const selectedFabricId = fabrics.some((f) => f.id === fabricParam) ? fabricParam : 'oat';

  const [added, setAdded] = useState(false);

  // Update URL query parameters
  const updateConfiguration = (newLayoutId: string, newFabricId: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('layout', newLayoutId);
    params.set('fabric', newFabricId);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const selectedLayout = layouts.find((l) => l.id === selectedLayoutId) || layouts[1];
  const selectedFabric = fabrics.find((f) => f.id === selectedFabricId) || fabrics[0];

  // Match the exact render image
  const renderSrc = `/images/products/prana_sofa_${selectedLayoutId.replace('-', '')}_${selectedFabricId}.png`;

  const handleAddToCart = () => {
    addItem({
      productSlug: product.slug,
      productName: `${product.name} (${selectedLayout.name})`,
      category: product.categoryLabel,
      imageSrc: renderSrc,
      unitPriceINR: selectedLayout.priceINR,
      quantity: 1,
      selectedLayout: selectedLayout.name,
      selectedFabric: selectedFabric.name,
      selectedColor: selectedFabric.toneDescription,
      selectedMaterial: `Solid Teak Base • ${selectedFabric.composition}`,
      dimensionsSummary: selectedLayout.dimensionsCm,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section
      id="configurator-section"
      className="bg-mineral-100 border border-mineral-300 p-4 sm:p-8 space-y-8"
      aria-label="Modular Sofa Configurator"
    >
      {/* Header Badge & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-mineral-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-accent-vermilion" />
            <span className="text-[11px] uppercase tracking-widest text-charcoal-muted font-semibold">
              Configuration Preview
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-medium text-charcoal mt-1">
            Configure Your Prana System
          </h2>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-[10px] uppercase tracking-widest text-charcoal-subtle block">
            Configured Price (INR)
          </span>
          <span className="text-2xl font-serif font-semibold text-charcoal">
            {formatINR(selectedLayout.priceINR)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Configurator Render Canvas */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] w-full bg-mineral-200 border border-mineral-300 overflow-hidden shadow-inner">
            <Image
              src={renderSrc}
              alt={`Prana Modular Sofa in ${selectedLayout.name} layout and ${selectedFabric.name} fabric`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center transition-all duration-300"
            />

            {/* Active Combination Watermark Badge */}
            <div className="absolute bottom-3 left-3 bg-charcoal/80 backdrop-blur-sm text-mineral-50 px-3 py-1.5 text-xs flex items-center gap-2 font-mono">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedFabric.hex }} />
              <span>
                {selectedLayout.name} / {selectedFabric.name}
              </span>
            </div>
          </div>

          {/* Real-time Dimensions Indicator */}
          <div className="p-3.5 bg-mineral-50 border border-mineral-200 text-xs text-charcoal-muted flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-mineral-600" />
              <span>Footprint:</span>
              <strong className="text-charcoal">{selectedLayout.dimensionsCm}</strong>
            </div>
            <span className="text-[11px] text-charcoal-subtle">
              14 cm under-sofa robot vacuum clearance
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Selectors */}
        <div className="lg:col-span-5 space-y-6">
          {/* Step 1: Layout Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold tracking-wider text-charcoal flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-mineral-600" />
                <span>1. Select Layout & Proportions</span>
              </span>
              <span className="text-xs font-serif text-charcoal font-medium">
                {selectedLayout.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {layouts.map((layout) => (
                <button
                  key={layout.id}
                  type="button"
                  onClick={() => updateConfiguration(layout.id, selectedFabricId)}
                  className={`p-3 text-left border transition-all text-xs flex flex-col justify-between min-h-[5.5rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal ${
                    selectedLayoutId === layout.id
                      ? 'border-charcoal bg-mineral-50 shadow-sm ring-1 ring-charcoal'
                      : 'border-mineral-300 bg-mineral-100 hover:bg-mineral-50/80 text-charcoal-muted'
                  }`}
                  aria-pressed={selectedLayoutId === layout.id}
                >
                  <span className="font-semibold text-charcoal block">{layout.name}</span>
                  <span className="text-[11px] text-charcoal-muted block mt-1">
                    {layout.dimensionsCm.split(' ')[0]} cm wide
                  </span>
                  <span className="text-xs font-medium text-charcoal mt-2 block">
                    {formatINR(layout.priceINR)}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-charcoal-muted leading-relaxed">
              {selectedLayout.description}
            </p>
          </div>

          {/* Step 2: Fabric & Color Selection */}
          <div className="space-y-3 pt-4 border-t border-mineral-200">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-semibold tracking-wider text-charcoal flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-mineral-600" />
                <span>2. Select Tactile Upholstery</span>
              </span>
              <span className="text-xs font-serif text-charcoal font-medium">
                {selectedFabric.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {fabrics.map((fabric) => (
                <button
                  key={fabric.id}
                  type="button"
                  onClick={() => updateConfiguration(selectedLayoutId, fabric.id)}
                  className={`p-3 text-left border transition-all text-xs flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal ${
                    selectedFabricId === fabric.id
                      ? 'border-charcoal bg-mineral-50 shadow-sm ring-1 ring-charcoal'
                      : 'border-mineral-300 bg-mineral-100 hover:bg-mineral-50/80'
                  }`}
                  aria-pressed={selectedFabricId === fabric.id}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-mineral-400 flex-shrink-0 shadow-inner"
                    style={{ backgroundColor: fabric.hex }}
                    aria-hidden="true"
                  />
                  <div>
                    <span className="font-semibold text-charcoal block">{fabric.name}</span>
                    <span className="text-[10px] text-charcoal-muted block capitalize">
                      {fabric.id}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-charcoal-muted leading-relaxed">
              {selectedFabric.toneDescription}. Composition: {selectedFabric.composition}.
            </p>
          </div>

          {/* Summary & Add to Cart */}
          <div className="pt-4 border-t border-mineral-200 space-y-4">
            <div className="bg-mineral-50 p-3.5 border border-mineral-200 text-xs space-y-1">
              <div className="flex justify-between text-charcoal-muted">
                <span>Selected Configuration:</span>
                <span className="font-medium text-charcoal">
                  {selectedLayout.name} in {selectedFabric.name}
                </span>
              </div>
              <div className="flex justify-between text-charcoal-muted">
                <span>Hardwood Plinth:</span>
                <span className="font-medium text-charcoal">Solid Central Indian Teak</span>
              </div>
              <div className="flex justify-between text-charcoal-muted">
                <span>Estimated Craft Time:</span>
                <span className="font-medium text-charcoal">3 Weeks (Illustrative)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-3.5 px-6 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-widest transition-all ${
                added
                  ? 'bg-moss text-mineral-50'
                  : 'bg-charcoal text-mineral-50 hover:bg-charcoal-light shadow-md'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart Preview</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Configured Sofa to Cart Preview • {formatINR(selectedLayout.priceINR)}</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-charcoal-subtle text-center">
              Selection retained in URL query parameters. Refreshing will preserve your configuration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
