import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import axios from "axios";
import { useAddToCartModal } from "../AddToCartModalContext";

const Search = () => {
  const { open: openAddToCartModal } = useAddToCartModal();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

  return (
    <div className="py-16 px-6 theme-bg min-h-screen">
      {/* Page Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold text-center theme-text mb-12"
      >
        🔍 Search Products
      </motion.h1>

      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-md mx-auto mb-12"
      >
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 theme-text-muted" size={20} />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 theme-surface rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 theme-text placeholder-white/60"
          />
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center theme-text-muted mb-8"
      >
        {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
      </motion.p>

      {/* Product Cards Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="theme-surface rounded-3xl shadow-md hover:shadow-2xl transition p-5 flex flex-col items-center hover:theme-hover"
            >
              {/* Product Image */}
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover rounded-xl mb-4"
              />

              {/* Product Info */}
              <h2 className="text-lg font-semibold theme-text mb-1 text-center">
                {product.name}
              </h2>
              <p className="theme-text-muted mb-1">${product.price}</p>

              {/* Add to Cart Button - Opens Modal */}
              <button
                onClick={() => {
                  openAddToCartModal({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    image: product.image,
                  });
                }}
                className="mt-auto btn-primary px-6 py-2 rounded-full shadow-md hover:shadow-xl transition font-semibold"
              >
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center theme-text-muted"
        >
          <p className="text-xl">No products found matching your search.</p>
          <p className="mt-2">Try different keywords or check spelling.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Search;
