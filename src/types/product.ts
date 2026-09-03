export type ProductCategory =
  | 'seating'
  | 'tables'
  | 'storage'
  | 'bedroom'
  | 'objects';

export type RoomCategory =
  | 'living'
  | 'dining'
  | 'bedroom'
  | 'study'
  | 'entryway';

export type PrimaryMaterial =
  | 'Solid Teak'
  | 'Solid Walnut'
  | 'Teak Veneer'
  | 'Natural Stone'
  | 'Bouclé Weave'
  | 'Linen Blend'
  | 'Spun Brass'
  | 'Powder-Coated Steel';

export interface ProductDimensions {
  widthCm: number;
  depthCm: number;
  heightCm: number;
  seatHeightCm?: number;
  clearanceCm?: number;
  weightKg: number;
  formatted: string;
}

export interface ProductColorOption {
  name: string;
  code: string;
  hex: string;
  materialName: string;
}

export interface SofaLayoutOption {
  id: '2-seat' | '3-seat' | 'chaise';
  name: string;
  description: string;
  dimensionsCm: string;
  priceINR: number;
  widthCm: number;
  depthCm: number;
  heightCm: number;
}

export interface SofaFabricOption {
  id: 'oat' | 'moss' | 'clay';
  name: string;
  toneDescription: string;
  hex: string;
  composition: string;
}

export interface ProductImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: string;
  role: 'hero' | 'gallery' | 'macro' | 'detail' | 'dimension' | 'configurator';
  layoutId?: string;
  fabricId?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  detailedStory: string;
  category: ProductCategory;
  categoryLabel: string;
  roomCategories: RoomCategory[];
  roomLabels: string[];
  priceINR: number;
  priceRange?: {
    minINR: number;
    maxINR: number;
  };
  primaryMaterial: PrimaryMaterial;
  materialsList: string[];
  colors: ProductColorOption[];
  dimensions: ProductDimensions;
  constructionDetails: string[];
  careInstructions: string[];
  assemblyInfo: {
    required: boolean;
    level: 'None (Fully Assembled)' | 'Simple (Leg Attachment)' | 'White-Glove Assembly Provided';
    estimatedMinutes: number;
    instructions: string;
  };
  spatialSuitability: string;
  images: ProductImage[];
  isFlagshipConfigurable?: boolean;
  sofaLayouts?: SofaLayoutOption[];
  sofaFabrics?: SofaFabricOption[];
  featured?: boolean;
  leadTimeWeeks?: number;
  origin: string;
}
