import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, ChevronDown, X, Menu, Trash2 } from "lucide-react";
import { useCart } from "../CartContext";
import type { CartItem } from "../CartContext";
import { useMemo } from "react";
import { useOrderModal } from "../OrderModalContext";
import { useCartModal } from "../CartModalContext";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLLIElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { open } = useOrderModal();
  const { open: openCartModal } = useCartModal();
  const cartCount = cartItems.length;
  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const priceNumber = typeof item.price === 'string' ? Number(String(item.price).replace(/[^0-9.]/g, '')) : item.price;
      return sum + (priceNumber || 0) * (item.quantity || 1);
    }, 0);
  }, [cartItems]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (dropdownRef.current && !dropdownRef.current.contains(target)) setDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
<nav className="fixed top-0 left-0 right-0 z-50 theme-bg shadow-2xl rounded-b-2xl px-4 md:px-6 py-4 flex items-center justify-between backdrop-blur-md border-b border-white/10">
      {/* Logo */}
      <div className="flex items-center cursor-pointer flex-shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/src/assets/logo.svg" 
            alt="TechAccess Logo" 
            className="w-6 h-6 md:w-8 md:h-8"
          />
          <span className="text-lg md:text-xl font-bold theme-primary">TechAccess</span>
        </Link>
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-4 md:gap-6 items-center font-medium text-base lg:text-lg">
        <li><Link to="/" className="theme-text hover:theme-primary transition-colors">Home</Link></li>
        <li><Link to="/about" className="theme-text hover:theme-primary transition-colors">About</Link></li>
        <li><Link to="/services" className="theme-text hover:theme-primary transition-colors">Services</Link></li>

        {/* Dropdown */}
        <li className="relative cursor-pointer" ref={dropdownRef}>
          <div
            className="flex items-center gap-1 theme-text hover:theme-primary transition-colors"
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            Collection <ChevronDown size={16} />
          </div>
          {dropdownOpen && (
            <ul className="absolute top-10 left-0 theme-surface shadow-2xl rounded-lg py-2 w-44 text-sm backdrop-blur-md border border-white/10">
              <li><Link to="/collection/trending" className="block px-3 py-2 theme-text hover:theme-hover transition-colors">Trending</Link></li>
              <li><Link to="/collection/latest" className="block px-3 py-2 theme-text hover:theme-hover transition-colors">Latest</Link></li>
              <li><Link to="/collection/shop" className="block px-3 py-2 theme-text hover:theme-hover transition-colors">Shop</Link></li>
              <li><Link to="/collection/deals" className="block px-3 py-2 theme-text hover:theme-hover transition-colors">Deals</Link></li>
              <li><Link to="/collection/popular" className="block px-3 py-2 theme-text hover:theme-hover transition-colors">Popular</Link></li>
            </ul>
          )}
        </li>

        <li><Link to="/contact" className="theme-text hover:theme-primary transition-colors">Contact</Link></li>
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
        {/* Search */}
        <Link to="/search" className="theme-text-muted hover:theme-primary transition-colors">
          <Search size={20} />
        </Link>

        {/* Cart */}
        <div ref={cartRef} className="relative">
          <ShoppingCart
            className="cursor-pointer theme-text-muted hover:theme-primary transition-colors"
            size={22}
            onClick={openCartModal}
          />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-1 py-0.5 rounded-full">{cartCount}</span>
          )}
        </div>

        {/* Hamburger */}
        <button className="md:hidden theme-text-muted hover:theme-primary transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="absolute top-full left-0 w-full theme-surface shadow-2xl flex flex-col md:hidden z-40 backdrop-blur-md border border-white/10">
          <li><Link to="/" className="block px-4 py-2 theme-text hover:theme-hover transition-colors" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" className="block px-4 py-2 theme-text hover:theme-hover transition-colors" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/services" className="block px-4 py-2 theme-text hover:theme-hover transition-colors" onClick={() => setMenuOpen(false)}>Services</Link></li>
          <li className="relative">
            <div
              className="flex items-center justify-between px-4 py-2 cursor-pointer theme-text hover:theme-hover transition-colors"
              onClick={() => setMobileDropdownOpen(prev => !prev)}
            >
              Collection <ChevronDown size={16} />
            </div>
            {mobileDropdownOpen && (
              <ul className="pl-4">
                <li><Link to="/collection/trending" className="block py-1 theme-text hover:theme-hover transition-colors" onClick={() => setMenuOpen(false)}>Trending</Link></li>
                <li><Link to="/collection/latest" className="block py-1 theme-text hover:theme-hover transition-colors" onClick={() => setMenuOpen(false)}>Latest</Link></li>
                <li><Link to="/collection/shop" className="block py-1 theme-text hover:theme-hover transition-colors" onClick={() => setMenuOpen(false)}>Shop</Link></li>
                <li><Link to="/collection/deals" className="block py-1 theme-text hover:theme-hover transition-colors" onClick={() => setMenuOpen(false)}>Deals</Link></li>
                <li><Link to="/collection/popular" className="block py-1 theme-text hover:theme-hover transition-colors" onClick={() => setMenuOpen(false)}>Popular</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/contact" className="block px-4 py-2 theme-text hover:theme-hover transition-colors" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        </ul>
      )}


    </nav>
  );
};

export default Navbar;
