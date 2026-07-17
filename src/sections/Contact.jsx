import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram, FaClipboard, FaCheck, FaTerminal } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import GlitchText from "../components/GlitchText";

// ─── Data ────────────────────────────────────────────────────────────────────
const lines = [
  { type: "comment", text: "// reach out through any channel or type in the shell" },
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

const EASE_OUT = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const lineVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE_OUT } },
};

const TYPE_SPEED_MS = 30;

export default function Contact() {
  const sectionRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const [windowReady, setWindowReady] = useState(false);
  const [typed, setTyped] = useState(0);
  const [visibleChecks, setVisibleChecks] = useState(0);
  const [showLinks, setShowLinks] = useState(false);
  const [copied, setCopied] = useState(false);

  // Shell history & input state
  const [history, setHistory] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef(null);
  const historyEndRef = useRef(null);

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
    }, 250);
    return () => clearInterval(iv);
  }, [isTypingDone]);

  // Scroll to bottom of shell when history updates (only if user has typed something)
  useEffect(() => {
    if (history.length > 0) {
      historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let newHistory = [...history, { type: "input", text: inputVal }];

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "output",
          text: "Available commands:\n  about      - Who I am & my product positioning\n  skills     - Deep dive into backend, frontend & AI stacks\n  projects   - Direct Vercel / Live links to my builds\n  experience - History of coding roles & backend speedups\n  contact    - Core email, linkedin & github direct links\n  theme      - Ripple toggle light/dark state\n  hack       - Simulate secure terminal override overlay\n  clear      - Clear terminal commands"
        });
        break;
      case "about":
        newHistory.push({
          type: "output",
          text: "I build scalable full-stack products with a strong focus on backend architecture, secure APIs, and AI-powered user experiences. I enjoy turning ideas into production-ready web platforms that are reliable, thoughtful, and measurable."
        });
        break;
      case "skills":
        newHistory.push({
          type: "output",
          text: "Backend Stacks: Node.js, Express.js, JWT, Socket.io, REST APIs\nDatabases & ORM: PostgreSQL, MongoDB, Prisma ORM, Neon DB\nFrontend Frameworks: React.js, Tailwind CSS, JavaScript (ES6+), HTML5, CSS3\nDeveloper Tools: Git, GitHub, Postman, Vercel, Render, Gemini AI (LLM integration)"
        });
        break;
      case "projects":
        newHistory.push({
          type: "output",
          html: (
            <div className="space-y-1.5 text-xs text-neutral-400 dark:text-gray-400">
              <p>• PrepStack - Interview Preparation Hub: <a href="https://prepstack-ss.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">prepstack-ss.vercel.app</a></p>
              <p>• SkillBridgeAI - Resume Diagnostics Engine: <a href="https://skillbridgeai-s.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">skillbridgeai-s.vercel.app</a></p>
              <p>• SafarAI - AI Budget Trip planner: <a href="https://www.safarai.in/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">safarai.in</a></p>
            </div>
          )
        });
        break;
      case "experience":
        newHistory.push({
          type: "output",
          text: "• Full Stack Engineer @ PrepStack | Jan 2025 - Present\n  Coded REST APIs, reduced query times by 30% via index optimizations.\n• AI Integrations Engineer @ Freelance | Jun 2024 - Dec 2024\n  Integrated Gemini LLM API, designed schema infrastructures using Prisma."
        });
        break;
      case "contact":
        newHistory.push({
          type: "output",
          html: (
            <div className="space-y-1 text-xs text-neutral-400 dark:text-gray-400">
              <p>Email: <a href="mailto:sahilsameer.dev18@gmail.com" className="text-indigo-400 hover:underline">sahilsameer.dev18@gmail.com</a></p>
              <p>LinkedIn: <a href="https://www.linkedin.com/in/sahil-sameer-siddique/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">linkedin.com/in/sahil-sameer-siddique/</a></p>
              <p>GitHub: <a href="https://github.com/SahilSameer18" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">github.com/SahilSameer18</a></p>
            </div>
          )
        });
        break;
      case "theme":
        toggleTheme(e);
        newHistory.push({
          type: "output",
          text: `System theme toggled to: ${theme === "dark" ? "light" : "dark"}`
        });
        break;
      case "clear":
        newHistory = [];
        break;
      case "hack":
        newHistory.push({
          type: "output",
          text: " _  _   _    ___ _  __ \n| || | /_\\  / __| |/ / \n| __ |/ _ \\| (__| ' <  \n|_||_/_/ \\_\\\\___|_|\\_\\ \n\n[OK] CORRUPTING NODE BACKEND API CORRIDORS...\n[OK] DEPLOYING MATRIX AGENT INTERFACES...\n[OK] RE-INDEXING POSTGRESQL TABLES...\nACCESS GRANTED. Welcome to the system, Sahil."
        });
        break;
      default:
        newHistory.push({
          type: "output",
          text: `Command not found: '${cmd}'. Type 'help' for available actions.`
        });
    }

    setHistory(newHistory);
    setInputVal("");
  };

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
            <GlitchText text="Let's Connect" />
          </h2>
          <p className="text-neutral-500 text-xs uppercase tracking-widest mb-5">
            Open to collaborations &amp; opportunities
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-500/50" />
          </div>
        </motion.div>

        {/* ── Terminal Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE_OUT }}
          viewport={{ once: true, margin: "0px" }}
          onAnimationComplete={() => setWindowReady(true)}
          className="rounded-2xl overflow-hidden cursor-text"
          onClick={focusInput}
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
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 text-xs text-neutral-500 dark:text-gray-500 font-mono select-none flex items-center gap-1.5">
              <FaTerminal size={10} />
              sahil@portfolio: ~ (interactive shell)
            </span>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 font-mono text-sm md:text-base space-y-4 max-h-[30rem] overflow-y-auto">

            {/* Initial Command line */}
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

            {/* Check results */}
            {visibleChecks > 0 && (
              <div className="space-y-2" aria-hidden="true">
                {checks.slice(0, visibleChecks).map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs md:text-sm"
                  >
                    <span>✓</span>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Quick Contact Links */}
            {showLinks && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-3 pt-2"
              >
                {lines.map((line) => {
                  const key = line.type === "comment" ? line.text : line.cmd;

                  if (line.type === "comment") {
                    return (
                      <motion.p
                        key={key}
                        variants={lineVariants}
                        className="text-neutral-500 dark:text-gray-500 text-xs"
                      >
                        {line.text}
                      </motion.p>
                    );
                  }

                  return (
                    <motion.div key={key} variants={lineVariants}>
                      <a
                        href={line.href}
                        target={line.external ? "_blank" : undefined}
                        rel={line.external ? "noopener noreferrer" : undefined}
                        aria-label={line.ariaLabel}
                        className="group flex flex-wrap items-center gap-2 md:gap-3 py-1.5 -mx-2 px-2 rounded-lg
                                   transition-all duration-200 hover:translate-x-1"
                        style={{
                          background: "transparent"
                        }}
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
                                      dark:group-hover:text-white transition-colors duration-150 break-all text-xs md:text-sm ${
                                        line.cmd === "email" ? "group-hover:underline" : ""
                                      }`}
                        >
                          {line.value}
                        </span>

                        {/* Copy button */}
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
              </motion.div>
            )}

            {/* Shell History Log */}
            {history.map((log, index) => (
              <div key={index} className="space-y-1">
                {log.type === "input" ? (
                  <div className="flex items-center gap-2 text-neutral-700 dark:text-gray-300">
                    <span className="text-purple-600 dark:text-purple-400">➜</span>
                    <span className="text-indigo-600 dark:text-indigo-300">~</span>
                    <span>{log.text}</span>
                  </div>
                ) : (
                  <div className="text-neutral-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed text-xs md:text-sm pl-4 border-l border-indigo-500/20">
                    {log.html ? log.html : log.text}
                  </div>
                )}
              </div>
            ))}

            {/* Interactive Shell Input Form */}
            {showLinks && (
              <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-2">
                <span className="text-purple-600 dark:text-purple-400">➜</span>
                <span className="text-indigo-600 dark:text-indigo-300">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-neutral-800 dark:text-white caret-indigo-500 font-mono text-sm md:text-base p-0"
                  placeholder="type command (e.g. help)"
                  autoCapitalize="off"
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            )}
            <div ref={historyEndRef} />
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          viewport={{ once: true }}
          className="text-xs text-neutral-500 dark:text-gray-500 mt-6 font-mono text-center md:text-left"
        >
          # usually responds within a day or two
        </motion.p>
      </div>
    </section>
  );
}


