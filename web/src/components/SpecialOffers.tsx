import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useOrderModal } from "../OrderModalContext";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  collection: string;
}

const SpecialOffers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { open } = useOrderModal();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/collection/deals");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching deals:", err);
        setError("Failed to load special offers");
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const handleShopNow = (product: Product) => {
    const item = {
      id: product._id as any, // Use _id for backend compatibility, cast to match CartItem type
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    };
    open([item]);
  };

  if (loading) {
    return (
      <section className="py-16 theme-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold theme-text"
          >
            🎉 Special Offers & Deals
          </motion.h2>
          <p className="mt-2 theme-text-muted">Loading special offers...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 theme-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold theme-text"
          >
            🎉 Special Offers & Deals
          </motion.h2>
          <p className="mt-2 text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 theme-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold theme-text"
        >
          🎉 Special Offers & Deals
        </motion.h2>
        <p className="mt-2 theme-text-muted">
          Don't miss out on our limited-time discounts and flash sales!
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {products.length > 0 ? (
            products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="theme-surface rounded-2xl shadow-2xl p-6 flex flex-col items-center backdrop-blur-md border border-white/10"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-40 h-40 object-cover rounded-xl mb-4"
                />
                <h3 className="text-lg font-semibold theme-text">
                  {product.name}
                </h3>
                <p className="theme-secondary font-bold mt-1">${product.price}</p>
                <button
                  onClick={() => handleShopNow(product)}
                  className="mt-4 btn-primary px-5 py-2 rounded-full transition min-h-10 flex items-center justify-center"
                >
                  Shop Now
                </button>
              </motion.div>
            ))
          ) : (
            <div className="md:col-span-3">
              <p className="theme-text-muted">No special offers available at the moment.</p>
            </div>
          )}
        </div>

        {/* Countdown / CTA */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4">
          <Clock className="theme-secondary w-6 h-6" />
          <p className="theme-text-muted">
            Hurry up! Offer ends in <span className="font-bold theme-text">3 days</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
