import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const lines = [
  { type: "comment", text: "// reach out through any channel" },
  {
    type: "entry",
    icon: FaEnvelope,
    cmd: "email",
    value: "sahilsameer.dev18@gmail.com",
    href: "mailto:sahilsameer.dev18@gmail.com",
    external: false,
    ariaLabel: "Send email to Sahil Sameer",
    color: "#ff5f56",
  },
  {
    type: "entry",
    icon: FaLinkedin,
    cmd: "linkedin",
    value: "/in/sahil-sameer-siddique",
    href: "https://www.linkedin.com/in/sahil-sameer-siddique/",
    external: true,
    ariaLabel: "Open LinkedIn profile",
    color: "#0077b5",
  },
  {
    type: "entry",
    icon: FaGithub,
    cmd: "github",
    value: "@SahilSameer18",
    href: "https://github.com/SahilSameer18",
    external: true,
    ariaLabel: "Open GitHub profile",
    color: "#c4c4c4",
    lightColor: "#374151",
  },
];

const checks = [
  "email found",
  "linkedin found",
  "github found",
];

// ---------------------------------------------------------------------------
// Animation
// ---------------------------------------------------------------------------

const EASE_OUT = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.05,
    },
  },
};

const lineVariants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASE_OUT,
    },
  },
};

const TYPE_SPEED_MS = 42;

export default function Contact() {
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.45,
  });

  const [windowReady, setWindowReady] = useState(false);
  const [typed, setTyped] = useState(0);

  const [visibleChecks, setVisibleChecks] = useState(0);
  const [showLinks, setShowLinks] = useState(false);

  const fullText = "contact --list";

  // -------------------------------------------------------------------------
  // Typewriter
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (!isInView || !windowReady) return;
    if (typed >= fullText.length) return;

    const timeout = setTimeout(() => {
      setTyped((prev) => prev + 1);
    }, TYPE_SPEED_MS);

    return () => clearTimeout(timeout);
  }, [typed, isInView, windowReady, fullText.length]);

  const isTypingDone = typed >= fullText.length;

  // -------------------------------------------------------------------------
  // Terminal output sequence
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (!isTypingDone) return;

    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      setVisibleChecks(current);

      if (current >= checks.length) {
        clearInterval(interval);

        setTimeout(() => {
          setShowLinks(true);
        }, 250);
      }
    }, 350);

    return () => clearInterval(interval);
  }, [isTypingDone]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 md:py-28 md:min-h-screen md:flex md:items-center scroll-mt-12"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12 w-full">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
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
            Contact
          </h2>
          <p className="text-neutral-500 text-xs uppercase tracking-widest mb-5">
            Get in touch
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-indigo-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
            <div className="h-px w-16 bg-linear-to-l from-transparent to-indigo-500/50" />
          </div>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          viewport={{ once: true }}
          onAnimationComplete={() => setWindowReady(true)}
          className="rounded-2xl overflow-hidden border dark:border-white/10 backdrop-blur-md transition-all duration-300"
          style={{
            background: isDark ? "rgba(0,0,0,0.40)" : "rgba(255,255,255,0.55)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.85)"}`,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: isDark
              ? "0 8px 40px rgba(0,0,0,0.40)"
              : "0 4px 24px rgba(99,102,241,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          {/* Title Bar */}
          <div
            className="flex items-center gap-2 px-5 py-3.5 border-b dark:border-white/10 transition-colors duration-300"
            style={{
              borderBottomColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(99,102,241,0.15)",
              background: isDark ? "rgba(255,255,255,0.02)" : "rgba(99,102,241,0.04)",
            }}
          >
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />

            <span className="ml-3 text-xs text-neutral-500 dark:text-gray-500 font-mono transition-colors duration-300">
              sahil@portfolio: ~
            </span>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 font-mono text-sm md:text-base space-y-4">
            {/* Command — visually animated, hidden from assistive tech */}
            <div className="flex items-center gap-2 text-neutral-700 dark:text-gray-300 transition-colors duration-300">
              <span className="text-purple-600 dark:text-purple-400" aria-hidden="true">
                ➜
              </span>
              <span className="text-indigo-600 dark:text-indigo-300" aria-hidden="true">
                ~
              </span>

              <span aria-hidden="true">
                {fullText.slice(0, typed)}
                <span
                  className={`inline-block w-2 h-4 ml-0.5 align-middle animate-pulse ${
                    isTypingDone ? "bg-indigo-600/70 dark:bg-indigo-400/70" : "bg-indigo-600 dark:bg-indigo-400"
                  }`}
                />
              </span>

              <span className="sr-only">{`➜ ~ ${fullText}`}</span>
            </div>

            {/* Check Results */}
            {visibleChecks > 0 && (
              <div className="space-y-2" aria-hidden="true">
                {checks.slice(0, visibleChecks).map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 transition-colors duration-300"
                  >
                    <span>✓</span>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Contact Links */}
            {showLinks && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-3 pt-3"
              >
                {lines.map((line) => {
                  const key = line.type === "comment" ? line.text : line.cmd;

                  return line.type === "comment" ? (
                    <motion.p
                      key={key}
                      variants={lineVariants}
                      className="text-neutral-500 dark:text-gray-500 text-xs md:text-sm transition-colors duration-300"
                    >
                      {line.text}
                    </motion.p>
                  ) : (
                    <motion.a
                      key={key}
                      variants={lineVariants}
                      href={line.href}
                      target={line.external ? "_blank" : undefined}
                      rel={line.external ? "noopener noreferrer" : undefined}
                      aria-label={line.ariaLabel}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="
                        group
                        flex
                        flex-wrap
                        items-center
                        gap-2
                        md:gap-3
                        py-1.5
                        -mx-2
                        px-2
                        rounded-lg
                        transition-colors
                        duration-200
                        focus:outline-none
                        focus:ring-2
                        focus:ring-indigo-500/70
                        focus:ring-offset-2
                        focus:ring-offset-white
                        dark:focus:ring-offset-black
                      "
                      style={{
                        "--hover-bg": isDark ? "rgba(255,255,255,0.06)" : "rgba(99,102,241,0.08)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.06)" : "rgba(99,102,241,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <line.icon
                        aria-hidden="true"
                        className="shrink-0 transition-colors duration-200"
                        style={{ color: (!isDark && line.lightColor) ? line.lightColor : line.color, fontSize: "14px" }}
                      />

                      <span className="text-purple-600 dark:text-purple-400">{line.cmd}</span>

                      <span className="text-neutral-500 dark:text-gray-500">:</span>

                      <span
                        className={`text-neutral-600 group-hover:text-neutral-900 dark:text-gray-300 dark:group-hover:text-white transition-colors duration-200 break-all ${
                          line.cmd === "email" ? "group-hover:underline" : ""
                        }`}
                      >
                        {line.value}
                      </span>
                    </motion.a>
                  );
                })}

                {/* Idle Prompt */}
                <motion.div
                  variants={lineVariants}
                  className="flex items-center gap-2 text-neutral-700 dark:text-gray-300 pt-2 transition-colors duration-300"
                >
                  <span className="text-purple-600 dark:text-purple-400">➜</span>
                  <span className="text-indigo-600 dark:text-indigo-300">~</span>

                  <span
                    aria-hidden="true"
                    className="inline-block w-2 h-4 bg-indigo-600/70 dark:bg-indigo-400/70 ml-0.5 align-middle animate-pulse"
                  />
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          viewport={{ once: true }}
          className="text-xs text-neutral-500 dark:text-gray-500 mt-6 font-mono transition-colors duration-300"
        >
          # usually responds within a day or two
        </motion.p>
      </div>
    </section>
  );
}
