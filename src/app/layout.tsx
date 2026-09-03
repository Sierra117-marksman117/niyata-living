import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cartContext';
import { CustomerProvider } from '@/lib/customerContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CustomerDrawer } from '@/components/customer/CustomerDrawer';
import { ExploreThisBuild } from '@/components/layout/ExploreThisBuild';
import { BRAND } from '@/config/brand';

export const metadata: Metadata = {
  metadataBase: new URL('https://niyataliving.webshastraa.in'),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: `${BRAND.name} is a contemporary Indian furniture experience designed for urban apartments. Architectural proportions, honest regional hardwoods, and modular seating.`,
  keywords: [
    'Contemporary Indian Furniture',
    'Solid Teakwood Sofa',
    'Modular Sofa Configurator',
    'Urban Apartment Furniture',
    'Niyata Living',
    'Indian Woodcraft',
    'Architecture Furniture',
  ],
  authors: [{ name: 'Webshastraa Engineering' }],
  creator: 'Webshastraa',
  publisher: BRAND.name,
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.mission,
    url: 'https://niyataliving.webshastraa.in',
    siteName: BRAND.name,
    images: [
      {
        url: '/images/social/og_niyata_living.png',
        width: 1200,
        height: 630,
        alt: `${BRAND.name} contemporary furniture room setting`,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.mission,
    images: ['/images/social/og_niyata_living.png'],
  },
  robots: {
    index: false, // Temporary deployment kept noindex per specification until showcase URL approval
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-mineral-50">
      <body className="antialiased min-h-screen flex flex-col bg-mineral-50 text-charcoal">
        <CartProvider>
          <CustomerProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <CustomerDrawer />
            <ExploreThisBuild />
          </CustomerProvider>
        </CartProvider>
      </body>
    </html>
  );
}
