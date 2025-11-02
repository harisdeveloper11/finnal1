import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface CartModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const CartModalContext = createContext<CartModalContextType | undefined>(undefined);

export const CartModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen]);
  return <CartModalContext.Provider value={value}>{children}</CartModalContext.Provider>;
};

export const useCartModal = () => {
  const ctx = useContext(CartModalContext);
  if (!ctx) throw new Error("useCartModal must be used within CartModalProvider");
  return ctx;
};
