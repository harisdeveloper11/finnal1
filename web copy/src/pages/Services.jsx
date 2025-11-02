import { motion } from "framer-motion";
import { Code, ShoppingBag, Smartphone, Palette } from "lucide-react";

const services = [
  {
    id: 1,
    icon: <Code size={40} className="text-blue-600" />,
    title: "Web Development",
    desc: "We build fast, modern, and SEO-friendly websites using the latest technologies.",
  },
  {
    id: 2,
    icon: <ShoppingBag size={40} className="text-green-600" />,
    title: "E-Commerce Solutions",
    desc: "Grow your business online with secure and scalable e-commerce platforms.",
  },
  {
    id: 3,
    icon: <Smartphone size={40} className="text-purple-600" />,
    title: "App Development",
    desc: "Custom mobile apps for Android & iOS to engage your audience on the go.",
  },
  {
    id: 4,
    icon: <Palette size={40} className="text-pink-600" />,
    title: "UI/UX Design",
    desc: "Beautiful and user-friendly designs that deliver great experiences.",
  },
];

const Services = () => {
  return (
    <section className="w-full theme-bg py-16">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold theme-text"
        >
          Our <span className="text-blue-600">Services</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-lg theme-text max-w-2xl mx-auto"
        >
          We offer a wide range of services to help you build, grow, and scale your digital presence.
        </motion.p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
            <p className="text-gray-600 mt-2">{service.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Process / Timeline Section */}
      <div className="max-w-5xl mx-auto mt-24 px-6">
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-900 text-center mb-10"
        >
          How We Work
        </motion.h3>
        <div className="space-y-8">
          {["Idea & Planning", "Design & Development", "Testing & Launch", "Support & Maintenance"].map(
            (step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3 }}
                className="bg-white p-6 rounded-xl shadow flex items-center gap-6"
              >
                <div className="text-2xl font-bold text-blue-600">{index + 1}</div>
                <p className="text-gray-700 text-lg">{step}</p>
              </motion.div>
            )
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto mt-20 text-center px-6">
        <motion.h4
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-gray-900"
        >
          Ready to bring your ideas to life?
        </motion.h4>
        <p className="mt-3 text-gray-600">
          Let’s collaborate and build something amazing together.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
        >
          Contact Us
        </motion.button>
      </div>
    </section>
  );
};

export default Services;
