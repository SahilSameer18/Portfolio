import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
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
const TechBadge = ({ tech, accent }) => (
  <span
    className="px-3 py-1 rounded-full text-xs font-medium tracking-wide"
    style={{
      background: `${accent}18`,
      border: `1px solid ${accent}35`,
      color: accent,
    }}
  >
    {tech}
  </span>
);

// ─── Single Project Card ──────────────────────────────────────────────────────
const ProjectCard = ({ project, idx }) => {
  // Alternate image left/right for even/odd projects
  const isEven = idx % 2 === 0;

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
            className="absolute -inset-3 rounded-2xl blur-2xl -z-10 opacity-15 group-hover:opacity-25 transition-opacity duration-500"
            style={{ background: project.accent }}
          />

          {/* Project image */}
          <img
            src={project.image}
            alt={`${project.title} project screenshot`}
            className="w-72 md:w-[22rem] rounded-2xl object-cover"
            loading="lazy"
            decoding="async"
            style={{
              border: `1px solid ${project.accent}30`,
              boxShadow: `0 8px 32px ${project.accent}10`,
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
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: project.accent }}
        >
          {project.tag}
        </p>

        {/* Title */}
        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          {project.title}
        </h3>

        {/* Divider accent line */}
        <div
          className="w-12 h-0.5 rounded-full"
          style={{ background: project.accent }}
        />

        {/* Description */}
        <p className="text-gray-400 leading-relaxed max-w-md">
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
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{
              background: `${project.accent}20`,
              border: `1px solid ${project.accent}50`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${project.accent}35`;
              e.currentTarget.style.boxShadow = `0 0 20px ${project.accent}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${project.accent}20`;
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
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
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
              "linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #818cf8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          My Projects
        </h2>
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-5">
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
        <p className="text-gray-400 text-sm">
          Explore more projects and open-source contributions on my GitHub
        </p>

        <motion.a
          href="https://github.com/SahilSameer18"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2.5 px-6 py-3.5 rounded-full text-white font-semibold text-sm"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.10)";
            e.currentTarget.style.boxShadow = "0 0 24px rgba(99,102,241,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <FaGithub className="text-lg" />
          See More on GitHub
        </motion.a>
      </motion.div>
    </section>
  );
}

