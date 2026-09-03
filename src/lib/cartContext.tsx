'use client';

import React, { createContext, useContext, useMemo, useState, useSyncExternalStore } from 'react';
import { CartItem, CartState } from '@/types/cart';

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'id' | 'subtotalINR'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CART_STORAGE_KEY = 'niyata_cart_items_v1';

const initialCartState: CartState = {
  items: [],
  itemCount: 0,
  subtotalINR: 0,
  illustrativeTaxINR: 0,
  totalINR: 0,
};

export function calculateCartTotals(items: CartItem[]): CartState {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalINR = items.reduce(
    (sum, item) => sum + (item.subtotalINR ?? item.unitPriceINR * item.quantity),
    0
  );
  const illustrativeTaxINR = Math.round(subtotalINR * 0.18);
  const totalINR = subtotalINR + illustrativeTaxINR;

  return {
    items,
    itemCount,
    subtotalINR,
    illustrativeTaxINR,
    totalINR,
  };
}

function subscribeCart(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('niyata_cart_change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('niyata_cart_change', callback);
  };
}

function getCartSnapshot(): string {
  try {
    return localStorage.getItem(CART_STORAGE_KEY) || '[]';
  } catch {
    return '[]';
  }
}

function getCartServerSnapshot(): string {
  return '[]';
}

function saveCartItemsToStorage(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('niyata_cart_change'));
  } catch {
    // Ignore storage write errors
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync with localStorage via React 18/19 useSyncExternalStore
  const itemsJson = useSyncExternalStore(subscribeCart, getCartSnapshot, getCartServerSnapshot);

  const items: CartItem[] = useMemo(() => {
    try {
      const parsed = JSON.parse(itemsJson);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [itemsJson]);

  const state = useMemo(() => calculateCartTotals(items), [items]);

  const addItem = (item: Omit<CartItem, 'id' | 'subtotalINR'>) => {
    const existingIndex = items.findIndex(
      (i) =>
        i.productSlug === item.productSlug &&
        i.selectedLayout === item.selectedLayout &&
        i.selectedFabric === item.selectedFabric &&
        i.selectedColor === item.selectedColor
    );

    let updatedItems: CartItem[];

    if (existingIndex > -1) {
      updatedItems = [...items];
      const existing = updatedItems[existingIndex];
      const newQty = existing.quantity + item.quantity;
      updatedItems[existingIndex] = {
        ...existing,
        quantity: newQty,
        subtotalINR: existing.unitPriceINR * newQty,
      };
    } else {
      const newItem: CartItem = {
        ...item,
        id: `${item.productSlug}-${Date.now()}`,
        subtotalINR: item.unitPriceINR * item.quantity,
      };
      updatedItems = [newItem, ...items];
    }

    saveCartItemsToStorage(updatedItems);
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    const updated = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity,
          subtotalINR: item.unitPriceINR * quantity,
        };
      }
      return item;
    });

    saveCartItemsToStorage(updated);
  };

  const removeItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    saveCartItemsToStorage(updated);
  };

  const clearCart = () => {
    saveCartItemsToStorage([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}
