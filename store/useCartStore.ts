import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  foodType: string;
  category: string;
  shopId: string;
  shopName: string;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];

  addToCart: (item: Omit<CartItem, "quantity">) => void;

  increment: (id: string) => void;

  decrement: (id: string) => void;

  removeItem: (id: string) => void;

  clearCart: () => void;

  getQuantity: (id: string) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) => {
        const cart = get().cart;

        const exist = cart.find((i) => i._id === item._id);

        if (exist) {
          set({
            cart: cart.map((i) =>
              i._id === item._id
                ? {
                    ...i,
                    quantity: i.quantity + 1,
                  }
                : i,
            ),
          });

          return;
        }

        set({
          cart: [...cart, { ...item, quantity: 1 }],
        });
      },

      increment: (id) => {
        set({
          cart: get().cart.map((item) =>
            item._id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        });
      },

      decrement: (id) => {
        const cart = get().cart;

        const updated = cart
          .map((item) =>
            item._id === id
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item,
          )
          .filter((item) => item.quantity > 0);

        set({ cart: updated });
      },

      removeItem: (id) => {
        set({
          cart: get().cart.filter((item) => item._id !== id),
        });
      },

      clearCart: () => {
        set({ cart: [] });
      },

      getQuantity: (id) => {
        const item = get().cart.find((i) => i._id === id);

        return item?.quantity ?? 0;
      },
    }),
    {
      name: "food-cart",
    },
  ),
);

// Total Items Selector
export const selectTotalItems = (state: CartStore) =>
  state.cart.reduce((sum, item) => sum + item.quantity, 0);

// Total Price Selector
export const selectTotalPrice = (state: CartStore) =>
  state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

// Specific Item Quantity Selector
export const selectItemQuantity = (id: string) => (state: CartStore) =>
  state.cart.find((item) => item._id === id)?.quantity ?? 0;
