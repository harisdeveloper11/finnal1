import { createContext, useContext, useState, type ReactNode } from "react";

// Cart item type
export interface CartItem {
  id: number;
  name: string;
  price: number | string;
  image?: string;
  quantity: number;
}

// Cart context type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: { name: string; price: number | string; image?: string; quantity?: number }) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

// Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: { name: string; price: number | string; image?: string; quantity?: number }) => {
    setCartItems(prev => {
      const quantityToAdd = item.quantity && item.quantity > 0 ? item.quantity : 1;
      const index = prev.findIndex(ci => ci.name === item.name && ci.price === item.price);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], quantity: updated[index].quantity + quantityToAdd };
        return updated;
      }
      const newItem: CartItem = { id: Date.now(), name: item.name, price: item.price, image: item.image, quantity: quantityToAdd };
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
