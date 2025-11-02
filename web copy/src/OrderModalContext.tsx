import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { CartItem } from "./CartContext";

interface OrderModalContextType {
  isOpen: boolean;
  open: (items?: CartItem[]) => void;
  close: () => void;
  items: CartItem[];
}

const OrderModalContext = createContext<OrderModalContextType | undefined>(undefined);

export const OrderModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  const open = (newItems?: CartItem[]) => {
    if (newItems) setItems(newItems);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const value = useMemo(() => ({ isOpen, open, close, items }), [isOpen, items]);
  return <OrderModalContext.Provider value={value}>{children}</OrderModalContext.Provider>;
};

export const useOrderModal = () => {
  const ctx = useContext(OrderModalContext);
  if (!ctx) throw new Error("useOrderModal must be used within OrderModalProvider");
  return ctx;
};




