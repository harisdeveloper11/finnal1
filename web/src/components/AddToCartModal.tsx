import { useEffect, useState } from "react";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import { useAddToCartModal } from "../AddToCartModalContext";
import { useCart } from "../CartContext";
import toast from "react-hot-toast";

export default function AddToCartModal() {
  const { isOpen, close, product } = useAddToCartModal();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen && product) {
      setQuantity(1); // Reset quantity when modal opens
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });
    toast.success(`${product.name} added to cart 🛒`);
    close();
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md theme-bg rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-[rgba(var(--color-primary),0.15)] via-[rgba(var(--color-secondary),0.15)] to-[rgba(var(--color-accent),0.15)] p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="theme-primary" size={22} />
            <h2 className="text-lg md:text-xl font-semibold">Add to Cart</h2>
          </div>
          <button className="rounded-full hover:bg-black/10 p-1" onClick={close}>
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {/* Product Info */}
          <div className="flex gap-4 mb-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold theme-text">{product.name}</h3>
              <p className="text-sm theme-text-muted mt-1">{product.description}</p>
              <p className="theme-primary font-bold mt-2">${product.price}</p>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="mb-6">
            <label className="block text-sm font-semibold theme-text mb-2">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                onClick={decreaseQuantity}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
              >
                <Minus size={16} />
              </button>
              <span className="text-lg font-semibold theme-text min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-6 p-3 bg-gray-50/60 rounded-lg">
            <span className="font-semibold theme-text">Total</span>
            <span className="theme-primary font-bold">${(product.price * quantity).toFixed(2)}</span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full btn-primary py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
