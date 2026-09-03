export interface WishlistItem {
  productId: string;
  slug: string;
  name: string;
  category: string;
  priceINR: number;
  imageSrc: string;
  material: string;
  savedAt: string;
}

export interface CustomerSpaceProfile {
  apartmentType: string;
  city: string;
  livingRoomLengthFt: number;
  livingRoomWidthFt: number;
  ceilingHeightFt: number;
  notes: string;
}

export interface ConsultationBriefRecord {
  id: string;
  roomType: string;
  dimensionLengthFt: string;
  dimensionWidthFt: string;
  styleDirection: string;
  budgetRange: string;
  priorities: string[];
  createdAt: string;
}

export interface CustomerProfileState {
  wishlist: WishlistItem[];
  spaceProfile: CustomerSpaceProfile;
  savedBriefs: ConsultationBriefRecord[];
}
