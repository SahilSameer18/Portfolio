import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import ais from "../assets/about2.png";
import { useCountUp } from "../hooks/useCountUp";
import GlitchText from "../components/GlitchText";

// ─── Achievement stats ──────────────────────────────────────────────────
const stats = [
  { value: "5+",  label: "Live projects" },
  { value: "4",   label: "Production platforms" },
  { value: "30%", label: "Backend perf. improvement" },
];

// ─── Passion chips ────────────────────────────────────────────────────────
const passions = [
  { icon: "🔒", label: "Auth & Security" },
  { icon: "🤖", label: "AI Integration" },
  { icon: "⚡", label: "REST APIs" },
  { icon: "🗄️", label: "Databases" },
];

// Splits "5+" → { num: 5, suffix: "+" } etc.
function parseStat(value) {
  const num = parseInt(value, 10);
  return { num, suffix: value.replace(String(num), "") };
}

function StatItem({ stat }) {
  const { num, suffix } = parseStat(stat.value);
  const { count, ref }  = useCountUp(num, 1.6);

  return (
    <div ref={ref}>
      <p
        className="text-2xl md:text-3xl font-bold leading-none"
        style={{
          background: "linear-gradient(135deg, var(--heading-grad-start) 0%, var(--heading-grad-mid) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {count}{suffix}
      </p>
      <p className="text-xs text-neutral-500 dark:text-gray-500 mt-1.5 leading-snug">
        {stat.label}
      </p>
    </div>
  );
}

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="about" className="min-h-screen py-24 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-16">
        
        {/* Heading */}
        <div className="text-center md:text-left">
          <h2
            className="text-5xl md:text-6xl font-bold"
            style={{
              background:
                "linear-gradient(135deg, var(--heading-grad-start) 0%, var(--heading-grad-mid) 50%, var(--heading-grad-end) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <GlitchText text="About Me" />
          </h2>
          <div className="flex items-center gap-3 mt-3 justify-center md:justify-start">
            <div className="h-px w-12 bg-indigo-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
          
          {/* Card 1: Bio Story (Col Span 2) */}
          <motion.div
            className="col-span-1 md:col-span-2 p-6 md:p-8 rounded-2xl glass flex flex-col justify-between space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <div>
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider"
                  style={{
                    background: isDark ? "rgba(99,102,241,0.12)" : "rgba(238,242,255,0.95)",
                    border: isDark ? "1px solid rgba(99,102,241,0.32)" : "1px solid rgba(199,210,254,0.75)",
                    color: isDark ? "#a5b4fc" : "#4338ca",
                  }}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
                  </span>
                  Open to Opportunities
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
                Engineering Scalable Systems & AI-Driven User Experiences
              </h3>

              <p className="text-sm md:text-base text-neutral-600 dark:text-gray-400 leading-relaxed">
                I build scalable full-stack products with a strong focus on backend architecture, secure APIs, and AI-powered user experiences. I enjoy turning ideas into production-ready web platforms that are reliable, thoughtful, and measurable.
              </p>

              <p className="text-sm md:text-base text-neutral-600 dark:text-gray-400 leading-relaxed">
                My technical specialties lie in optimizing REST APIs, JWT authentication structures with refresh token rotation, and designing relational and document databases for raw performance. On the frontend, I pair this backend robustness with fluid, interactive React interfaces styled via Tailwind CSS.
              </p>
            </div>

            <div>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03, x: 2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300"
                style={{
                  background: isDark ? "rgba(99,102,241,0.14)" : "rgba(99,102,241,0.08)",
                  border: "1px solid rgba(99,102,241,0.25)",
                  color: isDark ? "#a5b4fc" : "#4f46e5",
                }}
              >
                Explore My Work
                <span>→</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Card 2: Self Portrait (Col Span 1, Row Span 2 on Desktop) */}
          <motion.div
            className="col-span-1 md:row-span-2 p-6 rounded-2xl glass flex flex-col items-center justify-center space-y-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-indigo-500/40 rounded-tl-lg pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-indigo-500/40 rounded-br-lg pointer-events-none" />

            <motion.div
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(99,102,241,0.2)",
                boxShadow: "0 8px 32px rgba(99,102,241,0.08)",
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={ais}
                alt="Sahil Sameer Siddique portrait"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>

            <div className="text-center space-y-1">
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                Sahil Sameer Siddique
              </h4>
              <p className="text-xs text-neutral-500 dark:text-gray-500 uppercase tracking-widest">
                Delhi, India
              </p>
            </div>
          </motion.div>

          {/* Card 3: Credibility Stats (Col Span 1) */}
          <motion.div
            className="col-span-1 p-6 rounded-2xl glass flex flex-col justify-between space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-gray-500">
              Credibility & Impact
            </h4>
            <div className="flex flex-col gap-5">
              {stats.map((stat) => (
                <div key={stat.label} className="border-l-2 border-indigo-500/30 pl-4 py-0.5">
                  <StatItem stat={stat} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 4: Core Architectural Focus (Col Span 1) */}
          <motion.div
            className="col-span-1 p-6 rounded-2xl glass flex flex-col justify-between space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-gray-500">
              Architectural Focus
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {passions.map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col p-3 rounded-xl border border-neutral-200/50 dark:border-white/5 bg-neutral-500/5 hover:border-indigo-500/30 transition-all duration-300"
                >
                  <span className="text-lg mb-1.5">{icon}</span>
                  <span className="text-[10px] md:text-xs font-semibold text-neutral-800 dark:text-gray-300 leading-snug">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
