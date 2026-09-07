import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";
import GlitchText from "../components/GlitchText";
import ApiConsole from "../components/ApiConsole";
import ArchitectureSpecViewer from "../components/ArchitectureSpecViewer";
import { projectsData as projects } from "../constants/projects.data";

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
    <motion.span
      variants={{
        hidden: { opacity: 0, scale: 0.8, y: 10 },
        show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-colors duration-300 cursor-default inline-block"
      style={{
        background: `${resolvedAccent}18`,
        border:     `1px solid ${resolvedAccent}35`,
        color:      resolvedAccent,
      }}
    >
      {tech}
    </motion.span>
  );
};

// ─── Browser Frame Component ───────────────────────────────────────────────────
const BrowserFrame = ({ children, url }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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

// ─── Single Project Card ──────────────────────────────────────────────────────
const ProjectCard = ({ project, idx }) => {
  const isEven         = idx % 2 === 0;
  const { theme }      = useTheme();
  const isDark         = theme === "dark";
  const resolvedAccent = getContrastAccent(project.accent, theme);
  const prefersReduced = useReducedMotion();

  const [viewMode, setViewMode] = useState("overview"); // "overview" | "architecture"
  const [mobileArchTab, setMobileArchTab] = useState("api"); // "api" | "specs"
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(
        window.innerWidth < 768 ||
        window.matchMedia("(hover: none), (pointer: coarse)").matches
      );
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="w-full max-w-full min-w-0">
      {/* ── Scroll-reveal ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px" }}
        className="w-full max-w-full min-w-0"
      >
        {/* ── Card Container ── */}
        <motion.div
          whileHover={prefersReduced ? undefined : { y: -4 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            position: "relative",
          }}
          className="bg-white/40 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/10 backdrop-blur-md transition-shadow duration-300 hover:shadow-xl p-3.5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl w-full max-w-full min-w-0 overflow-hidden"
        >
          {/* Top Bar: Meta + View Mode Switcher */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-4 mb-6 md:mb-8 border-b w-full"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(99,102,241,0.12)",
            }}
          >
            {/* Project Index & Tag */}
            <div className="flex items-center justify-between sm:justify-start gap-2.5">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-[3px] h-5 sm:h-6 rounded-full flex-shrink-0"
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
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-neutral-600 dark:text-gray-400 truncate max-w-[170px] sm:max-w-none">
                  — {project.tag}
                </span>
              </div>
              {project.featured && (
                <span
                  className="inline-flex items-center gap-1 text-[9.5px] sm:text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0"
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

            {/* View Mode Toggle Pill */}
            <div
              className="inline-flex p-1 rounded-xl border select-none transition-colors w-full sm:w-auto"
              style={{
                borderColor: isDark ? "rgba(255,255,255,0.10)" : "rgba(99,102,241,0.20)",
                background: isDark ? "rgba(0,0,0,0.35)" : "rgba(241,245,249,0.85)",
              }}
            >
              <button
                onClick={() => toggleViewMode("overview")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer min-h-[32px] ${
                  viewMode === "overview"
                    ? isDark
                      ? "bg-white/15 text-white shadow-sm border border-white/10"
                      : "bg-white text-neutral-900 shadow-sm border border-indigo-200"
                    : "text-neutral-500 dark:text-gray-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <span>🖥️</span>
                <span>UI Preview</span>
              </button>
              <button
                onClick={() => toggleViewMode("architecture")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer min-h-[32px] ${
                  viewMode === "architecture"
                    ? "bg-indigo-600 text-white shadow-sm font-bold"
                    : "text-neutral-500 dark:text-gray-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Backend &amp; APIs</span>
              </button>
            </div>
          </div>

          {/* ── VIEW MODE 1: UI OVERVIEW ── */}
          {viewMode === "overview" && (
            <div
              className={`grid md:grid-cols-2 gap-8 md:gap-14 items-center w-full min-w-0 ${
                isEven ? "" : "md:grid-flow-dense"
              }`}
            >
              {/* Media Side (BrowserFrame) */}
              <motion.div
                className={`flex justify-center w-full min-w-0 max-w-full ${isEven ? "" : "md:col-start-2"}`}
                variants={isEven ? fadeLeft : fadeRight}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px" }}
              >
                <div className="relative w-full max-w-md mx-auto min-w-0">
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
                    <motion.div
                      whileHover={prefersReduced ? undefined : { y: -4 }}
                      transition={{ duration: 0.25 }}
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
                    </motion.div>
                  </a>
                </div>
              </motion.div>

              {/* Content Side (Case Study) */}
              <motion.div
                className={`w-full min-w-0 max-w-full space-y-4 sm:space-y-5 ${isEven ? "" : "md:col-start-1 md:row-start-1"}`}
                variants={isEven ? fadeRight : fadeLeft}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px" }}
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white leading-tight transition-colors duration-300">
                  {project.title}
                </h3>

                <div
                  className="w-12 h-0.5 rounded-full transition-colors duration-300"
                  style={{ background: resolvedAccent }}
                />

                <p className="text-neutral-600 dark:text-gray-400 leading-relaxed text-xs sm:text-sm md:text-base transition-colors duration-300 font-medium">
                  {project.description}
                </p>

                {/* Case Study Details */}
                <div className="space-y-2.5 pt-1 text-xs md:text-sm">
                  <div>
                    <span className="font-bold text-neutral-800 dark:text-gray-200 uppercase tracking-wider text-[10px] block mb-0.5">
                      Challenge
                    </span>
                    <span className="text-neutral-600 dark:text-gray-400 leading-relaxed text-[11.5px] sm:text-xs">
                      {project.challenge}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-800 dark:text-gray-200 uppercase tracking-wider text-[10px] block mb-0.5">
                      Solution
                    </span>
                    <span className="text-neutral-600 dark:text-gray-400 leading-relaxed text-[11.5px] sm:text-xs">
                      {project.solution}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-800 dark:text-gray-200 uppercase tracking-wider text-[10px] block mb-0.5">
                      Impact
                    </span>
                    <span className="text-neutral-600 dark:text-gray-400 leading-relaxed text-[11.5px] sm:text-xs">
                      {project.impact}
                    </span>
                  </div>
                </div>

                {/* Quick Trigger to Backend Specs */}
                <button
                  onClick={() => toggleViewMode("architecture")}
                  className="w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl text-xs transition-all cursor-pointer text-left group gap-2"
                  style={{
                    background: isDark ? "rgba(99,102,241,0.09)" : "rgba(238,242,255,0.85)",
                    border: isDark ? "1px solid rgba(99,102,241,0.25)" : "1px solid rgba(199,210,254,0.85)",
                  }}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-sm shrink-0">⚡</span>
                    <span className="font-semibold text-neutral-800 dark:text-gray-200 truncate text-[11px] sm:text-xs">
                      Backend Proofs: {project.apiEndpoints?.length || 3} Endpoints &amp; DB Specs
                    </span>
                  </div>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center shrink-0 text-[11px] sm:text-xs">
                    Inspect &rarr;
                  </span>
                </button>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                  {project.techStack.map((tech) => (
                    <TechBadge key={tech} tech={tech} accent={project.accent} />
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-2 flex-wrap">
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300"
                    style={{
                      background: isDark ? `${resolvedAccent}20` : resolvedAccent,
                      border:     `1px solid ${resolvedAccent}50`,
                      color:      isDark ? resolvedAccent : "#ffffff",
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
                    className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300"
                    style={{
                      background:     isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)",
                      border:         `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(99,102,241,0.22)"}`,
                      backdropFilter: "blur(8px)",
                      color:          isDark ? "#9ca3af" : "#374151",
                    }}
                  >
                    <FaGithub className="text-base" />
                    GitHub
                  </motion.a>
                </div>
              </motion.div>
            </div>
          )}

          {/* ── VIEW MODE 2: BACKEND ARCHITECTURE & APIS ── */}
          {viewMode === "architecture" && (
            <div className="w-full min-w-0 max-w-full space-y-4">
              {/* Mobile sub-switcher (< md screens only) */}
              <div
                className="md:hidden flex p-1 rounded-xl border select-none w-full"
                style={{
                  borderColor: isDark ? "rgba(255,255,255,0.10)" : "rgba(99,102,241,0.20)",
                  background: isDark ? "rgba(0,0,0,0.35)" : "rgba(241,245,249,0.85)",
                }}
              >
                <button
                  onClick={() => setMobileArchTab("api")}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                    mobileArchTab === "api"
                      ? "bg-indigo-600 text-white shadow-sm font-bold"
                      : "text-neutral-500 dark:text-gray-400"
                  }`}
                >
                  ⚡ API Endpoints
                </button>
                <button
                  onClick={() => setMobileArchTab("specs")}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                    mobileArchTab === "specs"
                      ? "bg-indigo-600 text-white shadow-sm font-bold"
                      : "text-neutral-500 dark:text-gray-400"
                  }`}
                >
                  🗄️ Architecture Specs
                </button>
              </div>

              {/* Responsive Grid: Side-by-side on desktop, single tab active on mobile */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start w-full min-w-0">
                {/* Column 1: API Console */}
                <div
                  className={`w-full min-w-0 max-w-full ${
                    mobileArchTab === "api" ? "block" : "hidden md:block"
                  }`}
                >
                  <ApiConsole
                    endpoints={project.apiEndpoints}
                    accent={project.accent}
                  />
                </div>

                {/* Column 2: Architecture Spec Viewer */}
                <div
                  className={`w-full min-w-0 max-w-full space-y-4 ${
                    mobileArchTab === "specs" ? "block" : "hidden md:block"
                  }`}
                >
                  <div>
                    <span
                      className="text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase"
                      style={{ color: resolvedAccent }}
                    >
                      Backend Engineering Blueprint
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white leading-tight mt-0.5">
                      {project.title} Architecture
                    </h3>
                  </div>

                  <div
                    className="w-12 h-0.5 rounded-full transition-colors duration-300"
                    style={{ background: resolvedAccent }}
                  />

                  {/* Architecture Spec Viewer */}
                  <ArchitectureSpecViewer
                    backendSpecs={project.backendSpecs}
                    architectureSummary={project.architectureSummary}
                    accent={project.accent}
                  />

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                    {project.techStack.map((tech) => (
                      <TechBadge key={tech} tech={tech} accent={project.accent} />
                    ))}
                  </div>

                  <div className="flex items-center gap-2.5 pt-2 flex-wrap">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300"
                      style={{
                        background: isDark ? `${resolvedAccent}20` : resolvedAccent,
                        border:     `1px solid ${resolvedAccent}50`,
                        color:      isDark ? resolvedAccent : "#ffffff",
                      }}
                    >
                      <FaGithub className="text-sm" />
                      Backend on GitHub
                    </motion.a>

                    <button
                      onClick={() => toggleViewMode("overview")}
                      className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-medium border text-neutral-600 dark:text-gray-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                      style={{
                        borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(99,102,241,0.2)",
                        background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.6)",
                      }}
                    >
                      <span>🖥️</span>
                      <span>Switch to UI Preview</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
    <section id="projects" className="min-h-screen flex flex-col scroll-mt-20 px-3 sm:px-6 md:px-12 lg:px-20 py-16 md:py-24">

      {/* Section Heading */}
      <motion.div
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "0px" }}
      >
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 md:mb-4 text-gradient-heading"
        >
          <GlitchText text="My Projects" />
        </h2>
        <p className="text-neutral-500 text-xs uppercase tracking-widest mb-4 md:mb-5">
          Things I've built
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-500/50" />
        </div>
      </motion.div>

      {/* Project Cards */}
      <div className="max-w-6xl mx-auto w-full space-y-12 md:space-y-20">
        {projects.map((project, idx) => (
          <ProjectCard key={project.title} project={project} idx={idx} />
        ))}
      </div>

      {/* GitHub CTA */}
      <motion.div
        className="flex flex-col items-center mt-16 md:mt-20 gap-4 text-center px-4"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "0px" }}
      >
        <p className="text-neutral-500 dark:text-gray-400 text-xs sm:text-sm">
          Explore more projects and open-source contributions on my GitHub
        </p>

        <motion.a
          href="https://github.com/SahilSameer18"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300"
          style={{
            background:     isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)",
            border:         `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(99,102,241,0.25)"}`,
            backdropFilter: "blur(10px)",
            color:          isDark ? "#e5e7eb" : "#1f2937",
          }}
        >
          <FaGithub className="text-base" />
          See More on GitHub
        </motion.a>
      </motion.div>

    </section>
  );
}

