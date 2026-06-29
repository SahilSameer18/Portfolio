import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

// ─── Experience Data (edit this later) ───────────────────────────────────────
const experienceData = [
  {
    role: "Full Stack Developer Intern",
    company: "Company Name",
    duration: "Jan 2025 – Apr 2025",
    location: "Remote",
    points: [
      "Built and maintained RESTful APIs using Node.js and Express.js.",
      "Developed responsive UI components using React.js and Tailwind CSS.",
      "Integrated third-party APIs and improved backend performance by 30%.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "Another Company",
    duration: "Jun 2024 – Aug 2024",
    location: "Delhi, India",
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{
              background: "linear-gradient(135deg, var(--heading-grad-start) 0%, var(--heading-grad-mid) 50%, var(--heading-grad-end) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Experience
          </h2>
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

          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px transition-colors duration-300"
            style={{ background: isDark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.28)" }}
          />

          <div className="space-y-10">
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                className="relative flex gap-8 items-start pl-16"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                {/* Icon on timeline */}
                <div
                  className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                  style={{
                    background: isDark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.06)",
                    border: `1px solid ${isDark ? "rgba(99,102,241,0.3)" : "rgba(99,102,241,0.25)"}`,
                  }}
                >
                  <FaBriefcase style={{ color: isDark ? "#a5b4fc" : "#4f46e5", fontSize: "16px" }} />
                </div>

                {/* Card */}
                <div
                  className="flex-1 rounded-2xl p-6 space-y-4 transition-[box-shadow,border-color,background] duration-300"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.55)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.85)"}`,
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow: isDark
                      ? "none"
                      : "0 2px 12px rgba(99,102,241,0.10), inset 0 1px 0 rgba(255,255,255,0.7)",
                  }}
                >
                  {/* Top row */}
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-neutral-900 dark:text-white transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5 transition-colors duration-300">
                        {exp.company}
                      </p>
                    </div>

                    {/* Duration + location pills */}
                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className="text-xs font-medium px-3 py-1 rounded-full transition-colors duration-300"
                        style={{
                          background: isDark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.08)",
                          border: `1px solid ${isDark ? "rgba(99,102,241,0.25)" : "rgba(99,102,241,0.2)"}`,
                          color: isDark ? "#a5b4fc" : "#4f46e5",
                        }}
                      >
                        {exp.duration}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-gray-500 transition-colors duration-300">
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: "#6366f1" }}
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

