import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";
import GlitchText from "../components/GlitchText";
import safar from "../assets/safar.png";
import prepstack from "../assets/prepstack.png";
import skillbridgeAI from "../assets/skillbridgeAI.png";

// ─── Project Data ─────────────────────────────────────────────────────────────
const projects = [
  {
    title: "PrepStack",
    tag: "SDE Prep Platform",
    featured: true,
    description:
      "A comprehensive preparation platform that structures and accelerates interview preparation workflows for software engineering candidates.",
    challenge: "Candidates navigate fragmented sheets, scattered concept repositories, and lack custom, high-fidelity mock project ideas.",
    solution: "Coded an automated DSA dashboard synced with React and MongoDB, coupled with a customized project idea engine running LLM-assisted generation.",
    impact: "Created an integrated study tracker saving candidates prep time by consolidating structured sheet progress and project mockups.",
    link: "https://prepstack-ss.vercel.app/",
    github: "https://github.com/SahilSameer18/prepstack",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    image: prepstack,
    accent: "#FFA116",
  },
  {
    title: "SkillBridgeAI",
    tag: "AI Career Analyzer",
    description:
      "An intelligent resume and skill-gap diagnostics platform mapping user profiles to modern software roles.",
    challenge: "Traditional technical prep is generic; candidates fail to identify concrete architectural and library knowledge gaps before coding assessments.",
    solution: "Designed a backend profiling system integrating Gemini AI models to map resume skills directly to SQL/NoSQL tech metrics, spinning up customized sample questions.",
    impact: "Accelerated skills matching and prep loops by offering instant tailored prep schedules and detailed answer analytics.",
    link: "https://skillbridgeai-s.vercel.app/",
    github: "https://github.com/SahilSameer18/skillbridgeAI",
    techStack: ["React", "PostgreSQL", "Prisma ORM", "Node", "Gemini AI"],
    image: skillbridgeAI,
    accent: "#4DB8D4",
  },
  {
    title: "SafarAI",
    tag: "AI Travel Planner",
    description:
      "A context-aware day-by-day travel itinerary scheduler adjusting to user budget, timing constraints, and interests.",
    challenge: "Constructing personalized travel schedules takes hours of manual aggregation across flight, hotel, and tourist logs.",
    solution: "Engineered a rapid responsive layout integrating Firebase cloud storage with prompt-engineered Gemini schemas to produce day itineraries.",
    impact: "Deploys complete customizable schedules in seconds under real-world testing conditions.",
    link: "https://www.safarai.in/",
    github: "https://github.com/SahilSameer18",
    techStack: ["React", "Tailwind CSS", "Firebase", "Gemini AI"],
    image: safar,
    accent: "#34d399",
  },
];

// ─── Accent Color Helper ───────────────────────────────────────────────────────
const getContrastAccent = (accent, theme) => {
  if (theme === "dark") return accent;
  if (accent === "#FFA116") return "#b45309";
  if (accent === "#4DB8D4") return "#0369a1";
  if (accent === "#34d399") return "#047857";
  return accent;
};

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -35 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.7 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 35 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.7 } },
};

// ─── Tech Badge ───────────────────────────────────────────────────────────────
const TechBadge = ({ tech, accent }) => {
  const { theme } = useTheme();
  const resolvedAccent = getContrastAccent(accent, theme);

  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-colors duration-300"
      style={{
        background: `${resolvedAccent}18`,
        border:     `1px solid ${resolvedAccent}35`,
        color:      resolvedAccent,
      }}
    >
      {tech}
    </span>
  );
};

// ─── Browser Frame Component ───────────────────────────────────────────────────
const BrowserFrame = ({ children, url, accent }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const resolvedAccent = getContrastAccent(accent, theme);

  return (
    <div 
      className="w-full rounded-2xl overflow-hidden flex flex-col border transition-all duration-300 group"
      style={{
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(99,102,241,0.12)",
        boxShadow: isDark 
          ? "0 24px 48px rgba(0,0,0,0.4)" 
          : "0 16px 32px rgba(99,102,241,0.06)",
      }}
    >
      {/* Top Header Bar */}
      <div 
        className="flex items-center gap-2 px-4 py-3 border-b select-none"
        style={{
          background: isDark ? "rgba(255,255,255,0.03)" : "rgba(99,102,241,0.03)",
          borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(99,102,241,0.08)",
        }}
      >
        {/* Controls dots */}
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        
        {/* Mock Search Input */}
        <div 
          className="mx-auto max-w-[14rem] sm:max-w-[18rem] w-full rounded-md px-3 py-1 text-[10px] font-mono text-center truncate transition-colors duration-300"
          style={{
            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.8)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(99,102,241,0.08)"}`,
            color: isDark ? "#64748b" : "#64748b",
          }}
        >
          {url}
        </div>
      </div>
      
      {/* Content wrapper */}
      <div className="bg-neutral-950/5 dark:bg-white/5 relative">
        {children}
      </div>
    </div>
  );
};

// ─── Single Project Card (with 3-D tilt) ─────────────────────────────────────
const ProjectCard = ({ project, idx }) => {
  const isEven         = idx % 2 === 0;
  const { theme }      = useTheme();
  const isDark         = theme === "dark";
  const resolvedAccent = getContrastAccent(project.accent, theme);
  const prefersReduced = useReducedMotion();

  // 3D tilt state
  const cardRef = useRef(null);
  const rafRef  = useRef(null);
  const [tilt,    setTilt]    = useState({ rotX: 0, rotY: 0, glowX: 50, glowY: 50 });
  const [hovered, setHovered] = useState(false);

  // rAF-throttled handler — max one update per frame
  const handleMouseMove = useCallback(
    (e) => {
      if (prefersReduced || !cardRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const dx   = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
        const dy   = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
        setTilt({
          rotX:  -dy * 3,
          rotY:   dx * 3,
          glowX: ((e.clientX - rect.left) / rect.width)  * 100,
          glowY: ((e.clientY - rect.top)  / rect.height) * 100,
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

  useEffect(
    () => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); },
    [],
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => {
        setHovered(true);
        if (!prefersReduced && cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          setTilt((prev) => ({
            ...prev,
            glowX: ((e.clientX - rect.left) / rect.width)  * 100,
            glowY: ((e.clientY - rect.top)  / rect.height) * 100,
          }));
        }
      }}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px" }}
    >
      {/* ── Scroll-reveal ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px" }}
      >
        {/* ── 3-D tilt ── */}
        <motion.div
          animate={prefersReduced ? {} : { rotateX: tilt.rotX, rotateY: tilt.rotY }}
          transition={{ type: "spring", stiffness: 200, damping: 22, mass: 0.4 }}
          style={{
            transformStyle: "preserve-3d",
            position: "relative",
            padding: "2rem 2.5rem",
            borderRadius: "1.5rem",
          }}
        >
          {/* Mobile accent header */}
          <div className="md:hidden flex items-center gap-3 mb-5">
            <div
              className="w-[3px] h-6 rounded-full flex-shrink-0"
              style={{
                background: `linear-gradient(180deg, ${resolvedAccent}, ${resolvedAccent}55)`,
              }}
            />
            <span
              className="text-xs font-mono tracking-[0.18em] font-bold"
              style={{ color: resolvedAccent }}
            >
              {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: `${resolvedAccent}99` }}
            >
              — {project.tag}
            </span>
          </div>

          {/* Card grid */}
          <div
            className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
              isEven ? "" : "md:grid-flow-dense"
            }`}
          >
            {/* Image side wrapped in BrowserFrame */}
            <motion.div
              className={`flex justify-center ${isEven ? "" : "md:col-start-2"}`}
              variants={isEven ? fadeLeft : fadeRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px" }}
              whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            >
              <div className="relative w-full max-w-md">
                <div
                  className="absolute -inset-3 rounded-3xl blur-2xl -z-10 opacity-10 group-hover:opacity-20 transition-all duration-500"
                  style={{ background: resolvedAccent }}
                />
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <BrowserFrame url={project.link.replace("https://", "")} accent={project.accent}>
                    <img
                      src={project.image}
                      alt={`${project.title} project screenshot`}
                      className="w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                      loading="lazy"
                      decoding="async"
                    />
                  </BrowserFrame>
                </a>
              </div>
            </motion.div>

            {/* Content side - Case Study breakdown */}
            <motion.div
              className={`space-y-5 ${isEven ? "" : "md:col-start-1 md:row-start-1"}`}
              variants={isEven ? fadeRight : fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px" }}
            >
              {/* Project number */}
              <p className="text-xs font-mono tracking-widest text-neutral-400 dark:text-gray-600">
                {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </p>

              {/* Tag + Featured badge */}
              <div className="flex items-center gap-3 flex-wrap">
                <p
                  className="text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
                  style={{ color: resolvedAccent }}
                >
                  {project.tag}
                </p>
                {project.featured && (
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{
                      background: isDark ? "rgba(245,158,11,0.15)" : "rgba(245,158,11,0.10)",
                      border: "1px solid rgba(245,158,11,0.35)",
                      color: isDark ? "#fbbf24" : "#b45309",
                    }}
                  >
                    ⭐ Featured
                  </span>
                )}
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white leading-tight transition-colors duration-300">
                {project.title}
              </h3>

              <div
                className="w-12 h-0.5 rounded-full transition-colors duration-300"
                style={{ background: resolvedAccent }}
              />

              <p className="text-neutral-600 dark:text-gray-400 leading-relaxed text-sm md:text-base transition-colors duration-300 font-medium">
                {project.description}
              </p>

              {/* Case Study Details */}
              <div className="space-y-3 pt-1 text-xs md:text-sm">
                <div>
                  <span className="font-bold text-neutral-800 dark:text-gray-200 uppercase tracking-wider text-[10px] block mb-0.5">Challenge</span>
                  <span className="text-neutral-600 dark:text-gray-400 leading-relaxed">{project.challenge}</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-800 dark:text-gray-200 uppercase tracking-wider text-[10px] block mb-0.5">Solution</span>
                  <span className="text-neutral-600 dark:text-gray-400 leading-relaxed">{project.solution}</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-800 dark:text-gray-200 uppercase tracking-wider text-[10px] block mb-0.5">Impact</span>
                  <span className="text-neutral-600 dark:text-gray-400 leading-relaxed">{project.impact}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {project.techStack.map((tech) => (
                  <TechBadge key={tech} tech={tech} accent={project.accent} />
                ))}
              </div>

              <div className="flex items-center gap-4 pt-3">
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{
                    background: isDark ? `${resolvedAccent}20` : resolvedAccent,
                    border:     `1px solid ${resolvedAccent}50`,
                    color:      isDark ? resolvedAccent : "#ffffff",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark ? `${resolvedAccent}35` : `${resolvedAccent}ee`;
                    e.currentTarget.style.boxShadow  = `0 0 20px ${resolvedAccent}${isDark ? "30" : "20"}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isDark ? `${resolvedAccent}20` : resolvedAccent;
                    e.currentTarget.style.boxShadow  = "none";
                  }}
                >
                  <HiOutlineExternalLink className="text-base" />
                  Live Demo
                </motion.a>

                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                  style={{
                    background:     isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)",
                    border:         `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(99,102,241,0.22)"}`,
                    backdropFilter: "blur(8px)",
                    color:          isDark ? "#9ca3af" : "#374151",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.85)";
                    e.currentTarget.style.color      = isDark ? "#ffffff" : "#111827";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)";
                    e.currentTarget.style.color      = isDark ? "#9ca3af" : "#374151";
                  }}
                >
                  <FaGithub className="text-base" />
                  GitHub
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Spotlight — only the area around the cursor glows */}
          {!prefersReduced && (
            <div
              aria-hidden="true"
              style={{
                position:      "absolute",
                inset:         0,
                borderRadius:  "1.5rem",
                pointerEvents: "none",
                background:    `radial-gradient(circle 200px at ${tilt.glowX}% ${tilt.glowY}%, rgba(255,255,255,${
                  isDark ? "0.10" : "0.22"
                }) 0%, transparent 100%)`,
                opacity:       hovered ? 1 : 0,
                transition:    "opacity 0.25s ease",
              }}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

// ─── Main Projects Section ────────────────────────────────────────────────────
export default function Projects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="projects" className="min-h-screen flex flex-col scroll-mt-12">

      {/* Section Heading */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "0px" }}
      >
        <h2
          className="text-5xl md:text-6xl font-bold mb-4"
          style={{
            background:           "linear-gradient(135deg, var(--heading-grad-start) 0%, var(--heading-grad-mid) 50%, var(--heading-grad-end) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor:  "transparent",
            backgroundClip:       "text",
          }}
        >
          <GlitchText text="My Projects" />
        </h2>
        <p className="text-neutral-500 text-xs uppercase tracking-widest mb-5">
          Things I've built
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-500/50" />
        </div>
      </motion.div>

      {/* Project Cards */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-24">
        {projects.map((project, idx) => (
          <ProjectCard key={project.title} project={project} idx={idx} />
        ))}
      </div>

      {/* GitHub CTA */}
      <motion.div
        className="flex flex-col items-center mt-20 gap-4 text-center"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "0px" }}
      >
        <p className="text-neutral-500 dark:text-gray-400 text-sm">
          Explore more projects and open-source contributions on my GitHub
        </p>

        <motion.a
          href="https://github.com/SahilSameer18"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-sm transition-all duration-300"
          style={{
            background:     isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)",
            border:         `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(99,102,241,0.25)"}`,
            backdropFilter: "blur(10px)",
            color:          isDark ? "#e5e7eb" : "#1f2937",
            boxShadow:      isDark ? "none" : "0 2px 12px rgba(99,102,241,0.08)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.85)";
            e.currentTarget.style.boxShadow  = isDark ? "0 0 24px rgba(99,102,241,0.25)" : "0 0 24px rgba(99,102,241,0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)";
            e.currentTarget.style.boxShadow  = isDark ? "none" : "0 2px 12px rgba(99,102,241,0.08)";
          }}
        >
          <FaGithub className="text-lg" />
          See More on GitHub
        </motion.a>
      </motion.div>

    </section>
  );
}
