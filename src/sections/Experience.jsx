import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";

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
              background: "linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Experience
          </h2>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-5">
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
            className="absolute left-6 top-0 bottom-0 w-px"
            style={{ background: "rgba(99,102,241,0.15)" }}
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
                  className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(99,102,241,0.1)",
                    border: "1px solid rgba(99,102,241,0.3)",
                  }}
                >
                  <FaBriefcase style={{ color: "#a5b4fc", fontSize: "16px" }} />
                </div>

                {/* Card */}
                <div
                  className="flex-1 rounded-2xl p-6 space-y-4"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {/* Top row */}
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-white">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-indigo-400 font-medium mt-0.5">
                        {exp.company}
                      </p>
                    </div>

                    {/* Duration + location pills */}
                    <div className="flex flex-col items-end gap-1.5">
                      <span
                        className="text-xs font-medium px-3 py-1 rounded-full"
                        style={{
                          background: "rgba(99,102,241,0.12)",
                          border: "1px solid rgba(99,102,241,0.25)",
                          color: "#a5b4fc",
                        }}
                      >
                        {exp.duration}
                      </span>
                      <span className="text-xs text-gray-500">
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
                        <span className="text-sm text-gray-400 leading-relaxed">
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