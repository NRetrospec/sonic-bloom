import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Beat } from "@/lib/mockData";

export interface CartItem extends Beat {
  licenseType: string;
  finalPrice: number;
}

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (beat: Beat, licenseType?: string, finalPrice?: number) => void;
  removeFromCart: (beatId: string) => void;
  clearCart: () => void;
  isInCart: (beatId: string) => boolean;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("beatvault-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("beatvault-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (beat: Beat, licenseType = "Premium", finalPrice?: number) => {
    setCartItems((prev) => {
      if (prev.some((item) => item.id === beat.id)) return prev;
      return [...prev, { ...beat, licenseType, finalPrice: finalPrice ?? beat.price }];
    });
  };

  const removeFromCart = (beatId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== beatId));
  };

  const clearCart = () => setCartItems([]);

  const isInCart = (beatId: string) => cartItems.some((item) => item.id === beatId);

  const cartCount = cartItems.length;
  const cartTotal = cartItems.reduce((sum, item) => sum + item.finalPrice, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, isInCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
