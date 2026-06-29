import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";
import safar from "../assets/safar.png";
import prepstack from "../assets/prepstack.png";
import skillbridgeAI from "../assets/skillbridgeAI.png";

// ─── Project Data ─────────────────────────────────────────────────────────────
const projects = [
  {
    title: "PrepStack",
    tag: "SDE Prep Platform",
    description:
      "A comprehensive platform for interview preparation, offering AI project idea generation, structured DSA sheets, and many more interview preparation resources.",
    link: "https://prepstack-ss.vercel.app/",
    github: "https://github.com/SahilSameer18/prepstack",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    image: prepstack,
    accent: "#FFA116", // leetcode yellow
  },
  {
    title: "SkillBridgeAI",
    tag: "AI Career Analyzer",
    description:
      "Helps users prepare effectively for interviews based on submitted profiles, providing personalized questions, a tailored preparation plan, and skill gap insights.",
    link: "https://skillbridgeai-s.vercel.app/",
    github: "https://github.com/SahilSameer18/skillbridgeAI",
    techStack: ["React", "PostgreSQL", "Prisma ORM", "Node", "Gemini AI"],
    image: skillbridgeAI,
    accent: "#4DB8D4", // cyan
  },
  {
    title: "SafarAI",
    tag: "AI Travel Planner",
    description:
      "An intelligent trip planning application that uses AI to create personalized travel itineraries based on user preferences, budget, and interests.",
    link: "https://www.safarai.in/",
    github: "https://github.com/SahilSameer18",
    techStack: ["React", "Tailwind CSS", "Firebase", "Gemini AI"],
    image: safar,
    accent: "#34d399", // emerald
  },
];

// ─── Accent Color Helper ───
const getContrastAccent = (accent, theme) => {
  if (theme === "dark") return accent;
  if (accent === "#FFA116") return "#b45309"; // amber-700
  if (accent === "#4DB8D4") return "#0369a1"; // sky-700
  if (accent === "#34d399") return "#047857"; // emerald-700
  return accent;
};

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
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
        border: `1px solid ${resolvedAccent}35`,
        color: resolvedAccent,
      }}
    >
      {tech}
    </span>
  );
};

// ─── Single Project Card ──────────────────────────────────────────────────────
const ProjectCard = ({ project, idx }) => {
  const isEven = idx % 2 === 0;
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const resolvedAccent = getContrastAccent(project.accent, theme);

  return (
    <motion.div
      className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
        isEven ? "" : "md:grid-flow-dense"
      }`}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {/* ── Image Side ── */}
      <motion.div
        className={`flex justify-center ${isEven ? "" : "md:col-start-2"}`}
        variants={isEven ? fadeLeft : fadeRight}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      >
        <div className="relative group">
          {/* Glow layer behind image */}
          <div
            className="absolute -inset-3 rounded-2xl blur-2xl -z-10 opacity-15 group-hover:opacity-25 transition-all duration-500"
            style={{ background: resolvedAccent }}
          />

          {/* Project image */}
          <img
            src={project.image}
            alt={`${project.title} project screenshot`}
            className="w-72 md:w-[22rem] rounded-2xl object-cover transition-all duration-300"
            loading="lazy"
            decoding="async"
            style={{
              border: `1px solid ${resolvedAccent}${isDark ? "30" : "15"}`,
              boxShadow: `0 8px 32px ${resolvedAccent}${isDark ? "10" : "05"}`,
            }}
          />
        </div>
      </motion.div>

      {/* ── Content Side ── */}
      <motion.div
        className={`space-y-5 ${isEven ? "" : "md:col-start-1 md:row-start-1"}`}
        variants={isEven ? fadeRight : fadeLeft}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {/* Tag */}
        <p
          className="text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
          style={{ color: resolvedAccent }}
        >
          {project.tag}
        </p>

        {/* Title */}
        <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white leading-tight transition-colors duration-300">
          {project.title}
        </h3>

        {/* Divider accent line */}
        <div
          className="w-12 h-0.5 rounded-full transition-colors duration-300"
          style={{ background: resolvedAccent }}
        />

        {/* Description */}
        <p className="text-neutral-600 dark:text-gray-400 leading-relaxed max-w-md transition-colors duration-300">
          {project.description}
        </p>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <TechBadge key={tech} tech={tech} accent={project.accent} />
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4 pt-1">
          {/* Live link */}
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 shadow-xs"
            style={{
              background: isDark ? `${resolvedAccent}20` : `${resolvedAccent}`,
              border: `1px solid ${resolvedAccent}50`,
              color: isDark ? resolvedAccent : "#ffffff"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark ? `${resolvedAccent}35` : `${resolvedAccent}ee`;
              e.currentTarget.style.boxShadow = `0 0 20px ${resolvedAccent}${isDark ? "30" : "20"}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isDark ? `${resolvedAccent}20` : `${resolvedAccent}`;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <HiOutlineExternalLink className="text-base" />
            Live Demo
          </motion.a>

          {/* GitHub link */}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(99,102,241,0.22)"}`,
              backdropFilter: "blur(8px)",
              color: isDark ? "#9ca3af" : "#374151",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.85)";
              e.currentTarget.style.color = isDark ? "#ffffff" : "#111827";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)";
              e.currentTarget.style.color = isDark ? "#9ca3af" : "#374151";
            }}
          >
            <FaGithub className="text-base" />
            GitHub
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Main Projects Section ────────────────────────────────────────────────────
export default function Projects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="projects" className="min-h-screen flex flex-col scroll-mt-12">
      {/* ── Section Heading ── */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2
          className="text-5xl md:text-6xl font-bold mb-4"
          style={{
            background:
              "linear-gradient(135deg, var(--heading-grad-start) 0%, var(--heading-grad-mid) 50%, var(--heading-grad-end) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          My Projects
        </h2>
        <p className="text-neutral-500 text-xs uppercase tracking-widest mb-5">
          Things I've built
        </p>
        {/* Decorative divider — matches Skills section style */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-500/50" />
        </div>
      </motion.div>

      {/* ── Project Cards ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-24">
        {projects.map((project, idx) => (
          <ProjectCard key={project.title} project={project} idx={idx} />
        ))}
      </div>

      {/* ── GitHub CTA ── */}
      <motion.div
        className="flex flex-col items-center mt-20 gap-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
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
            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(99,102,241,0.25)"}`,
            backdropFilter: "blur(10px)",
            color: isDark ? "#e5e7eb" : "#1f2937",
            boxShadow: isDark ? "none" : "0 2px 12px rgba(99,102,241,0.08)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.85)";
            e.currentTarget.style.boxShadow = isDark ? "0 0 24px rgba(99,102,241,0.25)" : "0 0 24px rgba(99,102,241,0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)";
            e.currentTarget.style.boxShadow = isDark ? "none" : "0 2px 12px rgba(99,102,241,0.08)";
          }}
        >
          <FaGithub className="text-lg" />
          See More on GitHub
        </motion.a>
      </motion.div>
    </section>
  );
}

