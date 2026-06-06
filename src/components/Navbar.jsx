import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import resume from "../assets/sameer-resume.pdf";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const navRef = useRef(null);

  const links = [
    { name: "Home", path: "#home", id: "home" },
    { name: "About", path: "#about", id: "about" },
    { name: "Skills", path: "#skills", id: "skills" },
    { name: "Projects", path: "#projects", id: "projects" },
    { name: "Education", path: "#education", id: "education" },
    { name: "Contact", path: "#contact", id: "contact" },
  ];

  useEffect(() => {
    // Intersection Observer for scroll tracking
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

    // Outside click listener
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      observer.disconnect();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 px-0 md:px-4"
    >
      {/* Mobile Navbar */}
      <div className="md:hidden flex flex-col w-full">
        <div className={`flex items-center justify-between px-6 py-4 transition-all duration-300 ${
          isOpen ? "bg-white/10 backdrop-blur-3xl shadow-2xl" : "bg-transparent backdrop-blur-sm"
        }`}>
          {/* Mobile Logo (SS) */}
          <motion.a 
            href="#home"
            className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            SS
          </motion.a>

          {/* Custom Animated Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-7 h-0.5 bg-white rounded-full block"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="w-7 h-0.5 bg-white rounded-full block"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-7 h-0.5 bg-white rounded-full block"
            />
          </button>
        </div>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full bg-white/5 backdrop-blur-3xl border-b border-white/10 overflow-hidden"
            >
              <div className="flex flex-col items-center gap-6 py-10">
                {links.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg transition-colors font-medium tracking-wider ${
                      active === item.id ? "text-indigo-300" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.a
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold shadow-xl shadow-indigo-500/30"
                >
                  Resume
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Navbar (Pill Design) */}
      <div className="hidden md:flex justify-center pt-4">
        <div className="flex items-center border border-slate-700 bg-black/60 backdrop-blur-lg px-6 py-4 rounded-full text-white text-sm shadow-xl">
          {/* Desktop Links */}
          <div className="flex items-center gap-8">
            {links.map((item) => (
              <motion.a
                key={item.name}
                href={item.path}
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

          {/* Desktop Resume Button */}
          <div className="ml-10 flex items-center gap-3">
            <motion.a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-500 rounded-full text-white font-medium"
            >
              Resume
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
