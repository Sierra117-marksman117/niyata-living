import { MaterialSpec } from '@/types/material';

export const MATERIALS: MaterialSpec[] = [
  {
    id: 'mat-teak',
    name: 'Seasoned Indian Teakwood',
    category: 'Hardwoods',
    origin: 'Central India (Madhya Pradesh & Gujarat)',
    finishType: 'Hand-rubbed natural matte wax oil (Zero-VOC)',
    tactileDescription:
      'Dense, golden-brown hardwood with expressive straight grain patterns and natural silica content. Offers inherent natural resistance to humidity shifts and termites.',
    careGuidance: [
      'Dust weekly with a clean, dry microfibre cloth.',
      'Nourish timber annually with organic beeswax mineral polish.',
      'Never place blistering hot cookware directly on timber without trivets.',
      'Maintain stable indoor humidity between 40% and 65% for timber health.',
    ],
    image: {
      src: '/images/materials/macro_teak_wood_grain.png',
      alt: 'Close-up macro detail of seasoned Indian teakwood grain with natural matte oil finish',
      width: 1200,
      height: 900,
    },
    associatedProductSlugs: [
      'prana-modular-sofa',
      'kaya-lounge-chair',
      'veda-dining-table',
      'dhyaan-dining-chair',
      'aalap-coffee-table',
      'nidra-platform-bed',
      'tarang-side-table',
      'sopan-shelving-unit',
    ],
  },
  {
    id: 'mat-walnut',
    name: 'American Walnut Timber',
    category: 'Hardwoods',
    origin: 'Sustainably Managed Temperate Forests',
    finishType: 'Silky matte conversion varnish',
    tactileDescription:
      'Deep chocolate and espresso tones with subtle purple undertones and flowing wave grain. Dense, fine texture that patinas into warm golden amber over decades.',
    careGuidance: [
      'Wipe with a soft cotton cloth dampened with warm water.',
      'Avoid commercial silicone aerosol sprays that create synthetic build-up.',
      'Protect from prolonged intense direct UV sunlight.',
    ],
    image: {
      src: '/images/materials/macro_walnut_wood_grain.png',
      alt: 'Macro texture of solid walnut wood grain showing rich dark tones and smooth finish',
      width: 1200,
      height: 900,
    },
    associatedProductSlugs: ['setu-bench'],
  },
  {
    id: 'mat-boucle',
    name: 'Tactile Architectural Bouclé',
    category: 'Textiles',
    origin: 'Woven in Surat & Panipat, India',
    finishType: 'Textured looped yarn with hydrophobic water-repellent backing',
    tactileDescription:
      'Multi-tonal looped yarn structure with high tactile depth and plush surface loft. Highly resilient to crushing and everyday abrasion (50,000+ Martindale cycles).',
    careGuidance: [
      'Vacuum regularly with low suction and an upholstery brush.',
      'Blot liquid spills immediately with an absorbent dry cloth; do not scrub.',
      'Professional dry cleaning recommended for removable cushion covers.',
    ],
    image: {
      src: '/images/materials/macro_boucle_textile.png',
      alt: 'Macro photograph of muted moss looped bouclé textile weave',
      width: 1200,
      height: 900,
    },
    associatedProductSlugs: ['prana-modular-sofa', 'setu-bench'],
  },
  {
    id: 'mat-linen-cotton',
    name: 'Woven Linen-Cotton Slub',
    category: 'Textiles',
    origin: 'Coimbatore & Surat, India',
    finishType: 'Pre-washed breathable natural weave (480 GSM)',
    tactileDescription:
      'Crisp, cool-touch blend that breathes exceptionally well in warm tropical climates. Features subtle organic yarn thickness variations (slubs) that celebrate natural fibre honesty.',
    careGuidance: [
      'Spot clean using mild enzymatic pH-neutral foam cleaner.',
      'Do not machine wash with bleach or hot water.',
      'Keep away from sharp pet claws to avoid snagging threads.',
    ],
    image: {
      src: '/images/materials/macro_linen_cotton.png',
      alt: 'Macro photograph of oatmeal natural linen-cotton slub fabric weave',
      width: 1200,
      height: 900,
    },
    associatedProductSlugs: ['prana-modular-sofa', 'kaya-lounge-chair', 'nidra-platform-bed', 'aksh-floor-lamp'],
  },
  {
    id: 'mat-sandstone',
    name: 'Honed Dholpur Sandstone',
    category: 'Stone & Composites',
    origin: 'Rajasthan, India',
    finishType: 'Honed satin surface sealed with hydrophobic nano-barrier',
    tactileDescription:
      'Fine-grained sedimentary quartz stone with creamy warm buff tones, subtle mineral flecks, and a velvety smooth matte texture that stays naturally cool to touch.',
    careGuidance: [
      'Always use coasters under beverage mugs and glasses.',
      'Clean exclusively with mild neutral stone soap and water.',
      'Never use acidic cleaners like vinegar, lime, or bleach.',
      'Re-apply penetrating natural stone sealer every 24 months.',
    ],
    image: {
      src: '/images/materials/macro_sandstone_texture.png',
      alt: 'Macro texture of honed Dholpur beige sandstone surface with delicate mineral grain',
      width: 1200,
      height: 900,
    },
    associatedProductSlugs: ['aalap-coffee-table'],
  },
  {
    id: 'mat-brass',
    name: 'Solid Spun & Brushed Brass',
    category: 'Metals',
    origin: 'Moradabad, Uttar Pradesh',
    finishType: 'Directional satin brushed brass with microcrystalline wax seal',
    tactileDescription:
      'Heavy solid brass with a warm, golden luster and fine linear brush marks. Ages gracefully with an authentic living patina that reflects touch and time.',
    careGuidance: [
      'Wipe down with a dry microfibre cloth to remove fingerprints.',
      'Allow natural patina oxidation to develop; avoid harsh chemical abrasive polishes.',
    ],
    image: {
      src: '/images/materials/macro_brushed_brass.png',
      alt: 'Close-up macro of satin brushed solid brass surface with golden warm reflections',
      width: 1200,
      height: 900,
    },
    associatedProductSlugs: ['aksh-floor-lamp', 'setu-bench', 'kosh-sideboard', 'tarang-side-table'],
  },
];
