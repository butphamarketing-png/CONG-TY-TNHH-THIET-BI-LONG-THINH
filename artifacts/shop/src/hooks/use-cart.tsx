import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, OrderItem } from '@workspace/api-client-react';

interface CartState {
  items: OrderItem[];
  wishlist: number[];
  compareList: number[];
  addItem: (product: Product, quantity?: number, variant?: string) => void;
  removeItem: (productId: number, variant?: string) => void;
  updateQuantity: (productId: number, quantity: number, variant?: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: number) => void;
  toggleCompare: (productId: number) => void;
  cartTotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      compareList: [],
      addItem: (product, quantity = 1, variant = undefined) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.productId === product.id && item.variant === variant
          );

          if (existingItemIndex >= 0) {
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems };
          }

          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                productName: product.name,
                productSlug: product.slug,
                thumbnail: product.thumbnail,
                price: product.discount || product.price,
                quantity,
                variant,
              },
            ],
          };
        });
      },
      removeItem: (productId, variant) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === productId && item.variant === variant)
          ),
        }));
      },
      updateQuantity: (productId, quantity, variant) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId && item.variant === variant
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      toggleWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
        }));
      },
      toggleCompare: (productId) => {
        set((state) => {
          if (state.compareList.includes(productId)) {
            return { compareList: state.compareList.filter((id) => id !== productId) };
          }
          if (state.compareList.length >= 3) {
            return state; // Max 3 items
          }
          return { compareList: [...state.compareList, productId] };
        });
      },
      cartTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'tdm-shop-storage',
    }
  )
);
