import { useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";
import GlitchText from "../components/GlitchText";

// ─── Education Data ───────────────────────────────────────────────────────────
const educationData = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    duration: "2021 – 2025",
    institution: "International Institute of Technology and Management, Sonipat",
    location: "Sonipat, Haryana",
    type: "Undergraduate",
    year: "2025",
    // cgpa: "8.5 / 10",
    accent: "#6366f1",
    accentMid: "#a5b4fc",
    highlights: ["Data Structures & Algorithms", "Database Management", "Full Stack Web Dev"],
  },
  {
    degree: "Senior Secondary (Class XII - Science)",
    duration: "2018 – 2020",
    institution: "Dr Zakir Hussain High School, Patna",
    location: "Patna, Bihar",
    type: "Senior Secondary",
    year: "2020",
    // cgpa: "78%",
    accent: "#9333ea",
    accentMid: "#c084fc",
    highlights: ["Physics", "Chemistry", "Mathematics"],
  },
];

// ─── Single Education Card ────────────────────────────────────────────────────
function EducationCard({ edu, index }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const prefersReduced = useReducedMotion();
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, glowX: 50, glowY: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e) => {
      if (prefersReduced || !cardRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        setTilt({
          rotX: -dy * 5,
          rotY: dx * 5,
          glowX: ((e.clientX - rect.left) / rect.width) * 100,
          glowY: ((e.clientY - rect.top) / rect.height) * 100,
        });
      });
    },
    [prefersReduced],
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setTilt((prev) => ({ ...prev, rotX: 0, rotY: 0 }));
    setHovered(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "0px" }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => {
        setHovered(true);
        if (!prefersReduced && cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          setTilt((prev) => ({
            ...prev,
            glowX: ((e.clientX - rect.left) / rect.width) * 100,
            glowY: ((e.clientY - rect.top) / rect.height) * 100,
          }));
        }
      }}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        animate={prefersReduced ? {} : { rotateX: tilt.rotX, rotateY: tilt.rotY }}
        transition={{ type: "spring", stiffness: 200, damping: 22, mass: 0.4 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative rounded-2xl p-6 md:p-7 transition-[box-shadow,border-color] duration-400"
        // ─── Card shell ───
        // Box-shadow and border change on hover; background stays stable
        // so gradient text always renders correctly regardless of theme.
      >
        {/* ── Mobile-only left accent border ── */}
        <div
          aria-hidden="true"
          className="md:hidden absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full pointer-events-none"
          style={{ background: `linear-gradient(180deg, ${edu.accent}, ${edu.accent}55)`, zIndex: 2 }}
        />

        {/* ── Ghost year watermark — z:1 sits above glass bg (z:0) but below content (z:10) ── */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-2 select-none pointer-events-none font-black leading-none"
          style={{
            fontSize: "clamp(5.5rem, 12vw, 7.5rem)",
            color: isDark ? `${edu.accent}28` : `${edu.accent}20`,
            letterSpacing: "-0.05em",
            zIndex: 1,
          }}
        >
          {edu.year}
        </div>

        {/* ── Background layer ── */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            zIndex: 0,
            background: isDark
              ? "rgba(255,255,255,0.03)"
              : "rgba(255,255,255,0.72)",
            border: `1px solid ${
              hovered
                ? isDark ? `${edu.accent}60` : `${edu.accent}45`
                : isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.90)"
            }`,
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow: hovered
              ? isDark
                ? `0 8px 40px ${edu.accent}28, 0 0 0 1px ${edu.accent}30`
                : `0 8px 40px ${edu.accent}20, 0 2px 12px ${edu.accent}14, inset 0 1px 0 rgba(255,255,255,1)`
              : isDark
                ? "0 2px 16px rgba(0,0,0,0.30)"
                : "0 4px 20px rgba(99,102,241,0.09), inset 0 1px 0 rgba(255,255,255,0.85)",
            transition: "box-shadow 0.35s ease, border-color 0.35s ease",
          }}
        />

        {/* ── Cursor spotlight ── */}
        {hovered && !prefersReduced && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, ${edu.accent}14 0%, transparent 65%)`,
            }}
          />
        )}

        {/* ── Content ── */}
        <div className="relative z-10 space-y-4">

          {/* Top row: icon + type badge */}
          <div className="flex items-center justify-between gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: isDark ? `${edu.accent}20` : `${edu.accent}14`,
                border: `1px solid ${edu.accent}40`,
              }}
            >
              <FaGraduationCap
                style={{ color: isDark ? edu.accentMid : edu.accent, fontSize: "17px" }}
              />
            </div>

            <span
              className="text-[10px] font-bold uppercase tracking-[0.17em] px-3 py-1 rounded-full"
              style={{
                background: isDark ? `${edu.accent}16` : `${edu.accent}10`,
                border: `1px solid ${edu.accent}35`,
                color: isDark ? edu.accentMid : edu.accent,
              }}
            >
              {edu.type}
            </span>
          </div>

          {/* Degree title — solid color for reliable rendering in both themes */}
          <h3
            className="text-base md:text-lg font-bold leading-snug"
            style={{ color: isDark ? "#f1f5f9" : "#1e1b4b" }}
          >
            {edu.degree}
          </h3>

          {/* CGPA / Percentage badge */}
          {edu.cgpa && (
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md"
              style={{
                background: isDark ? `${edu.accent}18` : `${edu.accent}10`,
                border: `1px solid ${edu.accent}35`,
                color: isDark ? edu.accentMid : edu.accent,
              }}
            >
              🎓 {edu.cgpa}
            </span>
          )}

          {/* Institution */}
          <p
            className="text-sm leading-relaxed"
            style={{ color: isDark ? "#94a3b8" : "#475569" }}
          >
            {edu.institution}
          </p>

          {/* Accent divider */}
          <div
            className="h-px"
            style={{
              background: `linear-gradient(90deg, ${edu.accent}40, transparent)`,
            }}
          />

          {/* Meta: date + location */}
          <div className="flex flex-wrap items-center gap-5">
            <span
              className="flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: isDark ? edu.accentMid : edu.accent }}
            >
              <FaCalendarAlt style={{ fontSize: "10px" }} />
              {edu.duration}
            </span>
            <span
              className="flex items-center gap-1.5 text-xs"
              style={{ color: isDark ? "#64748b" : "#6b7280" }}
            >
              <FaMapMarkerAlt style={{ fontSize: "10px" }} />
              {edu.location}
            </span>
          </div>

          {/* Subject chips */}
          <div className="flex flex-wrap gap-2 pt-0.5">
            {edu.highlights.map((h) => (
              <span
                key={h}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg"
                style={{
                  background: isDark ? "rgba(255,255,255,0.05)" : "rgba(99,102,241,0.06)",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.07)"
                    : "1px solid rgba(99,102,241,0.13)",
                  color: isDark ? "#94a3b8" : "#4338ca",
                }}
              >
                {h}
              </span>
            ))}
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Timeline Node (desktop only) ─────────────────────────────────────────────
function TimelineNode({ edu, index }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 54, height: 54,
          background: `${edu.accent}10`,
          border: `1px solid ${edu.accent}28`,
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.9, ease: "easeInOut" }}
      />
      {/* Icon circle */}
      <div
        className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center"
        style={{
          background: isDark
            ? `linear-gradient(135deg, ${edu.accent}22, ${edu.accentMid}16)`
            : `linear-gradient(135deg, ${edu.accent}16, ${edu.accentMid}10)`,
          border: `1.5px solid ${edu.accent}50`,
          boxShadow: `0 0 20px ${edu.accent}28`,
        }}
      >
        <HiAcademicCap style={{ color: isDark ? edu.accentMid : edu.accent, fontSize: "18px" }} />
      </div>
    </div>
  );
}

// ─── Education Section ────────────────────────────────────────────────────────
export default function Education() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="education" className="py-20 md:py-28 scroll-mt-12">
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* ── Heading ── */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "0px" }}
        >
          <p className="text-neutral-500 text-xs uppercase tracking-[0.22em] mb-4">
            Academic Journey
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold mb-5"
            style={{
              background: "linear-gradient(135deg, var(--heading-grad-start) 0%, var(--heading-grad-mid) 50%, var(--heading-grad-end) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <GlitchText text="Education" />
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-500/50" />
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════
            MOBILE LAYOUT — single column, one card each, no grid
            ════════════════════════════════════════════════════════ */}
        <div className="md:hidden space-y-8">
          {educationData.map((edu, index) => (
            <EducationCard key={index} edu={edu} index={index} />
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════
            DESKTOP LAYOUT — alternating two-column with timeline
            ════════════════════════════════════════════════════════ */}
        <div className="hidden md:block">

          {/* Animated vertical line */}
          <div className="relative">
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px overflow-hidden"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: isDark
                    ? "linear-gradient(180deg, rgba(99,102,241,0.30) 0%, rgba(147,51,234,0.22) 100%)"
                    : "linear-gradient(180deg, rgba(99,102,241,0.22) 0%, rgba(147,51,234,0.18) 100%)",
                }}
              />
              <motion.div
                className="absolute left-0 right-0"
                style={{
                  height: "38%",
                  background: isDark
                    ? "linear-gradient(180deg, transparent, rgba(139,92,246,0.75), transparent)"
                    : "linear-gradient(180deg, transparent, rgba(99,102,241,0.55), transparent)",
                }}
                animate={{ top: ["-38%", "105%"] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Cards */}
            <div className="space-y-20">
              {educationData.map((edu, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-0"
                  >
                    {/* Left column */}
                    <div className="pr-10">
                      {isLeft && <EducationCard edu={edu} index={index} />}
                    </div>

                    {/* Center node */}
                    <div className="w-20 flex items-center justify-center">
                      <TimelineNode edu={edu} index={index} />
                    </div>

                    {/* Right column */}
                    <div className="pl-10">
                      {!isLeft && <EducationCard edu={edu} index={index} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

