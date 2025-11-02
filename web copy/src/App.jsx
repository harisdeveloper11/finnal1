import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/navbar";
import Login from "./components/Login";
import Hero from "./pages/hero";
import FeaturedProducts from "./components/FeaturedProducts";
import Testimonials from "./components/testominl";
import SpecialOffers from "./components/SpecialOffers";
import Newsletter from "./components/newsletter";
import ScrollButton from "./components/ScrollButton";
import Footer from "./components/footer";
import ServicesSection from "./components/services";
import OrderFormModal from "./components/OrderFormModal";

// Collection Pages
import Trending from "./collection/Trending.jsx";
import Latest from "./collection/Latest.jsx";
import Popular from "./collection/Popular.jsx";
import Deals from "./collection/Deals.jsx";
import Shop from "./collection/Shop.jsx";
import Contact from "./pages/contact.jsx";
import Search from "./pages/Search.jsx";

// Pages
import ProductDetail from "./pages/prodectdetails";
import About from "./pages/about";
import ServicesPage from "./pages/Services";

// Dashboard Pages
import Dashboard from "./dashboard/dashboard";
import Products from "./dashboard/products";
import Orders from "./dashboard/orders";
import Users from "./dashboard/users";
import Contacts from "./dashboard/contacts";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard && !isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      {!isDashboard && <Navbar />}

      <div className={isDashboard ? "" : "pt-20"}>
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <ServicesSection />
                <FeaturedProducts />
                <Testimonials />
                <SpecialOffers />
                <Newsletter />
                <ScrollButton />
              </>
            }
          />

          {/* Product Detail Page */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Search Page */}
          <Route path="/search" element={<Search />} />

          {/* About Page */}
          <Route path="/about" element={<About />} />

          {/* Services Page */}
          <Route path="/services" element={<ServicesPage />} />

          {/* Contact Page */}
          <Route path="/contact" element={<Contact />} />

          {/* Collection Pages */}
          <Route path="/collection/trending" element={<Trending />} />
          <Route path="/collection/latest" element={<Latest />} />
          <Route path="/collection/shop" element={<Shop />} />
          <Route path="/collection/deals" element={<Deals />} />
          <Route path="/collection/popular" element={<Popular />} />

          {/* Dashboard Nested Routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<div>Welcome to Dashboard</div>} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
            <Route path="contacts" element={<Contacts />} />
          </Route>
        </Routes>

        {!isDashboard && <Footer />}
      </div>

      {/* Global Order Modal */}
      <OrderFormModal />
    </>
  );
}

export default App;
