export interface CartItem {
  id: string; // unique item id (e.g. slug + layout + fabric + color)
  productSlug: string;
  productName: string;
  category: string;
  imageSrc: string;
  unitPriceINR: number;
  quantity: number;
  subtotalINR?: number;
  selectedLayout?: string;
  selectedFabric?: string;
  selectedColor?: string;
  selectedMaterial?: string;
  dimensionsSummary?: string;
}

export interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotalINR: number;
  illustrativeTaxINR: number;
  totalINR: number;
}
