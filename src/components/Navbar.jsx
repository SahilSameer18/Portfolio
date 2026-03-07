import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import resume from "../assets/sahilSameerResume.pdf";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");

  const links = [
    { name: "Home", path: "#home", id: "home" },
    { name: "About", path: "#about", id: "about" },
    { name: "Skills", path: "#skills", id: "skills" },
    { name: "Projects", path: "#projects", id: "projects" },
    { name: "Education", path: "#education", id: "education" },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 w-full flex justify-center z-50"
    >
      <div className="flex items-center border border-slate-700 bg-black/60 backdrop-blur-lg px-6 py-4 rounded-full text-white text-sm">

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-5">
          {links.map((item) => (
            <motion.a
              key={item.name}
              href={item.path}
              aria-label={`Navigate to ${item.name} section`}
              whileHover={{ y: -2 }}
              className={`relative overflow-hidden h-5 group transition-colors duration-300 ${
                active === item.id ? "text-indigo-300" : "text-white"
              }`}
            >
              <span className="block group-hover:-translate-y-full transition-transform duration-300">
                {item.name}
              </span>

              <span className="block absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300">
                {item.name}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Buttons */}
        <div className="hidden ml-8 md:flex items-center gap-3">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-slate-600 hover:bg-slate-800 px-3 py-1.5 rounded-full text-sm transition"
          >
            Contact
          </motion.a>

          <motion.a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-500 rounded-full text-white"
          >
            Resume
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden ml-4 text-lg"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 bg-black w-full flex flex-col items-center gap-6 py-8 text-white md:hidden"
          >
            {links.map((item) => (
              <motion.a
                key={item.name}
                href={item.path}
                aria-label={`Navigate to ${item.name} section`}
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsOpen(false)}
                className={`hover:text-purple-400 ${
                  active === item.id ? "text-indigo-300" : ""
                }`}
              >
                {item.name}
              </motion.a>
            ))}

            <a
              href="#contact"
              className="border border-slate-600 px-4 py-2 rounded-full"
            >
              Contact
            </a>

            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-4 py-2 rounded-full"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}