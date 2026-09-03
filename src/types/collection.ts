import { ProductCategory } from './product';

export interface Collection {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  headline: string;
  description: string;
  curatorNote: string;
  heroImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  productCount: number;
  featuredProductSlugs: string[];
}
