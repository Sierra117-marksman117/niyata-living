import { useCartContext } from '@/lib/cartContext';

export function useCart() {
  return useCartContext();
}
