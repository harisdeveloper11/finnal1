import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ Product Type (backend se data ka structure)
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
}

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<Product[]>(`${process.env.REACT_APP_API_URL}/api/products/collection/featured`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-600">
          Loading featured products...
        </h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-20 text-center">
        <h2 className="text-2xl font-bold text-red-500">{error}</h2>
      </section>
    );
  }

  return (
    <section className="w-full py-16 theme-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold theme-text">
          Featured Products
        </h2>
        <p className="theme-text-muted mt-2 mb-10">
          Discover our hand-picked collection just for you
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="theme-surface rounded-xl shadow hover:shadow-lg overflow-hidden flex flex-col hover:theme-hover"
            >
              {/* Image clickable */}
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
              </Link>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold theme-text">
                  {product.name}
                </h3>
                <p className="text-sm theme-text-muted mt-1 flex-1">
                  {product.description}
                </p>
                <p className="theme-primary font-bold mt-3">
                  ${product.price}
                </p>

                {/* Button to details page */}
                <Link
                  to={`/product/${product._id}`}
                  className="mt-4 btn-primary py-2 rounded-lg transition text-center min-h-10 flex items-center justify-center"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
