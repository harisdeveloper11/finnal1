import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface AddToCartModalContextType {
  isOpen: boolean;
  open: (product: Product) => void;
  close: () => void;
  product: Product | null;
}

const AddToCartModalContext = createContext<AddToCartModalContextType | undefined>(undefined);

export const AddToCartModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  const open = (newProduct: Product) => {
    setProduct(newProduct);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setProduct(null);
  };

  const value = useMemo(() => ({ isOpen, open, close, product }), [isOpen, product]);
  return <AddToCartModalContext.Provider value={value}>{children}</AddToCartModalContext.Provider>;
};

export const useAddToCartModal = () => {
  const ctx = useContext(AddToCartModalContext);
  if (!ctx) throw new Error("useAddToCartModal must be used within AddToCartModalProvider");
  return ctx;
};
