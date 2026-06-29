import { motion } from "framer-motion";
import ais from "../assets/about2.png";

// ─── Achievement stats ──────────────────────────────────────────────────
// Placeholder numbers — swap these for your real figures.
// Keep `value` short (fits big type) and `label` to 2-3 words.
const stats = [
  { value: "5+", label: "Live projects" },
  { value: "4", label: "Production platforms" },
  { value: "30%", label: "Backend perf. improvement" },
];

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center pt-24 pb-10 scroll-mt-12"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center w-full">
        {/* ── Left: Image ── */}
        <motion.div
          className="flex justify-center order-2 md:order-1"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Subtle bob animation */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Subtle glow */}
            <div
              className="absolute -inset-4 rounded-2xl -z-10"
              style={{
                background:
                  "radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            {/* Image */}
            <motion.div
              className="w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(99,102,241,0.2)",
                boxShadow: "0 8px 32px rgba(99,102,241,0.08)",
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={ais}
                alt="Sahil Sameer Siddique"
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </motion.div>

            {/* Corner accent — top left */}
            <div
              className="absolute -top-2 -left-2 w-10 h-10"
              style={{
                borderTop: "2px solid rgba(99,102,241,0.5)",
                borderLeft: "2px solid rgba(99,102,241,0.5)",
                borderRadius: "8px 0 0 0",
              }}
            />

            {/* Corner accent — bottom right */}
            <div
              className="absolute -bottom-2 -right-2 w-10 h-10"
              style={{
                borderBottom: "2px solid rgba(99,102,241,0.5)",
                borderRight: "2px solid rgba(99,102,241,0.5)",
                borderRadius: "0 0 8px 0",
              }}
            />
          </motion.div>
        </motion.div>

        {/* ── Right: Content ── */}
        <motion.div
          className="space-y-6 order-1 md:order-2"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Heading */}
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              background:
                "linear-gradient(135deg, var(--heading-grad-start) 0%, var(--heading-grad-mid) 50%, var(--heading-grad-end) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            About Me
          </h2>

          {/* Accent divider */}
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-indigo-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
          </div>

          {/* Bio — backend focused */}
          <p className="text-neutral-600 dark:text-gray-400 max-w-lg leading-relaxed">
            I'm{" "}
            <span className="text-neutral-900 dark:text-white font-medium">
              Sahil Sameer Siddique
            </span>
            , a Full Stack Developer with a deep focus on backend engineering. I
            specialise in building scalable REST APIs, JWT authentication with
            refresh token rotation, and architecting databases for performance
            and reliability.
          </p>

          <p className="text-neutral-600 dark:text-gray-400 max-w-lg leading-relaxed">
            My stack includes <span className="text-indigo-600 dark:text-indigo-300 font-semibold">Node.js</span>,{" "}
            <span className="text-indigo-600 dark:text-indigo-300 font-semibold">Express.js</span>,{" "}
            <span className="text-indigo-600 dark:text-indigo-300 font-semibold">MongoDB</span>,{" "}
            <span className="text-indigo-600 dark:text-indigo-300 font-semibold">PostgreSQL</span>, and{" "}
            <span className="text-indigo-600 dark:text-indigo-300 font-semibold">Prisma</span> on the backend, with{" "}
            <span className="text-indigo-600 dark:text-indigo-300 font-semibold">React</span> and{" "}
            <span className="text-indigo-600 dark:text-indigo-300 font-semibold">Tailwind CSS</span> on the
            frontend. I've shipped production platforms like{" "}
            <span className="text-neutral-900 dark:text-white font-semibold">PrepStack</span> and{" "}
            <span className="text-neutral-900 dark:text-white font-semibold">SkillBridgeAI</span>, both
            live and integrated with the{" "}
            <span className="text-indigo-600 dark:text-indigo-300 font-semibold">Gemini API</span>.
          </p>

          {/* ── Achievement stats ──
              Simple stat row: big gradient numerals + short label
              beneath each. Wraps to a 2-column grid on very narrow
              screens so three stats never get cramped into one row
              that's too tight to read. Edit `stats` above to update
              numbers/labels — no markup changes needed. */}
          <motion.div
            className="grid grid-cols-3 sm:flex sm:flex-wrap gap-6 sm:gap-10 pt-2"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-2xl md:text-3xl font-bold leading-none"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--heading-grad-start) 0%, var(--heading-grad-mid) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-neutral-500 dark:text-gray-500 mt-1.5 leading-snug max-w-[7rem]">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
