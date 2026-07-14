import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram, FaClipboard, FaCheck } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import AnimatedHeading from "../components/AnimatedHeading";

// ─── Data ────────────────────────────────────────────────────────────────────

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
    copyable: true,
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
  {
    type: "entry",
    icon: FaInstagram,
    cmd: "instagram",
    // TODO: update to your real Instagram handle & URL
    value: "@sahilsameer18",
    href: "https://www.instagram.com/sahilsameer18/",
    external: true,
    ariaLabel: "Open Instagram profile",
    color: "#E1306C",
  },
];

const checks = [
  "email found",
  "linkedin found",
  "github found",
  "instagram found",
];

// ─── Animation constants ──────────────────────────────────────────────────────

const EASE_OUT = [0.22, 1, 0.36, 1];

// One-shot stagger — fires once when links appear, no per-hover overhead
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
};

const lineVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE_OUT } },
};

const TYPE_SPEED_MS = 42;

// ─── Contact ─────────────────────────────────────────────────────────────────

export default function Contact() {
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const [windowReady, setWindowReady] = useState(false);
  const [typed, setTyped] = useState(0);
  const [visibleChecks, setVisibleChecks] = useState(0);
  const [showLinks, setShowLinks] = useState(false);
  const [copied, setCopied] = useState(false);

  const fullText = "contact --list";

  const copyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText("sahilsameer.dev18@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Typewriter
  useEffect(() => {
    if (!isInView || !windowReady) return;
    if (typed >= fullText.length) return;
    const t = setTimeout(() => setTyped((p) => p + 1), TYPE_SPEED_MS);
    return () => clearTimeout(t);
  }, [typed, isInView, windowReady, fullText.length]);

  const isTypingDone = typed >= fullText.length;

  // Terminal output sequence
  useEffect(() => {
    if (!isTypingDone) return;
    let n = 0;
    const iv = setInterval(() => {
      n += 1;
      setVisibleChecks(n);
      if (n >= checks.length) {
        clearInterval(iv);
        setTimeout(() => setShowLinks(true), 250);
      }
    }, 350);
    return () => clearInterval(iv);
  }, [isTypingDone]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 md:py-28 md:min-h-screen md:flex md:items-center scroll-mt-12"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full">

        {/* ── Section Heading ── */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          viewport={{ once: true, margin: "0px" }}
        >
          <AnimatedHeading
            text="Let's Connect"
            center
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{
              background:
                "linear-gradient(135deg, var(--heading-grad-start) 0%, var(--heading-grad-mid) 50%, var(--heading-grad-end) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          />
          <p className="text-neutral-500 text-xs uppercase tracking-widest mb-5">
            Open to collaborations &amp; opportunities
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-500/50" />
          </div>
        </motion.div>

        {/* ── Terminal card ──
             NO backdrop-filter here — blur repaints the entire layer on scroll
             and causes severe jank on low-end GPUs. Use solid-ish opaque bg instead. ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE_OUT }}
          viewport={{ once: true, margin: "0px" }}
          onAnimationComplete={() => setWindowReady(true)}
          className="rounded-2xl overflow-hidden"
          style={{
            background: isDark ? "rgba(8,8,20,0.94)" : "rgba(255,255,255,0.98)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.10)" : "rgba(99,102,241,0.18)"}`,
            boxShadow: isDark
              ? "0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(99,102,241,0.08)"
              : "0 4px 24px rgba(99,102,241,0.12), 0 1px 0 rgba(255,255,255,1) inset",
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-5 py-3.5 border-b"
            style={{
              borderBottomColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(99,102,241,0.12)",
              background: isDark ? "rgba(255,255,255,0.03)" : "rgba(99,102,241,0.04)",
            }}
          >
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-neutral-500 dark:text-gray-500 font-mono select-none">
              sahil@portfolio: ~
            </span>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 font-mono text-sm md:text-base space-y-4">

            {/* Command line */}
            <div className="flex items-center gap-2 text-neutral-700 dark:text-gray-300">
              <span className="text-purple-600 dark:text-purple-400" aria-hidden="true">➜</span>
              <span className="text-indigo-600 dark:text-indigo-300" aria-hidden="true">~</span>
              <span aria-hidden="true">
                {fullText.slice(0, typed)}
                <span
                  className={`inline-block w-2 h-4 ml-0.5 align-middle animate-pulse ${
                    isTypingDone
                      ? "bg-indigo-600/70 dark:bg-indigo-400/70"
                      : "bg-indigo-600 dark:bg-indigo-400"
                  }`}
                />
              </span>
              <span className="sr-only">{`➜ ~ ${fullText}`}</span>
            </div>

            {/* Check results — motion.div for one-shot fade (not interactive, so cheap) */}
            {visibleChecks > 0 && (
              <div className="space-y-2" aria-hidden="true">
                {checks.slice(0, visibleChecks).map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400"
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

                  if (line.type === "comment") {
                    return (
                      <motion.p
                        key={key}
                        variants={lineVariants}
                        className="text-neutral-500 dark:text-gray-500 text-xs md:text-sm"
                      >
                        {line.text}
                      </motion.p>
                    );
                  }

                  return (
                    /* motion.div handles stagger (one-shot); plain <a> handles hover via CSS */
                    <motion.div key={key} variants={lineVariants}>
                      <a
                        href={line.href}
                        target={line.external ? "_blank" : undefined}
                        rel={line.external ? "noopener noreferrer" : undefined}
                        aria-label={line.ariaLabel}
                        className="group flex flex-wrap items-center gap-2 md:gap-3 py-1.5 -mx-2 px-2 rounded-lg
                                   transition-all duration-200 hover:translate-x-1
                                   focus:outline-none focus:ring-2 focus:ring-indigo-500/70
                                   focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = isDark
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(99,102,241,0.08)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <line.icon
                          aria-hidden="true"
                          className="shrink-0"
                          style={{
                            color: !isDark && line.lightColor ? line.lightColor : line.color,
                            fontSize: "14px",
                          }}
                        />
                        <span className="text-purple-600 dark:text-purple-400">{line.cmd}</span>
                        <span className="text-neutral-500 dark:text-gray-500">:</span>
                        <span
                          className={`text-neutral-600 group-hover:text-neutral-900 dark:text-gray-300
                                      dark:group-hover:text-white transition-colors duration-150 break-all ${
                                        line.cmd === "email" ? "group-hover:underline" : ""
                                      }`}
                        >
                          {line.value}
                        </span>

                        {/* Copy button — email only */}
                        {line.copyable && (
                          <button
                            onClick={copyEmail}
                            className="ml-auto flex-shrink-0 p-1.5 rounded-md transition-colors duration-200
                                       hover:bg-neutral-100 dark:hover:bg-white/10"
                            style={{ color: copied ? "#22c55e" : (isDark ? "#64748b" : "#9ca3af") }}
                            title={copied ? "Copied!" : "Copy email"}
                            aria-label="Copy email address"
                          >
                            {copied ? <FaCheck size={10} /> : <FaClipboard size={10} />}
                          </button>
                        )}
                      </a>
                    </motion.div>
                  );
                })}

                {/* Idle prompt */}
                <motion.div
                  variants={lineVariants}
                  className="flex items-center gap-2 text-neutral-700 dark:text-gray-300 pt-2"
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

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          viewport={{ once: true }}
          className="text-xs text-neutral-500 dark:text-gray-500 mt-6 font-mono"
        >
          # usually responds within a day or two
        </motion.p>
      </div>
    </section>
  );
}
