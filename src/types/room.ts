import { RoomCategory } from './product';

export interface RoomLookbook {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  roomCategory: RoomCategory;
  floorplanType: '1 BHK Compact' | '2 BHK Urban' | '3 BHK Family' | 'Penthouse Study' | 'Calm Suite';
  locationContext: string;
  dimensionsFootprint: string;
  description: string;
  spacePlanningNote: string;
  architecturalElements: string[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  productSlugs: string[];
  relatedCollectionSlug: string;
}
