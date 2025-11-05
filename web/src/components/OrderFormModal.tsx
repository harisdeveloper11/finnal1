import { useEffect, useMemo, useState } from "react";
import { X, PackageCheck, MapPin, Phone, User, ShoppingBag } from "lucide-react";
import { useOrderModal } from "../OrderModalContext";
import { useCart } from "../CartContext";
import axios from "axios";

export default function OrderFormModal() {
  const { isOpen, close, items } = useOrderModal();
  const { clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState<"COD" | "Pickup">("COD");

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setMethod("COD");
    }
  }, [isOpen]);

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      const priceNumber = typeof item.price === "string" ? Number(String(item.price).replace(/[^0-9.]/g, "")) : item.price;
      return sum + (priceNumber || 0) * (item.quantity || 1);
    }, 0);
  }, [items]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      customerName: name,
      phone,
      email,
      address: method === 'COD' ? address : '',
      paymentMethod: method,
      items: items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: typeof item.price === 'string' ? Number(item.price.replace(/[^0-9.]/g, '')) : item.price,
        quantity: item.quantity || 1,
        image: item.image
      })),
      total
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, orderData);
      alert(`Order placed successfully! Total: $${total.toFixed(2)}`);
      clearCart();
      close();
    } catch (error) {
      alert('Failed to place order. Please try again.');
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl theme-bg rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-[rgba(var(--color-primary),0.15)] via-[rgba(var(--color-secondary),0.15)] to-[rgba(var(--color-accent),0.15)] p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PackageCheck className="theme-primary" size={22} />
            <h2 className="text-lg md:text-xl font-semibold">Place Your Order</h2>
          </div>
          <button className="rounded-full hover:bg-black/10 p-1" onClick={close}><X size={18} /></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6 p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Customer Name</label>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[rgba(var(--color-primary),0.25)]">
                <User size={16} className="text-gray-500" />
                <input className="w-full outline-none text-black" value={name} onChange={e=>setName(e.target.value)} required placeholder="John Doe" />
              </div>
            </div>
            <div className="relative">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[rgba(var(--color-primary),0.25)]">
                <Phone size={16} className="text-gray-500" />
                <input
                  type="tel"
                  className="w-full outline-none text-black"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  placeholder="+1 555 123 4567"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[rgba(var(--color-primary),0.25)]">
                <Phone size={16} className="text-gray-500" />
                <input
                  type="email"
                  className="w-full outline-none text-black"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Address / Pickup</label>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[rgba(var(--color-primary),0.25)]">
                <MapPin size={16} className="text-gray-500" />
                <input className="w-full outline-none text-black" placeholder="Address or Pickup location" value={address} onChange={e=>setAddress(e.target.value)} required={method === 'COD'} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Payment Method</label>
              <div className="flex gap-3">
                <button type="button" onClick={()=>setMethod('COD')} className={`px-3 py-2 rounded-lg border ${method==='COD' ? 'btn-primary border-transparent' : 'border-gray-300'}`}>COD</button>
                <button type="button" onClick={()=>setMethod('Pickup')} className={`px-3 py-2 rounded-lg border ${method==='Pickup' ? 'btn-primary border-transparent' : 'border-gray-300'}`}>Pickup</button>
              </div>
            </div>

            <button type="submit" className="btn-primary px-5 py-2.5 rounded-lg shadow transition flex items-center gap-2">
              <ShoppingBag size={16} /> Place Order
            </button>
          </form>

          <div className="bg-gray-50/60 rounded-xl p-4 md:p-5 h-full">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-3 max-h-64 overflow-auto pr-1">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 items-center border rounded-lg p-2 bg-white">
                  {item.image && <img src={item.image} className="w-14 h-14 object-cover rounded" alt={item.name} />}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity} • {String(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between font-semibold text-sm">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


