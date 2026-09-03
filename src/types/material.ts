export interface MaterialSpec {
  id: string;
  name: string;
  category: 'Hardwoods' | 'Veneers' | 'Textiles' | 'Stone & Composites' | 'Metals';
  origin: string;
  finishType: string;
  tactileDescription: string;
  careGuidance: string[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  associatedProductSlugs: string[];
}
