import { RoomLookbook } from '@/types/room';

export const ROOMS: RoomLookbook[] = [
  {
    id: 'room-01',
    slug: 'compact-urban-living-bandra',
    title: 'Compact Urban Living Room',
    subtitle: 'Bandra, Mumbai • 2 BHK Apartment (14 × 18 ft)',
    roomCategory: 'living',
    floorplanType: '2 BHK Urban',
    locationContext: 'Bandra West, Mumbai',
    dimensionsFootprint: '14 × 18 ft (252 sq ft)',
    description:
      'A masterclass in space consciousness for sea-breeze urban apartments. Clean lime-wash plaster walls, terrazzo tiles, and floating furniture profiles maintain natural light and unblocked circulation pathways.',
    spacePlanningNote:
      'We anchored the room with the 2-Seat Prana Modular Sofa in Oat Natural upholstery. Pairing it with the circular Aalap Fluted Coffee Table eliminates sharp circulation corners, while the Tarang Side Table offers mobile utility without crowding floor space.',
    architecturalElements: [
      'Off-white mineral lime-wash wall finish',
      'Grey-beige aggregate terrazzo flooring',
      'Full-height sheer linen drapery filtering afternoon coastal daylight',
      'Custom teak slatted room divider to entryway',
    ],
    image: {
      src: '/images/rooms/room_urban_living_bandra.png',
      alt: 'Compact 2BHK urban living room in Bandra featuring Prana 2-seat sofa, Aalap coffee table, and Tarang side table',
      width: 1600,
      height: 1067,
    },
    productSlugs: ['prana-modular-sofa', 'aalap-coffee-table', 'tarang-side-table', 'kaya-lounge-chair'],
    relatedCollectionSlug: 'seating',
  },
  {
    id: 'room-02',
    slug: 'family-living-room-koramangala',
    title: 'Contemporary Family Living Room',
    subtitle: 'Koramangala, Bengaluru • 3 BHK Apartment (18 × 24 ft)',
    roomCategory: 'living',
    floorplanType: '3 BHK Family',
    locationContext: 'Koramangala, Bengaluru',
    dimensionsFootprint: '18 × 24 ft (432 sq ft)',
    description:
      'An expansive, warm family living environment that balances lively weekend gatherings with tranquil evening downtime. Deep olive bouclé tones harmonize with seasoned Indian teakwood and verdant balcony greenery.',
    spacePlanningNote:
      'The 3-Seat with Extended Chaise Prana Sofa creates a generous anchor facing the balcony. Across the wool area rug, a pair of Kaya Lounge Chairs provide intimate seating dialogue without blocking sightlines to the garden terrace.',
    architecturalElements: [
      'Warm concrete screed flooring with brass divider inlays',
      'Floor-to-ceiling sliding glass doors opening to a balcony planter wall',
      'Exposed form-finished concrete feature wall',
      'Recessed warm architectural cove lighting (2700K)',
    ],
    image: {
      src: '/images/rooms/room_family_living_koramangala.png',
      alt: 'Family living room in Koramangala with Prana chaise sofa in moss fabric, Kaya lounge chairs, and Kosh credenza',
      width: 1600,
      height: 1067,
    },
    productSlugs: ['prana-modular-sofa', 'kaya-lounge-chair', 'aalap-coffee-table', 'kosh-sideboard', 'aksh-floor-lamp'],
    relatedCollectionSlug: 'seating',
  },
  {
    id: 'room-03',
    slug: 'contemporary-dining-ahmedabad',
    title: 'Contemporary Courtyard Dining Suite',
    subtitle: 'Bodakdev, Ahmedabad • Urban Villa Suite (16 × 16 ft)',
    roomCategory: 'dining',
    floorplanType: '3 BHK Family',
    locationContext: 'Bodakdev, Ahmedabad',
    dimensionsFootprint: '16 × 16 ft (256 sq ft)',
    description:
      'Drawing on Gujarat’s rich tradition of brick architecture and courtyard ventilation, this dining space celebrates authentic materiality and multi-generational shared feasts.',
    spacePlanningNote:
      'The 180cm Veda Trestle Dining Table is placed under a gentle natural skylight, flanked by six Dhyaan Spindle Chairs. The Kosh Credenza against the brick wall acts as an understated buffet server for brass serveware.',
    architecturalElements: [
      'Exposed terracotta wire-cut brickwork',
      'Honed Kota stone flooring with natural satin finish',
      'Central glass skylight channeling soft zenithal daylight',
      'Hand-thrown ceramic wall sconces',
    ],
    image: {
      src: '/images/rooms/room_dining_ahmedabad.png',
      alt: 'Dining room in Ahmedabad with Veda dining table, six Dhyaan spindle chairs, and Kosh credenza against brick walls',
      width: 1600,
      height: 1067,
    },
    productSlugs: ['veda-dining-table', 'dhyaan-dining-chair', 'kosh-sideboard'],
    relatedCollectionSlug: 'tables',
  },
  {
    id: 'room-04',
    slug: 'calm-bedroom-indiranagar',
    title: 'Calm Primary Bedroom Suite',
    subtitle: 'Indiranagar, Bengaluru • Urban Sanctuary (14 × 16 ft)',
    roomCategory: 'bedroom',
    floorplanType: 'Calm Suite',
    locationContext: 'Indiranagar, Bengaluru',
    dimensionsFootprint: '14 × 16 ft (224 sq ft)',
    description:
      'A quiet, low-stimulus bedroom designed to cultivate deep rest. Grounded teak platform architecture, warm linen headboard cushioning, and tactile wool textures establish visual silence.',
    spacePlanningNote:
      'The Nidra King Platform Bed is positioned symmetrically against an acoustic warm-linen wall panel. The Setu Bench at the foot provides convenient dressing support, while Tarang Side Tables on either side keep nightstands airy and uncluttered.',
    architecturalElements: [
      'Mineral textured plaster in warm chalk tone',
      'Solid oak parquet herringbone flooring',
      'Floor-to-ceiling recessed timber wardrobes with integrated brass pulls',
      'Blackout linen drapery over diffused sheer panels',
    ],
    image: {
      src: '/images/rooms/room_bedroom_indiranagar.png',
      alt: 'Primary bedroom suite featuring Nidra low platform bed, Setu bench, and Tarang side tables',
      width: 1600,
      height: 1067,
    },
    productSlugs: ['nidra-platform-bed', 'setu-bench', 'tarang-side-table', 'aksh-floor-lamp'],
    relatedCollectionSlug: 'bedroom',
  },
  {
    id: 'room-05',
    slug: 'reading-corner-study-surat',
    title: 'Study & Reading Sanctuary',
    subtitle: 'Vesu, Surat • High-Rise Study Corner (12 × 14 ft)',
    roomCategory: 'study',
    floorplanType: 'Penthouse Study',
    locationContext: 'Vesu, Surat',
    dimensionsFootprint: '12 × 14 ft (168 sq ft)',
    description:
      'An efficient, contemplative urban study corner that caters to remote work and literature. Designed specifically for high-rise apartment proportions with generous natural window illumination.',
    spacePlanningNote:
      'The Sopan Open Modular Shelving stands perpendicular to the glass facade to filter sunlight without casting heavy shadows. The Kaya Lounge Chair paired with the Aksh Floor Lamp forms an inviting dedicated reading nook.',
    architecturalElements: [
      'Polished grey Italian marble tiles with subtle white veining',
      'Full-height acoustic teak slatted wall paneling',
      'Panoramic window framing sunset urban horizon views',
      'Concealed architectural power management for laptops and devices',
    ],
    image: {
      src: '/images/rooms/room_study_surat.png',
      alt: 'Urban study reading corner in Surat with Sopan open shelving, Kaya lounge chair, and Aksh floor lamp',
      width: 1600,
      height: 1067,
    },
    productSlugs: ['sopan-shelving-unit', 'kaya-lounge-chair', 'aksh-floor-lamp', 'tarang-side-table'],
    relatedCollectionSlug: 'storage',
  },
];

export function getRoomBySlug(slug: string): RoomLookbook | undefined {
  return ROOMS.find((r) => r.slug === slug);
}
