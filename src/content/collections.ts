import { Collection } from '@/types/collection';

export const COLLECTIONS: Collection[] = [
  {
    id: 'col-seating',
    slug: 'seating',
    name: 'Seating',
    category: 'seating',
    headline: 'Architectural comfort scaled for Indian urban living rooms and bedrooms.',
    description:
      'From our flagship low-profile Prana modular sofa system to the sculptural Kaya lounge chair and Setu transition bench, every seating design balances deep lumbar ergonomics with clean floor clearances.',
    curatorNote:
      'Engineered with kiln-seasoned Indian teakwood and heavy 480 GSM tactile weaves that resist tropical humidity.',
    heroImage: {
      src: '/images/rooms/room_urban_living_bandra.png',
      alt: 'Niyata Seating collection in an urban Indian apartment',
      width: 1600,
      height: 1000,
    },
    productCount: 4,
    featuredProductSlugs: ['prana-modular-sofa', 'kaya-lounge-chair', 'setu-bench', 'dhyaan-dining-chair'],
  },
  {
    id: 'col-tables',
    slug: 'tables',
    name: 'Tables',
    category: 'tables',
    headline: 'Centering surfaces in solid regional teak, turned bases, and honed Indian sandstone.',
    description:
      'Explore dining and living tables built with traditional wedge joinery, chamfered edge profiles, and durable natural stone surfaces engineered for daily life.',
    curatorNote:
      'All table surfaces are treated with non-toxic matte food-grade sealants to repel turmeric, tea, and oils.',
    heroImage: {
      src: '/images/rooms/room_dining_ahmedabad.png',
      alt: 'Veda dining table and Aalap coffee table collection',
      width: 1600,
      height: 1000,
    },
    productCount: 3,
    featuredProductSlugs: ['veda-dining-table', 'aalap-coffee-table', 'tarang-side-table'],
  },
  {
    id: 'col-storage',
    slug: 'storage',
    name: 'Storage',
    category: 'storage',
    headline: 'Calm, clutter-free credenzas and open modular shelving units.',
    description:
      'Designed to keep contemporary spaces luminous and organized. Featuring sliding slatted tambour doors, soft-close hardware, and modular steel trays.',
    curatorNote:
      'Slatted tambour doors allow remote control infrared passthrough while maintaining clean visual lines.',
    heroImage: {
      src: '/images/products/kosh_sideboard_hero.png',
      alt: 'Kosh slatted credenza and Sopan open shelving',
      width: 1600,
      height: 1000,
    },
    productCount: 2,
    featuredProductSlugs: ['kosh-sideboard', 'sopan-shelving-unit'],
  },
  {
    id: 'col-bedroom',
    slug: 'bedroom',
    name: 'Bedroom',
    category: 'bedroom',
    headline: 'Grounded, tranquil platform beds and restful companion furniture.',
    description:
      'The Nidra low platform bed creates an oasis of calm with floating plinths, sprung birch slats, and upholstered linen headrests.',
    curatorNote:
      'Low bed profiles visually expand ceiling heights and maintain cross-ventilation in urban bedrooms.',
    heroImage: {
      src: '/images/rooms/room_bedroom_indiranagar.png',
      alt: 'Nidra Platform Bed and Setu Bench in a calm bedroom',
      width: 1600,
      height: 1000,
    },
    productCount: 3,
    featuredProductSlugs: ['nidra-platform-bed', 'setu-bench', 'tarang-side-table'],
  },
  {
    id: 'col-objects',
    slug: 'objects',
    name: 'Selected Objects',
    category: 'objects',
    headline: 'Refined ambient lighting and architectural accents.',
    description:
      'Carefully resolved lighting fixtures and material accents crafted from spun solid brass, turned teakwood, and handwoven linens.',
    curatorNote:
      'Warm 2700K ambient illumination designed to replace harsh overhead lighting with atmospheric warmth.',
    heroImage: {
      src: '/images/products/aksh_floor_lamp_ambient.png',
      alt: 'Aksh Spun Brass Floor Lamp in ambient evening light',
      width: 1600,
      height: 1000,
    },
    productCount: 1,
    featuredProductSlugs: ['aksh-floor-lamp'],
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
