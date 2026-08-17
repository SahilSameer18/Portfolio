import { useEffect, useRef, useState, Suspense } from "react";
import { motion, AnimatePresence, useReducedMotion, useSpring, useMotionValue } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import pic from "../assets/pic2.webp";
import Magnetic from "../components/Magnetic";
import GlitchText from "../components/GlitchText";
import HeroScene from "../components/HeroScene";
import { heroTitles as titles } from "../constants/hero.data";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Typing cursor animation for "Hello, I'm" ──────────────────────────────
function TypedGreeting({ active }) {
  const full = "Hello, I'm";
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (!active) return;
    setChars(0);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setChars(i);
      if (i >= full.length) clearInterval(iv);
    }, 60);
    return () => clearInterval(iv);
  }, [active]);

  return (
    <span>
      {full.slice(0, chars)}
      {chars < full.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block w-0.5 h-4 ml-0.5 align-middle bg-indigo-500"
        />
      )}
    </span>
  );
}

// ─── 3D-tilt profile photo wrapper ───────────────────────────────────────────
function PhotoCard({ isDark, startAnimation }) {
  const cardRef   = useRef(null);
  const rafRef    = useRef(null);
  const rotX      = useMotionValue(0);
  const rotY      = useMotionValue(0);
  const springX   = useSpring(rotX, { stiffness: 120, damping: 18 });
  const springY   = useSpring(rotY, { stiffness: 120, damping: 18 });
  const prefersReduced = useReducedMotion();

  const handleMove = (e) => {
    if (prefersReduced || !cardRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const dx   = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
      const dy   = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
      rotX.set(-dy * 10);
      rotY.set(dx * 10);
    });
  };

  const handleLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <motion.div
      className="flex justify-center"
      initial={{ opacity: 0, x: 40 }}
      animate={startAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Perspective wrapper */}
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ perspective: "900px" }}
        className="relative"
      >
        <motion.div
          style={{
            rotateX: springX,
            rotateY: springY,
            transformStyle: "preserve-3d",
          }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative will-change-transform group"
        >
          {/* Outer ambient glow */}
          <div
            className="absolute -inset-10 rounded-full -z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.28) 0%, rgba(168,85,247,0.14) 50%, transparent 72%)",
              filter: "blur(28px)",
            }}
          />

          {/* ── Animated orbit rings — pure CSS (zero JS per frame) ── */}
          {/* Ring 1 */}
          <div
            className="absolute -inset-6 rounded-full border pointer-events-none"
            style={{
              borderColor: isDark ? "rgba(99,102,241,0.38)" : "rgba(99,102,241,0.45)",
              animation: "spin 14s linear infinite",
            }}
          />
          {/* Ring 2 — tilted */}
          <div
            className="absolute -inset-10 rounded-full border pointer-events-none"
            style={{
              borderColor: isDark ? "rgba(168,85,247,0.28)" : "rgba(124,58,237,0.35)",
              transform: "rotateX(65deg)",
              animation: "spin 22s linear infinite reverse",
            }}
          />

          {/* Spinning gradient border */}
          <motion.div
            className="absolute -inset-[3px] rounded-full -z-[1] pointer-events-none"
            style={{
              background:
                "conic-gradient(from 0deg, #6366f1, #a78bfa, #ec4899, #38bdf8, #6366f1)",
              opacity: isDark ? 0.75 : 0.70,
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner mask (to show only the gradient border, not fill) */}
          <div
            className="absolute inset-[3px] rounded-full -z-[1] pointer-events-none"
            style={{
              /* Match the actual page bg in each theme */
              background: isDark ? "#050507" : "#f8fafc",
            }}
          />

          {/* Profile photo */}
          <motion.img
            src={pic}
            alt="Sahil Sameer Siddique"
            loading="eager"
            fetchPriority="high"
            className="w-64 h-64 md:w-[22rem] md:h-[22rem] rounded-full object-cover relative z-10"
            style={{
              boxShadow: isDark
                ? "0 0 0 2px #050507, 0 20px 60px rgba(99,102,241,0.35)"
                : "0 0 0 2px #f8fafc, 0 12px 40px rgba(99,102,241,0.22), 0 4px 16px rgba(168,85,247,0.12)",
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
          />

          {/* Status badge */}
          <motion.div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap"
            initial={{ opacity: 0, y: 6 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold"
              style={{
                background: isDark ? "rgba(4,4,15,0.85)" : "rgba(255,255,255,0.92)",
                border: isDark ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(99,102,241,0.2)",
                backdropFilter: "blur(10px)",
                color: isDark ? "#a5b4fc" : "#4f46e5",
                boxShadow: isDark
                  ? "0 4px 16px rgba(99,102,241,0.2)"
                  : "0 4px 16px rgba(99,102,241,0.08)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                style={{ boxShadow: "0 0 5px rgba(52,211,153,0.8)" }}
              />
              Open to Work
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Main Hero section ────────────────────────────────────────────────────────
export default function Hero({ startAnimation = true }) {
  const [currentTitle, setCurrentTitle] = useState(0);
  const { theme } = useTheme();
  const isDark     = theme === "dark";
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!startAnimation) return;
    const iv = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3500);
    return () => clearInterval(iv);
  }, [startAnimation]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center scroll-mt-12 overflow-hidden"
    >
      {/* ── 3D canvas — dark mode only, fades out at bottom to blend with next section ── */}
      {!prefersReduced && isDark && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
          }}
        >
          <Suspense fallback={null}>
            <HeroScene isDark={isDark} />
          </Suspense>
        </div>
      )}

      {/* ── Light mode: CSS gradient mesh background ── */}
      {!isDark && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 15% 20%, rgba(99,102,241,0.09) 0%, transparent 60%),
              radial-gradient(ellipse 50% 40% at 85% 75%, rgba(168,85,247,0.08) 0%, transparent 55%),
              radial-gradient(ellipse 40% 35% at 70% 10%, rgba(56,189,248,0.06) 0%, transparent 50%)
            `,
          }}
        />
      )}

      {/* ── Dark mode: edge vignette only ── */}
      {isDark && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 30%, rgba(10,10,20,0.5) 100%)",
          }}
        />
      )}

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-16 items-center relative z-10">

        {/* ── Left Text ── */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate={startAnimation ? "show" : "hidden"}
        >
          {/* Greeting with typewriter */}
          <motion.p
            variants={itemVariants}
            className="text-indigo-600 dark:text-indigo-400 font-medium tracking-wide font-mono text-sm"
          >
            <TypedGreeting active={startAnimation} />
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-neutral-900 dark:text-white"
          >
            <GlitchText text="Sahil Sameer" active={startAnimation} />
            <br />
            <span className="bg-gradient-to-r from-indigo-950 via-indigo-600 to-purple-600 dark:from-white/90 dark:via-indigo-400 dark:to-purple-500 bg-clip-text text-transparent">
              <GlitchText text="Siddique" active={startAnimation} />
            </span>
          </motion.h1>

          {/* Rotating title */}
          <motion.div variants={itemVariants} className="h-9 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={titles[currentTitle]}
                className="text-lg md:text-xl font-semibold tracking-wide bg-gradient-to-r from-indigo-950 via-indigo-600 to-purple-700 dark:from-white/90 dark:via-indigo-500 dark:to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
                exit={{    opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
              >
                {titles[currentTitle]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-indigo-600 to-purple-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-500" />
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-neutral-600 dark:text-gray-400 max-w-lg leading-relaxed text-sm md:text-base"
          >
            I specialize in engineering robust backend architectures, optimizing
            complex databases, and building secure APIs. I turn ambitious ideas
            into scalable, production-ready platforms with seamless frontend and
            AI integrations.
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
                className="flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-200 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-800 dark:text-gray-200"
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
                className="flex items-center justify-center w-9 h-9 rounded-xl transition-colors duration-200 bg-[#0077B5]/10 border border-[#0077B5]/30 text-[#0077B5]"
              >
                <FaLinkedin size={17} />
              </motion.a>
            </Magnetic>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group btn-shimmer inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm bg-gradient-to-r from-indigo-600 to-violet-600 shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_4px_32px_rgba(99,102,241,0.5)] transition-shadow duration-300"
            >
              <span>View Projects</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.a>

            <motion.a
              href="/sahil-resume.pdf"
              download="sahil-resume.pdf"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
              </svg>
              <span>Resume</span>
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300 bg-transparent border border-transparent text-indigo-600 dark:text-indigo-300"
            >
              <span>Let's Connect</span>
              <span>→</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── Right: 3D tilting photo card ── */}
        <PhotoCard isDark={isDark} startAnimation={startAnimation} />
      </div>

      {/* ── Scroll-down arrow ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <motion.div
          className="flex flex-col items-center gap-1"
          animate={startAnimation ? { y: [0, 7, 0] } : {}}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-neutral-400 dark:text-gray-600">
            scroll
          </span>
          <svg
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth={2}
            strokeLinecap="round" strokeLinejoin="round"
            className="text-neutral-400 dark:text-gray-600"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
