import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! Thank you.");
    setFormData({ name: "", email: "", message: "" });
  };

  // Framer Motion variants
  const containerVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  return (
    <section
      id="contact"
      className="min-h-screen text-white py-20 md:py-28 px-6 md:px-12 scroll-mt-12"
    >
      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl md:text-6xl font-bold">Contact Me</h2>
        <p className="text-xs tracking-widest text-white/60 mt-2">
          GET IN TOUCH
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:border-indigo-500 transition"
            variants={itemVariant}
            required
          />
          <motion.input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:border-indigo-500 transition"
            variants={itemVariant}
            required
          />
          <motion.textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:border-indigo-500 transition resize-none"
            variants={itemVariant}
            required
          ></motion.textarea>
          <motion.button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-500 rounded-full text-white font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            Send Message
          </motion.button>
        </motion.form>

        {/* Contact Info + Message */}
        <motion.div
          className="flex flex-col justify-center gap-8 text-center md:text-left"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="text-white/70 leading-relaxed space-y-1 text-sm md:text-base px-2 md:px-0"
            variants={itemVariant}
          >
            <p>I'm available for full-time roles & freelance projects.</p>
            <p>My inbox is always open,</p>
            <p>Whether you have a question or just want to say hi,</p>
            <p>I'll try my best to get back to you!</p>
          </motion.div>

          {/* Email */}
          <motion.div
            className="flex items-center gap-4 mt-4"
            variants={itemVariant}
          >
            <FaEnvelope className="text-indigo-500 text-2xl" />
            <span>sahilsameer.dev18@gmail.com</span>
          </motion.div>

          {/* Social Icons */}
          <motion.div className="flex gap-6 mt-6 justify-center md:justify-start">
  {[
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/sahil-sameer-siddique-abb849233/",
      color: "#0077B5",
    },
    {
      icon: FaGithub,
      href: "https://github.com/SahilSameer18",
      color: "#ffffff",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com/yourinstagram",
      color: "#E1306C",
    },
  ].map((social, i) => {
    const Icon = social.icon;
    return (
      <motion.a
        key={i}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
        className={`text-3xl`}
        style={{ color: social.color }}
      >
        <Icon className="hover:drop-shadow-[0_0_8px]" />
      </motion.a>
    );
  })}
</motion.div>
        </motion.div>
      </div>
    </section>
  );
}
