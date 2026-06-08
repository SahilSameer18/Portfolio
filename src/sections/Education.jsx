import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

// ─── Education Data ───────────────────────────────────────────────────────────
const educationData = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    duration: "2021 – 2025",
    institution: "International Institute of Technology and Management, Sonipat",
    side: "left",
  },
  {
    degree: "Senior Secondary",
    duration: "2018 – 2020",
    institution: "Dr Zakir Hussain High School, Patna",
    side: "right",
  },
];

// ─── Education Section ────────────────────────────────────────────────────────
export default function Education() {
  return (
    <section id="education" className="py-20 md:py-28 scroll-mt-12">
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
            Education
          </h2>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-5">
            Academic Milestones
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-500/50" />
          </div>
        </motion.div>

        {/* ── Center Timeline ── */}
        <div className="relative">

          {/* ── Center vertical line ── */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "rgba(99,102,241,0.2)" }}
          />

          <div className="space-y-12">
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                className="relative grid md:grid-cols-2 gap-6 md:gap-0 items-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true }}
              >

                {/* ── Left side card ── */}
                {edu.side === "left" ? (
                  <>
                    {/* Card — left */}
                    <div className="md:pr-12 flex md:justify-end">
                      <EducationCard edu={edu} />
                    </div>

                    {/* Center icon */}
                    <CenterIcon />

                    {/* Empty right */}
                    <div className="hidden md:block" />
                  </>
                ) : (
                  <>
                    {/* Empty left */}
                    <div className="hidden md:block" />

                    {/* Center icon */}
                    <CenterIcon />

                    {/* Card — right */}
                    <div className="md:pl-12 flex md:justify-start">
                      <EducationCard edu={edu} />
                    </div>
                  </>
                )}

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Center Icon on Timeline ──────────────────────────────────────────────────
function CenterIcon() {
  return (
    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full items-center justify-center z-10"
      style={{
        background: "rgba(99,102,241,0.12)",
        border: "1px solid rgba(99,102,241,0.35)",
      }}
    >
      <FaGraduationCap style={{ color: "#a5b4fc", fontSize: "18px" }} />
    </div>
  );
}

// ─── Education Card ───────────────────────────────────────────────────────────
function EducationCard({ edu }) {
  return (
    <div
      className="w-full md:max-w-xs rounded-2xl p-6 space-y-2"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Duration pill */}
      <span
        className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-1"
        style={{
          background: "rgba(99,102,241,0.12)",
          border: "1px solid rgba(99,102,241,0.25)",
          color: "#a5b4fc",
        }}
      >
        {edu.duration}
      </span>

      {/* Degree */}
      <h3 className="text-base md:text-lg font-semibold text-white leading-snug">
        {edu.degree}
      </h3>

      {/* Institution */}
      <p className="text-sm text-gray-500">
        {edu.institution}
      </p>
    </div>
  );
}
