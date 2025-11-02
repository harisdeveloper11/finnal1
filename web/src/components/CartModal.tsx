import { useMemo } from "react";
import { X, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../CartContext";
import { useOrderModal } from "../OrderModalContext";
import { useCartModal } from "../CartModalContext";
import type { CartItem } from "../CartContext";

export default function CartModal() {
  const { isOpen, close } = useCartModal();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { open: openOrderModal } = useOrderModal();

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const priceNumber = typeof item.price === 'string' ? Number(String(item.price).replace(/[^0-9.]/g, '')) : item.price;
      return sum + (priceNumber || 0) * (item.quantity || 1);
    }, 0);
  }, [cartItems]);

  const handleCheckout = () => {
    openOrderModal(cartItems);
    close();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl theme-bg rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-[rgba(var(--color-primary),0.15)] via-[rgba(var(--color-secondary),0.15)] to-[rgba(var(--color-accent),0.15)] p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="theme-primary" size={22} />
            <h2 className="text-lg md:text-xl font-semibold">Your Cart</h2>
          </div>
          <button className="rounded-full hover:bg-black/10 p-1" onClick={close}>
            <X size={18} />
          </button>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="theme-text-muted text-center py-8">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item: CartItem) => (
                  <div key={item.id} className="flex gap-4 items-center border-b border-gray-200 pb-4">
                    {item.image && <img src={item.image} className="w-16 h-16 object-cover rounded" alt={item.name} />}
                    <div className="flex-1">
                      <p className="font-medium theme-text">{item.name}</p>
                      <p className="text-sm theme-text-muted">{String(item.price)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm theme-text min-w-[2rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center p-4 bg-gray-50/60 rounded-lg">
                <span className="font-semibold theme-text">Total</span>
                <span className="theme-primary font-bold">${total.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-4 btn-primary py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
