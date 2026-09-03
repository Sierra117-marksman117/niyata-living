import React from 'react';
import { Metadata } from 'next';
import { ROOMS } from '@/content/rooms';
import { RoomStoryCard } from '@/components/rooms/RoomStoryCard';
import { ReferenceDisclosure } from '@/components/layout/ReferenceDisclosure';
import { Compass, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Urban Room Lookbooks — Space Planning for Indian Homes',
  description:
    'Explore five realistic Indian urban room settings. Factual space-planning notes, genuine apartment proportions, and cohesive hardwood furniture pairings.',
};

export default function RoomsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Editorial Header */}
      <div className="border-b border-mineral-300 pb-8 space-y-3">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-mineral-600" />
          <span className="text-xs uppercase tracking-widest text-charcoal-muted font-semibold">
            Spatial Editorial
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-charcoal">
          Urban Rooms & Space Planning
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-2xl leading-relaxed">
          Five editorial room stories demonstrating how Niyata furniture integrates into believable 1 BHK, 2 BHK, and 3 BHK Indian urban footprints. Focused on circulation clearance, daylight preservation, and material serenity.
        </p>
      </div>

      {/* 5 Room Stories */}
      <div className="space-y-16 sm:space-y-24">
        {ROOMS.map((room, index) => (
          <RoomStoryCard key={room.id} room={room} index={index} />
        ))}
      </div>

      <ReferenceDisclosure variant="card" className="mt-16" />
    </div>
  );
}
