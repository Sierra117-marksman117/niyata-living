import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RoomLookbook } from '@/types/room';
import { getProductBySlug } from '@/content/products';
import { formatINR } from '@/lib/formatters';
import { MapPin, Compass, ArrowRight, Layers } from 'lucide-react';

interface RoomStoryCardProps {
  room: RoomLookbook;
  index: number;
}

export function RoomStoryCard({ room, index }: RoomStoryCardProps) {
  const roomProducts = room.productSlugs
    .map((slug) => getProductBySlug(slug))
    .filter(Boolean);

  const isReversed = index % 2 !== 0;

  return (
    <article
      id={room.slug}
      className="bg-mineral-100 border border-mineral-200 overflow-hidden shadow-sm"
      aria-labelledby={`room-title-${room.id}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        {/* Room Photograph */}
        <div
          className={`relative aspect-[3/2] lg:aspect-auto lg:h-full lg:col-span-7 bg-mineral-200 overflow-hidden ${
            isReversed ? 'lg:order-2' : ''
          }`}
        >
          <Image
            src={room.image.src}
            alt={room.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-center"
          />
          {/* Room Metadata Overlay Badge */}
          <div className="absolute top-4 left-4 bg-charcoal/85 backdrop-blur-sm text-mineral-50 text-[11px] px-3 py-1.5 flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-terracotta-light" />
            <span className="font-mono">{room.subtitle}</span>
          </div>
        </div>

        {/* Room Editorial Story & Space Planning */}
        <div
          className={`p-6 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between space-y-6 ${
            isReversed ? 'lg:order-1' : ''
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-charcoal-muted font-medium">
              <Compass className="w-3.5 h-3.5 text-mineral-600" />
              <span>{room.floorplanType} • {room.dimensionsFootprint}</span>
            </div>

            <h2
              id={`room-title-${room.id}`}
              className="font-serif text-2xl sm:text-3xl font-medium text-charcoal leading-snug"
            >
              {room.title}
            </h2>

            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              {room.description}
            </p>

            {/* Space Planning Box */}
            <div className="p-4 bg-mineral-50 border border-mineral-200 space-y-2 text-xs">
              <span className="font-semibold text-charcoal block uppercase tracking-wider text-[11px]">
                Space-Planning Architecture
              </span>
              <p className="text-charcoal-muted leading-relaxed">{room.spacePlanningNote}</p>
            </div>

            {/* Architectural Elements */}
            <div className="space-y-1.5 pt-1 text-xs text-charcoal-muted">
              <span className="font-semibold text-charcoal text-[11px] uppercase tracking-wider block">
                Interior Finishes
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                {room.architecturalElements.map((elem, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-mineral-500" />
                    <span>{elem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Featured Pieces in Room */}
          <div className="pt-4 border-t border-mineral-200 space-y-3">
            <span className="text-[11px] uppercase tracking-wider text-charcoal-muted font-semibold block">
              Featured Furniture In This Room
            </span>
            <div className="grid grid-cols-2 gap-2">
              {roomProducts.map((p) => (
                <Link
                  key={p!.slug}
                  href={`/products/${p!.slug}`}
                  className="p-2.5 bg-mineral-50 hover:bg-mineral-200/70 border border-mineral-200 transition-colors group flex flex-col justify-between"
                >
                  <span className="text-xs font-medium text-charcoal group-hover:underline truncate block">
                    {p!.name}
                  </span>
                  <span className="text-[11px] text-charcoal-subtle font-mono mt-1">
                    {formatINR(p!.priceINR)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
