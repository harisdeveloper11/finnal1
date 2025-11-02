import { motion } from "framer-motion";
import { ShoppingCart, Truck, ShieldCheck, Star } from "lucide-react";

const services = [
  {
    icon: <ShoppingCart size={36} className="theme-primary" />,
    title: "Easy Shopping",
    desc: "Enjoy a smooth and fast shopping experience with our modern platform.",
  },
  {
    icon: <Truck size={36} className="theme-accent" />,
    title: "Fast Delivery",
    desc: "Get your orders delivered quickly and safely to your doorstep.",
  },
  {
    icon: <ShieldCheck size={36} className="theme-secondary" />,
    title: "Secure Payments",
    desc: "Your transactions are safe with top-notch payment security.",
  },
  {
    icon: <Star size={36} className="text-yellow-400" />,
    title: "Top Quality",
    desc: "We provide only the best products trusted by thousands of customers.",
  },
];

const Services = () => {
  return (
    <section className="w-full py-16 theme-bg">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold theme-text mb-4">
          Our <span className="theme-primary">Services</span>
        </h2>
        <p className="theme-text-muted max-w-2xl mx-auto mb-12">
          We aim to provide the best experience for our customers with fast
          delivery, secure payments, and premium products.
        </p>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="theme-surface p-8 rounded-2xl shadow-2xl hover:shadow-2xl cursor-pointer backdrop-blur-md border border-white/10"
            >
              <div className="flex flex-col items-center space-y-4">
                {service.icon}
                <h3 className="text-xl font-semibold theme-text">
                  {service.title}
                </h3>
                <p className="theme-text-muted text-sm">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
