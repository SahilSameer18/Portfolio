import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import pic from "../assets/pic2.webp";
import Magnetic from "../components/Magnetic";
import GlitchText from "../components/GlitchText";

const titles = [
  "Full Stack Developer",
  "Backend Developer",
  "Software Developer",
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ── Static particle config (outside component to avoid re-creation per render) ──
const PARTICLES = [
  { size: 3, x: "12%",  y: "22%", delay: 0,   dur: 7   },
  { size: 4, x: "78%",  y: "14%", delay: 1.4, dur: 9   },
  { size: 2, x: "63%",  y: "58%", delay: 0.8, dur: 8   },
  { size: 5, x: "28%",  y: "72%", delay: 2.1, dur: 11  },
  { size: 3, x: "88%",  y: "78%", delay: 0.4, dur: 10  },
  { size: 2, x: "45%",  y: "35%", delay: 3.0, dur: 8.5 },
  { size: 4, x: "8%",   y: "58%", delay: 1.8, dur: 9.5 },
  { size: 3, x: "55%",  y: "88%", delay: 0.6, dur: 7.5 },
];

export default function Hero({ startAnimation = true }) {
  const [currentTitle, setCurrentTitle] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!startAnimation) return;
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [startAnimation]);

  return (
    <section id="home" className="relative min-h-screen flex items-center scroll-mt-12">

      {/* ── Floating particles — hidden on reduced-motion/mobile ── */}
      {!prefersReduced && (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width:  p.size,
              height: p.size,
              left:   p.x,
              top:    p.y,
              background: isDark
                ? "radial-gradient(circle, rgba(139,92,246,0.75), rgba(99,102,241,0.18))"
                : "radial-gradient(circle, rgba(99,102,241,0.50), rgba(139,92,246,0.12))",
            }}
            animate={{ y: [0, -(p.size * 3 + 10), 0], opacity: [0.25, 0.75, 0.25] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}
      </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-16 items-center">

        {/* ── Left Text ── */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate={startAnimation ? "show" : "hidden"}
        >

          {/* Greeting */}
          <motion.p
            variants={itemVariants}
            className="text-indigo-600 dark:text-indigo-400 font-medium tracking-wide"
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-neutral-900 dark:text-white"
          >
            <GlitchText text="Sahil Sameer" />
            <br />
            <span className="bg-gradient-to-r from-indigo-950 via-indigo-600 to-purple-600 dark:from-white/90 dark:via-indigo-400 dark:to-purple-500 bg-clip-text text-transparent">
              <GlitchText text="Siddique" />
            </span>
          </motion.h1>

          {/* Rotating Title */}
          <motion.div variants={itemVariants} className="h-9">
            <AnimatePresence mode="wait">
              <motion.p
                key={titles[currentTitle]}
                className="text-lg md:text-xl font-semibold tracking-wide bg-gradient-to-r from-indigo-950 via-indigo-600 to-purple-700 dark:from-white/90 dark:via-indigo-500 dark:to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {titles[currentTitle]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Divider Lines */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-indigo-600 to-purple-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-500" />
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-neutral-600 dark:text-gray-400 max-w-md leading-relaxed"
          >
            I build AI-powered, production-ready web apps using the MERN stack
            and PostgreSQL - from scalable REST APIs to Gemini AI integration.
          </motion.p>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <Magnetic>
              <motion.a
                href="https://github.com/SahilSameer18"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-200"
                style={{
                  background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                  border: isDark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(0,0,0,0.10)",
                  color: isDark ? "#e5e7eb" : "#1f2937",
                }}
              >
                <FaGithub size={17} />
              </motion.a>
            </Magnetic>

            <Magnetic>
              <motion.a
                href="https://www.linkedin.com/in/sahil-sameer-siddique/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-200"
                style={{
                  background: isDark ? "rgba(0,119,181,0.12)" : "rgba(0,119,181,0.08)",
                  border: "1px solid rgba(0,119,181,0.30)",
                  color: "#0077B5",
                }}
              >
                <FaLinkedin size={17} />
              </motion.a>
            </Magnetic>
          </motion.div>

          {/* Resume Button */}
          <motion.div variants={itemVariants}>
            <motion.a
              href="/my-resume.pdf"
              download="Sahil-Sameer-Resume.pdf"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group btn-shimmer inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-sm bg-gradient-to-r from-indigo-700 to-violet-500 shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_4px_32px_rgba(99,102,241,0.55)] transition-shadow duration-300"
            >
              {/* Download Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4"
                />
              </svg>
              <span className="relative h-5 overflow-hidden flex flex-col">
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                  Resume
                </span>
                <span className="absolute top-full block transition-transform duration-300 group-hover:-translate-y-full">
                  Resume
                </span>
              </span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── Right Image ── */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={startAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative will-change-transform"
          >
            {/* Ambient glow behind ring */}
            <div
              className="absolute -inset-8 rounded-full -z-10 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(168,85,247,0.10) 50%, transparent 75%)",
                filter: "blur(20px)",
              }}
            />

            {/* Profile photo — clean indigo ring + glow via box-shadow, zero DOM overhead */}
            <motion.img
              src={pic}
              alt="Sahil Sameer Siddique"
              loading="eager"
              fetchPriority="high"
              className="w-72 h-72 md:w-[22rem] md:h-[22rem] rounded-full object-cover"
              style={{
                boxShadow: isDark
                  ? "0 0 0 3px #6366f1, 0 0 0 8px rgba(99,102,241,0.22), 0 16px 48px rgba(99,102,241,0.28)"
                  : "0 0 0 3px #6366f1, 0 0 0 8px rgba(99,102,241,0.14), 0 8px 32px rgba(99,102,241,0.18)",
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </motion.div>
        </motion.div>

      </div>

      {/* ── Scroll-down arrow ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center gap-1"
          animate={startAnimation ? { y: [0, 6, 0] } : {}}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-400 dark:text-gray-600">
            scroll
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-neutral-400 dark:text-gray-600"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}


