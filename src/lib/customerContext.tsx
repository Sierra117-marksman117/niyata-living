'use client';

import React, { createContext, useContext, useMemo, useState, useSyncExternalStore } from 'react';
import {
  CustomerProfileState,
  WishlistItem,
  CustomerSpaceProfile,
  ConsultationBriefRecord,
} from '@/types/customer';
import { Product } from '@/types/product';

interface CustomerContextType {
  state: CustomerProfileState;
  isWishlisted: (slug: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeWishlistItem: (slug: string) => void;
  updateSpaceProfile: (profile: Partial<CustomerSpaceProfile>) => void;
  saveBriefRecord: (brief: Omit<ConsultationBriefRecord, 'id' | 'createdAt'>) => void;
  isCustomerDrawerOpen: boolean;
  setIsCustomerDrawerOpen: (open: boolean) => void;
  openCustomerDrawer: () => void;
  closeCustomerDrawer: () => void;
}

const STORAGE_KEY = 'niyata_customer_profile_v1';

const defaultSpaceProfile: CustomerSpaceProfile = {
  apartmentType: '2 BHK Urban Apartment',
  city: 'Mumbai',
  livingRoomLengthFt: 16,
  livingRoomWidthFt: 14,
  ceilingHeightFt: 10,
  notes: 'Sea breeze coastal light with natural lime plaster walls.',
};

const defaultInitialState: CustomerProfileState = {
  wishlist: [],
  spaceProfile: defaultSpaceProfile,
  savedBriefs: [],
};

function subscribeCustomer(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('niyata_customer_change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('niyata_customer_change', callback);
  };
}

function getCustomerSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || JSON.stringify(defaultInitialState);
  } catch {
    return JSON.stringify(defaultInitialState);
  }
}

function getCustomerServerSnapshot(): string {
  return JSON.stringify(defaultInitialState);
}

function saveCustomerStateToStorage(state: CustomerProfileState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event('niyata_customer_change'));
  } catch {
    // Ignore storage write errors
  }
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [isCustomerDrawerOpen, setIsCustomerDrawerOpen] = useState(false);

  // Sync with localStorage via useSyncExternalStore
  const stateJson = useSyncExternalStore(
    subscribeCustomer,
    getCustomerSnapshot,
    getCustomerServerSnapshot
  );

  const state: CustomerProfileState = useMemo(() => {
    try {
      const parsed = JSON.parse(stateJson);
      return {
        wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
        spaceProfile: parsed.spaceProfile
          ? { ...defaultSpaceProfile, ...parsed.spaceProfile }
          : defaultSpaceProfile,
        savedBriefs: Array.isArray(parsed.savedBriefs) ? parsed.savedBriefs : [],
      };
    } catch {
      return defaultInitialState;
    }
  }, [stateJson]);

  const isWishlisted = (slug: string) => {
    return state.wishlist.some((item) => item.slug === slug);
  };

  const toggleWishlist = (product: Product) => {
    const exists = state.wishlist.some((item) => item.slug === product.slug);
    let updated: WishlistItem[];

    if (exists) {
      updated = state.wishlist.filter((item) => item.slug !== product.slug);
    } else {
      const newItem: WishlistItem = {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        category: product.categoryLabel,
        priceINR: product.priceINR,
        imageSrc: product.images[0]?.src || '/images/hero/hero_contemporary_living.png',
        material: product.primaryMaterial,
        savedAt: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      };
      updated = [newItem, ...state.wishlist];
    }

    saveCustomerStateToStorage({
      ...state,
      wishlist: updated,
    });
  };

  const removeWishlistItem = (slug: string) => {
    const updated = state.wishlist.filter((item) => item.slug !== slug);
    saveCustomerStateToStorage({
      ...state,
      wishlist: updated,
    });
  };

  const updateSpaceProfile = (profile: Partial<CustomerSpaceProfile>) => {
    saveCustomerStateToStorage({
      ...state,
      spaceProfile: { ...state.spaceProfile, ...profile },
    });
  };

  const saveBriefRecord = (brief: Omit<ConsultationBriefRecord, 'id' | 'createdAt'>) => {
    const record: ConsultationBriefRecord = {
      ...brief,
      id: `brief-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };
    saveCustomerStateToStorage({
      ...state,
      savedBriefs: [record, ...state.savedBriefs],
    });
  };

  const openCustomerDrawer = () => setIsCustomerDrawerOpen(true);
  const closeCustomerDrawer = () => setIsCustomerDrawerOpen(false);

  return (
    <CustomerContext.Provider
      value={{
        state,
        isWishlisted,
        toggleWishlist,
        removeWishlistItem,
        updateSpaceProfile,
        saveBriefRecord,
        isCustomerDrawerOpen,
        setIsCustomerDrawerOpen,
        openCustomerDrawer,
        closeCustomerDrawer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
}
