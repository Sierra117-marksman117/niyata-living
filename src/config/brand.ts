export interface StudioLocation {
  city: string;
  neighbourhood: string;
  address: string;
  type: 'Flagship Studio' | 'Design Space' | 'Craft Workshop';
  note: string;
}

export interface BrandConfig {
  name: string;
  shortName: string;
  legalWorkingName: string;
  tagline: string;
  mission: string;
  narrative: string;
  publicClassification: string;
  referenceDisclosure: string;
  contact: {
    email: string;
    phone: string;
    enquiryHours: string;
  };
  social: {
    instagram: string;
    pinterest: string;
    linkedin: string;
  };
  studios: StudioLocation[];
  links: {
    webshastraa: string;
  };
}

export const BRAND: BrandConfig = {
  name: 'Niyata Living',
  shortName: 'Niyata',
  legalWorkingName: 'Niyata Living Reference Build',
  tagline: 'Thoughtful furniture for real Indian spaces.',
  mission:
    'Architectural proportions, honest regional hardwoods, and tactile upholstery designed purposefully for urban Indian floor plans and everyday living rituals.',
  narrative:
    'Niyata was conceived as a response to the disconnect between oversized global furniture and the real architectural constraints of modern Indian apartments. We engineer pieces with deliberate scale, breathable silhouettes, and time-tested joinery—crafted in seasoned Indian hardwoods and tailored textiles that age with quiet dignity.',
  publicClassification: 'Contemporary Living Reference Build',
  referenceDisclosure:
    'This is an internal furniture-commerce reference build. Products, materials, prices and availability shown are illustrative.',
  contact: {
    email: 'studio@niyataliving.example.in',
    phone: '+91 (0) 22 4890 1200',
    enquiryHours: 'Monday to Saturday, 10:00 AM – 7:00 PM IST',
  },
  social: {
    instagram: 'https://instagram.com/niyataliving',
    pinterest: 'https://pinterest.com/niyataliving',
    linkedin: 'https://linkedin.com/company/niyata-living',
  },
  studios: [
    {
      city: 'Mumbai',
      neighbourhood: 'Bandra West',
      address: 'Pali Hill Design Quarter',
      type: 'Flagship Studio',
      note: 'Illustrative studio preview for urban space planning.',
    },
    {
      city: 'Bengaluru',
      neighbourhood: 'Indiranagar',
      address: '100 Feet Road Suite',
      type: 'Design Space',
      note: 'Consultation and material library showroom.',
    },
    {
      city: 'Ahmedabad',
      neighbourhood: 'Bodakdev',
      address: 'Sindhu Bhavan Road Atelier',
      type: 'Craft Workshop',
      note: 'Hardwood joinery & textile archive.',
    },
  ],
  links: {
    webshastraa: 'https://www.webshastraa.in/',
  },
};
