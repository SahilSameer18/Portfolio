import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const navRef = useRef(null);

  const links = [
    { name: "Home", path: "#home", id: "home" },
    { name: "About", path: "#about", id: "about" },
    { name: "Skills", path: "#skills", id: "skills" },
    // { name: "Experience", path: "#experience", id: "experience" },
    { name: "Projects", path: "#projects", id: "projects" },
    { name: "Education", path: "#education", id: "education" },
    { name: "Contact", path: "#contact", id: "contact" },
  ];

  // ✅ Separate effect: scroll tracking — runs once only
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3 },
    );

    const observeSections = () => {
      observer.disconnect();

      document.querySelectorAll("section").forEach((section) => {
        observer.observe(section);
      });
    };

    observeSections();

    const mutationObserver = new MutationObserver(() => {
      observeSections();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  // ✅ Separate effect: outside click — only active when menu is open
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
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
      {/* ── Mobile Navbar ── */}
      <div className="md:hidden flex flex-col w-full">
        <div
          className={`flex items-center justify-between px-6 py-4 transition-all duration-300 ${
            isOpen
              ? "bg-white/10 backdrop-blur-3xl shadow-2xl"
              : "bg-transparent backdrop-blur-sm"
          }`}
        >
          {/* Mobile Logo */}
          <a
            href="#home"
            className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            SS
          </a>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="w-7 h-0.5 bg-white rounded-full block"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="w-7 h-0.5 bg-white rounded-full block"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="w-7 h-0.5 bg-white rounded-full block"
            />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full overflow-hidden"
              style={{
                background: "rgba(5,5,15,0.75)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex flex-col items-center gap-6 py-10">
                {links.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      const target = document.querySelector(item.path);
                      if (target) {
                        setTimeout(() => {
                          target.scrollIntoView({ behavior: "smooth" });
                        }, 300);
                      }
                    }}
                    className={`text-base font-medium tracking-widest uppercase transition-colors duration-200 ${
                      active === item.id
                        ? "text-indigo-400"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </motion.a>
                ))}

                <motion.a
                  href="/sameer-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-2 flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold text-sm bg-gradient-to-r from-indigo-600 to-purple-500"
                  style={{ boxShadow: "0 0 20px rgba(99,102,241,0.35)" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H7M17 7v10"
                    />
                  </svg>
                  Resume
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Desktop Navbar (Pill) ── */}
      <div className="hidden md:flex justify-center pt-4">
        <div className="flex items-center gap-10 border border-slate-700 bg-black/60 backdrop-blur-lg px-6 py-3 rounded-full text-white text-sm shadow-xl">
          {/* ✅ Desktop Logo — branding now visible on desktop too */}
          <a
            href="#home"
            className="text-lg font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent select-none"
          >
            SS
          </a>

          {/* Divider */}
          <div className="w-px h-4 bg-white/20 rounded-full" />

          {/* Desktop Links */}
          <div className="flex items-center gap-8">
            {links.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={`relative h-5 overflow-hidden block group transition-colors duration-300 ${
                  active === item.id ? "text-indigo-300" : "text-white"
                }`}
              >
                <span className="block leading-5 group-hover:-translate-y-full transition-transform duration-300">
                  {item.name}
                </span>
                <span className="block leading-5 absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300">
                  {item.name}
                </span>
              </a>
            ))}
          </div>
          {/* Divider */}
          <div className="w-px h-4 bg-white/20 rounded-full" />

          {/* Desktop Resume Button */}
          <motion.a
            href="/sameer-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-500 rounded-full text-white font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17L17 7M17 7H7M17 7v10"
              />
            </svg>
            Resume
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
