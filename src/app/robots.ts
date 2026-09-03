import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: ['/design-service', '/cart-preview', '/contact', '/account', '/admin'],
    },
    sitemap: 'https://niyataliving.webshastraa.in/sitemap.xml',
  };
}
