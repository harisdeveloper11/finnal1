import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Trending = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/collection/trending`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching trending products:", err);
        setError("Failed to load trending products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-16 px-6 theme-bg min-h-screen text-center">
        <h1 className="text-4xl font-extrabold theme-primary mb-12">🔥 Trending Products</h1>
        <p className="text-gray-600">Loading trending products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 px-6 theme-bg min-h-screen text-center">
        <h1 className="text-4xl font-extrabold theme-primary mb-12">🔥 Trending Products</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-16 px-6 theme-bg min-h-screen">
      {/* Page Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold text-center theme-primary mb-12"
      >
        🔥 Trending Products
      </motion.h1>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            whileHover={{ y: -5, scale: 1.05 }}
            className="theme-surface rounded-3xl shadow-md hover:shadow-2xl transition p-5 flex flex-col items-center hover:theme-hover"
          >
            {/* Product Image */}
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />

            {/* Product Info */}
            <h2 className="text-lg font-semibold text-gray-800 mb-1 text-center">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-1 font-medium">💰 Rs {product.price}</p>

            {/* Stock Badge */}
            <span
              className={`text-sm px-3 py-1 rounded-full font-semibold mb-4 ${
                product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {product.stock > 0
                ? `In Stock: ${product.stock}`
                : "Out of Stock"}
            </span>

            {/* Buy Now Button */}
            <Link
              to={`/product/${product._id}`}
              className="mt-auto btn-primary px-6 py-2 rounded-full shadow-md hover:shadow-xl transition font-semibold"
            >
              Buy Now
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
