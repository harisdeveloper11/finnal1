import { motion } from "framer-motion";
import { Send } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-16 theme-bg">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold theme-text"
        >
          Subscribe to our Newsletter
        </motion.h2>
        <p className="mt-2 theme-text-muted">
          Get the latest updates, deals & exclusive offers directly to your inbox
        </p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-col md:flex-row items-center justify-center gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full md:w-2/3 px-5 py-3 rounded-full border border-white/20 theme-surface theme-text placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-transparent"
            required
          />
          <button
            type="submit"
            className="flex items-center gap-2 btn-primary px-6 py-3 rounded-full transition"
          >
            <Send className="w-4 h-4" /> Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Newsletter;
