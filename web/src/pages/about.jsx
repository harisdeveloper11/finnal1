import { motion } from "framer-motion";

const team = [
  {
    name: "Haris Baig",
    role: "Founder & CEO",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Sara Khan",
    role: "Lead Designer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Ali Raza",
    role: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
  },
];

const About = () => {
  return (
    <div className="theme-bg">
      {/* Hero Section */}
      <section className="text-center py-20">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold theme-text"
        >
          About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 theme-text-muted max-w-2xl mx-auto"
        >
          We are a passionate team dedicated to building modern and user-friendly
          digital experiences.
        </motion.p>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <motion.img
          src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800"
          alt="Mission"
          className="rounded-2xl shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold theme-primary">Our Mission</h2>
          <p className="mt-4 theme-text-muted leading-relaxed">
            Our mission is to empower businesses and individuals with innovative
            solutions that simplify life and enhance digital presence. We aim to
            deliver products that not only meet expectations but exceed them.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 theme-surface">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { label: "Happy Clients", value: "500+" },
            { label: "Projects Completed", value: "120+" },
            { label: "Team Members", value: "20+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-6 theme-surface-light rounded-xl shadow-2xl backdrop-blur-md border border-white/10"
            >
              <h3 className="text-3xl font-extrabold theme-text">{stat.value}</h3>
              <p className="mt-2 theme-text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center theme-primary">
          Meet Our Team
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {team.map((member, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="theme-surface rounded-2xl shadow-2xl p-6 text-center backdrop-blur-md border border-white/10"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 object-cover rounded-full mx-auto shadow-md"
              />
              <h3 className="mt-4 text-xl font-semibold theme-text">
                {member.name}
              </h3>
              <p className="theme-text-muted">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center theme-surface">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold theme-text"
        >
          Want to work with us?
        </motion.h2>
        <p className="mt-2 theme-text-muted">
          Let's build something great together.
        </p>
        <button className="mt-6 px-6 py-3 btn-primary rounded-xl font-semibold transition">
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default About;
