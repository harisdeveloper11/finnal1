import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/contacts`, formData);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen theme-bg flex items-center justify-center p-6">
      <div className="max-w-6xl w-full theme-surface rounded-2xl shadow-2xl overflow-hidden md:flex backdrop-blur-md border border-white/10">
        {/* Left Side - Contact Info */}
        <div className="md:w-1/2 bg-gradient-to-b from-purple-600 to-pink-600 text-white p-10 flex flex-col justify-center gap-6">
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="text-white/80">
            Have a question or want to work together? Reach out to us anytime!
          </p>

          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6" />
            <span>info@myshop.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-6 h-6" />
            <span>+92 300 1234567</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6" />
            <span>123 Street, City, Pakistan</span>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="md:w-1/2 p-8 md:p-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 theme-surface theme-text placeholder-white/60 bg-transparent"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 theme-surface theme-text placeholder-white/60 bg-transparent"
              />
            </div>
            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 theme-surface theme-text placeholder-white/60 bg-transparent"
              />
            </div>
            <div>
              <textarea
                rows="5"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border border-white/20 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 theme-surface theme-text placeholder-white/60 bg-transparent"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-4 btn-primary font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
