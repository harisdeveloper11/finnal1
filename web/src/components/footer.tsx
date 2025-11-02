import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Shield, Truck, Headphones } from "lucide-react";

const Footer = () => {
  return (
    <footer className="theme-bg text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <img 
                src="/src/assets/logo.svg" 
                alt="TechAccess Logo" 
                className="w-7 h-7"
              />
              <h2 className="text-2xl font-bold">TechAccess</h2>
            </div>
            <p className="theme-text-muted text-sm leading-relaxed">
              Your premier destination for mobile and laptop accessories. Quality products, fast delivery, and exceptional service.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold theme-text">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="theme-text-muted hover:theme-primary transition text-sm">Home</a></li>
              <li><a href="/collection/shop" className="theme-text-muted hover:theme-primary transition text-sm">Shop</a></li>
              <li><a href="/collection/popular" className="theme-text-muted hover:theme-primary transition text-sm">Popular</a></li>
              <li><a href="/collection/trending" className="theme-text-muted hover:theme-primary transition text-sm">Trending</a></li>
              <li><a href="/about" className="theme-text-muted hover:theme-primary transition text-sm">About Us</a></li>
              <li><a href="/contact" className="theme-text-muted hover:theme-primary transition text-sm">Contact</a></li>
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold theme-text">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="theme-text-muted hover:theme-primary transition text-sm">Mobile Accessories</a></li>
              <li><a href="#" className="theme-text-muted hover:theme-primary transition text-sm">Laptop Accessories</a></li>
              <li><a href="#" className="theme-text-muted hover:theme-primary transition text-sm">Gaming Gear</a></li>
              <li><a href="#" className="theme-text-muted hover:theme-primary transition text-sm">Smart Watches</a></li>
              <li><a href="#" className="theme-text-muted hover:theme-primary transition text-sm">Audio Devices</a></li>
              <li><a href="#" className="theme-text-muted hover:theme-primary transition text-sm">Charging Solutions</a></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold theme-text">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="theme-primary" size={16} />
                <span className="theme-text-muted text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="theme-primary" size={16} />
                <span className="theme-text-muted text-sm">support@techaccess.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="theme-primary" size={16} />
                <span className="theme-text-muted text-sm">123 Tech Street, Digital City</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="flex items-center gap-3 p-4 theme-surface rounded-lg">
            <Truck className="theme-primary" size={24} />
            <div>
              <h4 className="font-semibold text-sm theme-text">Free Shipping</h4>
              <p className="theme-text-muted text-xs">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 theme-surface rounded-lg">
            <Shield className="theme-accent" size={24} />
            <div>
              <h4 className="font-semibold text-sm theme-text">Secure Payment</h4>
              <p className="theme-text-muted text-xs">100% secure checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 theme-surface rounded-lg">
            <Headphones className="theme-secondary" size={24} />
            <div>
              <h4 className="font-semibold text-sm theme-text">24/7 Support</h4>
              <p className="theme-text-muted text-xs">Always here to help</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="theme-text-muted text-sm">
            © 2025 TechAccess. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="theme-text-muted hover:theme-primary transition">Privacy Policy</a>
            <a href="#" className="theme-text-muted hover:theme-primary transition">Terms of Service</a>
            <a href="#" className="theme-text-muted hover:theme-primary transition">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
