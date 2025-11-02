import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Deals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/collection/deals`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching deals products:", err);
        setError("Failed to load deals products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-16 px-6 theme-bg min-h-screen text-center">
        <h1 className="text-4xl font-extrabold theme-accent mb-12">💸 Best Deals</h1>
        <p className="text-gray-600">Loading deals products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 px-6 theme-bg min-h-screen text-center">
        <h1 className="text-4xl font-extrabold theme-accent mb-12">💸 Best Deals</h1>
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
        className="text-4xl font-extrabold text-center theme-accent mb-12"
      >
        💸 Best Deals
      </motion.h1>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="theme-surface rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col items-center cursor-pointer hover:theme-hover"
          >
            {/* Product Image - Clickable */}
            <Link to={`/product/${product._id}`} className="w-full">
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
            </Link>

            {/* Product Info */}
            <Link to={`/product/${product._id}`} className="text-center w-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-1">💰 Rs {product.price}</p>
              <p
                className={`text-sm mb-4 ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0
                  ? `In Stock: ${product.stock}`
                  : "Out of Stock"}
              </p>
            </Link>

            {/* Buy Now Button */}
            <Link
              to={`/product/${product._id}`}
              className="mt-auto btn-accent px-6 py-2 rounded-full shadow-md hover:shadow-xl transition"
            >
              Buy Now
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Deals;
