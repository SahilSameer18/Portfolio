import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import ais from "../assets/about2.png";
import { useCountUp } from "../hooks/useCountUp";
import GlitchText from "../components/GlitchText";
import { aboutStats, aboutPassions } from "../constants/about.data";

// Splits "5+" → { num: 5, suffix: "+" } etc.
function parseStat(value) {
  const num = parseInt(value, 10);
  return { num, suffix: value.replace(String(num), "") };
}

function StatItem({ stat }) {
  const { num, suffix } = parseStat(stat.value);
  const { count, ref }  = useCountUp(num, 1.6);

  return (
    <div ref={ref}>
      <p
        className="text-2xl md:text-3xl font-bold leading-none"
        style={{
          background: "linear-gradient(135deg, var(--heading-grad-start) 0%, var(--heading-grad-mid) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {count}{suffix}
      </p>
      <p className="text-xs text-neutral-500 dark:text-gray-500 mt-1.5 leading-snug">
        {stat.label}
      </p>
    </div>
  );
}

// ─── Optimized 3D Tilt Card Wrapper ───────────────────────────────────────────
function TiltCard({ children, className = "", delay = 0, innerClass = "justify-between" }) {
  const cardRef        = useRef(null);
  const glowRef        = useRef(null);
  const rafRef         = useRef(null);
  const prefersReduced = useReducedMotion();
  const { theme }      = useTheme();
  const isDark         = theme === "dark";

  const rotX           = useMotionValue(0);
  const rotY           = useMotionValue(0);
  const springX        = useSpring(rotX, { stiffness: 220, damping: 20, mass: 0.4 });
  const springY        = useSpring(rotY, { stiffness: 220, damping: 20, mass: 0.4 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (prefersReduced || !cardRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const dx   = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
      const dy   = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);

      rotX.set(-dy * 5); // 5 deg max tilt
      rotY.set(dx * 5);

      if (glowRef.current) {
        const glowX = ((e.clientX - rect.left) / rect.width) * 100;
        const glowY = ((e.clientY - rect.top) / rect.height) * 100;
        glowRef.current.style.setProperty("--glow-x", `${glowX}%`);
        glowRef.current.style.setProperty("--glow-y", `${glowY}%`);
      }
    });
  }, [prefersReduced, rotX, rotY]);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rotX.set(0);
    rotY.set(0);
    setIsHovered(false);
  }, [rotX, rotY]);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
      className={className}
    >
      <motion.div
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full rounded-2xl"
      >
        {/* Spotlight cursor glow */}
        {isHovered && !prefersReduced && (
          <div
            ref={glowRef}
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 180px at var(--glow-x, 50%) var(--glow-y, 50%), ${
                isDark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.07)"
              } 0%, transparent 80%)`,
              zIndex: 0,
            }}
          />
        )}
        <div className={`relative z-10 h-full flex flex-col ${innerClass}`}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="about" className="min-h-screen py-24 scroll-mt-12 relative overflow-hidden">
      {/* Subtle 3D background accent */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        aria-hidden="true"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(99,102,241,0.06) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 20% 80%, rgba(168,85,247,0.05) 0%, transparent 55%)"
            : "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(99,102,241,0.05) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 20% 80%, rgba(168,85,247,0.04) 0%, transparent 55%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-16">
        
        {/* Heading */}
        <div className="text-center md:text-left">
          <h2
            className="text-5xl md:text-6xl font-bold text-gradient-heading"
          >
            <GlitchText text="About Me" />
          </h2>
          <div className="flex items-center gap-3 mt-3 justify-center md:justify-start">
            <div className="h-px w-12 bg-indigo-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
          
          {/* Card 1: Bio Story (Col Span 2) */}
          <TiltCard
            className="col-span-1 md:col-span-2 p-6 md:p-8 rounded-2xl bg-white/70 dark:bg-white/5 border border-neutral-200 dark:border-white/10 shadow-sm transition-all duration-300 hover:border-indigo-500/30 dark:hover:border-indigo-500/40"
            delay={0}
          >
            <div className="space-y-4">
              <div>
                <motion.span
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider cursor-default"
                  style={{
                    background: isDark ? "rgba(99,102,241,0.12)" : "rgba(238,242,255,0.95)",
                    border: isDark ? "1px solid rgba(99,102,241,0.32)" : "1px solid rgba(199,210,254,0.75)",
                    color: isDark ? "#a5b4fc" : "#4338ca",
                  }}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
                  </span>
                  Open to Opportunities
                </motion.span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
                Engineering Scalable Systems & AI-Driven User Experiences
              </h3>

              <p className="text-sm md:text-base text-neutral-600 dark:text-gray-400 leading-relaxed">
                I am a backend-focused full stack developer who loves architecting scalable server-side systems, optimizing complex databases, and designing secure, high-performance APIs. I thrive on turning complex logic into robust, production-ready platforms.
              </p>

              <p className="text-sm md:text-base text-neutral-600 dark:text-gray-400 leading-relaxed">
                My technical specialties lie in optimizing REST APIs, advanced JWT authentication structures, and modeling relational databases for maximum efficiency. While my heart is in the backend, I pair this structural robustness with highly interactive React interfaces to deliver a complete, seamless user experience.
              </p>
            </div>

            <div className="pt-4">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300"
                style={{
                  background: isDark ? "rgba(99,102,241,0.14)" : "rgba(99,102,241,0.08)",
                  border: "1px solid rgba(99,102,241,0.25)",
                  color: isDark ? "#a5b4fc" : "#4f46e5",
                  willChange: "transform",
                }}
              >
                Explore My Work
                <span>→</span>
              </motion.a>
            </div>
          </TiltCard>

          {/* Card 2: Self Portrait (Col Span 1, Row Span 2 on Desktop) */}
          <TiltCard
            className="col-span-1 md:row-span-2 p-6 rounded-2xl bg-white/70 dark:bg-white/5 border border-neutral-200 dark:border-white/10 shadow-sm relative overflow-hidden transition-all duration-300 hover:border-indigo-500/30 dark:hover:border-indigo-500/40"
            innerClass="items-center justify-center space-y-6"
            delay={0.1}
          >
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-indigo-500/40 rounded-tl-lg pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-indigo-500/40 rounded-br-lg pointer-events-none" />

            <motion.div
              className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden group"
              style={{
                border: "1px solid rgba(99,102,241,0.25)",
                boxShadow: isDark ? "0 8px 32px rgba(99,102,241,0.20)" : "0 8px 32px rgba(99,102,241,0.10)",
                willChange: "transform",
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.04 }}
            >
              <img
                src={ais}
                alt="Sahil Sameer Siddique portrait"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="eager"
                decoding="async"
              />
            </motion.div>

            <div className="text-center space-y-1">
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                Sahil Sameer Siddique
              </h4>
              <p className="text-xs text-neutral-500 dark:text-gray-500 uppercase tracking-widest">
                Delhi, India
              </p>
            </div>
          </TiltCard>

          {/* Card 3: Credibility Stats (Col Span 1) */}
          <TiltCard
            className="col-span-1 p-6 rounded-2xl bg-white/70 dark:bg-white/5 border border-neutral-200 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-4 transition-all duration-300 hover:border-indigo-500/30 dark:hover:border-indigo-500/40"
            delay={0.15}
          >
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-gray-500">
              Credibility & Impact
            </h4>
            <motion.div 
              className="flex flex-col gap-5"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {aboutStats.map((stat) => (
                <motion.div 
                  key={stat.label} 
                  className="border-l-2 border-indigo-500/30 pl-4 py-0.5"
                  variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.4 } } }}
                >
                  <StatItem stat={stat} />
                </motion.div>
              ))}
            </motion.div>
          </TiltCard>

          {/* Card 4: Core Architectural Focus (Col Span 1) */}
          <TiltCard
            className="col-span-1 p-6 rounded-2xl bg-white/70 dark:bg-white/5 border border-neutral-200 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-4 transition-all duration-300 hover:border-indigo-500/30 dark:hover:border-indigo-500/40"
            delay={0.2}
          >
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-gray-500">
              Architectural Focus
            </h4>
            <motion.div 
              className="grid grid-cols-2 gap-2"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {aboutPassions.map(({ icon, label }) => (
                <motion.div
                  key={label}
                  variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300 } } }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col p-3 rounded-xl border border-neutral-200/50 dark:border-white/5 bg-neutral-500/5 hover:border-indigo-500/30 transition-colors duration-300"
                >
                  <span className="text-lg mb-1.5">{icon}</span>
                  <span className="text-[10px] md:text-xs font-semibold text-neutral-800 dark:text-gray-300 leading-snug">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </TiltCard>

        </div>
      </div>
    </section>
  );
}
