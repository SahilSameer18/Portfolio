import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import AnimatedHeading from "../components/AnimatedHeading";

// ─── Experience Data ──────────────────────────────────────────────────────────
// TODO: Replace "Company Name" and "Another Company" with your real internship details.
const experienceData = [
  {
    role: "Full Stack Developer Intern",
    company: "Company Name", // ← update with real company
    duration: "Jan 2025 – Apr 2025",
    location: "Remote",
    accent: "#6366f1",
    accentMid: "#a5b4fc",
    techStack: ["Node.js", "Express.js", "React.js", "Tailwind CSS"],
    points: [
      "Built and maintained RESTful APIs using Node.js and Express.js.",
      "Developed responsive UI components using React.js and Tailwind CSS.",
      "Integrated third-party APIs and improved backend performance by 30%.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "Another Company", // ← update with real company
    duration: "Jun 2024 – Aug 2024",
    location: "Delhi, India",
    accent: "#9333ea",
    accentMid: "#c084fc",
    techStack: ["React.js", "Tailwind CSS", "REST APIs", "Figma"],
    points: [
      "Designed and implemented pixel-perfect UI from Figma designs.",
      "Collaborated with backend team to integrate REST APIs.",
      "Improved page load time by optimizing assets and lazy loading components.",
    ],
  },
];

// ─── Experience Section ───────────────────────────────────────────────────────
export default function Experience() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="experience" className="py-20 md:py-28 scroll-mt-12">
      <div className="max-w-4xl mx-auto px-6 md:px-12">

        {/* ── Heading ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          viewport={{ once: true, margin: "0px" }}
        >
          {/* Status badge */}
          <div className="flex justify-center mb-5">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: isDark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.08)",
                border: "1px solid rgba(99,102,241,0.28)",
                color: isDark ? "#a5b4fc" : "#4f46e5",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" aria-hidden="true" />
              Currently open to new opportunities
            </span>
          </div>

          <AnimatedHeading
            text="Experience"
            center
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{
              background: "linear-gradient(135deg, var(--heading-grad-start) 0%, var(--heading-grad-mid) 50%, var(--heading-grad-end) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          />
          <p className="text-neutral-500 text-xs uppercase tracking-widest mb-5">
            Where I've worked
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-500/50" />
          </div>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* Animated vertical line — draws on scroll, once */}
          <div className="absolute left-6 top-0 bottom-0 w-px overflow-hidden">
            <div
              className="absolute inset-0"
              style={{ background: isDark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.18)" }}
            />
            <motion.div
              className="absolute left-0 right-0 top-0"
              initial={{ scaleY: 0, originY: "top" }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              style={{
                height: "100%",
                transformOrigin: "top",
                background: isDark
                  ? "linear-gradient(180deg, #6366f1 0%, #9333ea 100%)"
                  : "linear-gradient(180deg, rgba(99,102,241,0.7) 0%, rgba(147,51,234,0.5) 100%)",
              }}
            />
          </div>

          <div className="space-y-10">
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                className="relative flex gap-8 items-start pl-16"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, delay: index * 0.12 }}
                viewport={{ once: true, margin: "0px" }}
              >
                {/* Icon on timeline */}
                <div
                  className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                  style={{
                    background: isDark ? `${exp.accent}18` : `${exp.accent}12`,
                    border: `1.5px solid ${exp.accent}50`,
                    boxShadow: `0 0 18px ${exp.accent}22`,
                  }}
                >
                  <FaBriefcase style={{ color: isDark ? exp.accentMid : exp.accent, fontSize: "16px" }} />
                </div>

                {/* Card */}
                <div
                  className="flex-1 rounded-2xl p-6 space-y-4 transition-[box-shadow,border-color,background] duration-300"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.55)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.85)"}`,
                    borderLeft: `3px solid ${exp.accent}55`,
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: isDark
                      ? `0 2px 20px rgba(0,0,0,0.22)`
                      : "0 2px 12px rgba(99,102,241,0.10), inset 0 1px 0 rgba(255,255,255,0.7)",
                  }}
                >
                  {/* Top row */}
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3
                        className="text-base md:text-lg font-semibold transition-colors duration-300"
                        style={{ color: isDark ? "#f1f5f9" : "#1e1b4b" }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        className="text-sm font-semibold mt-0.5 transition-colors duration-300"
                        style={{ color: isDark ? exp.accentMid : exp.accent }}
                      >
                        {exp.company}
                      </p>
                    </div>

                    {/* Duration + location pills */}
                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className="text-xs font-medium px-3 py-1 rounded-full transition-colors duration-300"
                        style={{
                          background: isDark ? `${exp.accent}15` : `${exp.accent}10`,
                          border: `1px solid ${exp.accent}30`,
                          color: isDark ? exp.accentMid : exp.accent,
                        }}
                      >
                        {exp.duration}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-gray-500 transition-colors duration-300">
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                        style={{
                          background: isDark ? `${exp.accent}12` : `${exp.accent}08`,
                          border: `1px solid ${exp.accent}28`,
                          color: isDark ? exp.accentMid : exp.accent,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Accent divider */}
                  <div
                    className="h-px"
                    style={{ background: `linear-gradient(90deg, ${exp.accent}35, transparent)` }}
                  />

                  {/* Bullet points */}
                  <ul className="space-y-2">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: exp.accent }}
                        />
                        <span className="text-sm text-neutral-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
