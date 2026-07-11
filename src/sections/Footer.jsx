import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaArrowUp } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

// ─── Social Links ─────────────────────────────────────────────────────────────
const socials = [
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/sahil-sameer-siddique/",
    label: "LinkedIn",
    color: "#0077B5",
    lightColor: "#0077B5",
  },
  {
    icon: FaGithub,
    href: "https://github.com/SahilSameer18",
    label: "GitHub",
    color: "#c4c4c4",
    lightColor: "#374151",
  },
];

const navLinks = [
  { label: "Home",     href: "#home"     },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
];

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer
      className="relative pt-10 md:pt-14 pb-6 md:pb-8 px-6 md:px-12 overflow-hidden transition-[background,border-color] duration-300"
      style={{
        background: isDark ? "rgba(0,0,0,0.50)" : "rgba(238,236,250,0.60)",
        backdropFilter:       "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      {/* ── Gradient top border — colorful 3-stop sweep ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #6366f1 20%, #a78bfa 50%, #f472b6 80%, transparent 100%)",
        }}
      />

      {/* ── Soft ambient glow behind content ── */}
      <div
        aria-hidden="true"
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-[36rem] h-[14rem] rounded-full blur-3xl pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at center, rgba(99,102,241,0.20), transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(99,102,241,0.12), transparent 70%)",
          opacity: 0.9,
        }}
      />

      <div className="max-w-6xl mx-auto space-y-5 relative z-10">

        {/* ── Tagline ── */}
        <div className="text-center">
          <p
            className="text-sm font-medium tracking-wide"
            style={{ color: isDark ? "rgba(148,163,184,0.65)" : "rgba(100,116,139,0.75)" }}
          >
            Turning ideas into code, one commit at a time ☕
          </p>
        </div>

        {/* ── Top Row: Logo | Nav | Socials + Top ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Logo */}
          <a
            href="#home"
            className="text-lg font-extrabold select-none"
            style={{
              background: "linear-gradient(135deg, #818cf8, #c084fc, #f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
              backgroundClip:       "text",
            }}
          >
            SS
          </a>

          {/* Quick Nav */}
          <nav className="flex items-center gap-2 text-xs" aria-label="Footer navigation">
            {navLinks.map((link, i) => (
              <span key={link.href} className="flex items-center gap-2">
                {i > 0 && (
                  <span
                    className="w-px h-3"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.15)" : "rgba(99,102,241,0.25)",
                    }}
                    aria-hidden="true"
                  />
                )}
                <a
                  href={link.href}
                  className="text-neutral-500 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </nav>

          {/* Socials + Back to top */}
          <div className="flex items-center gap-5">
            {socials.map(({ icon: Icon, href, label, color, lightColor }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Icon style={{ color: isDark ? color : lightColor, fontSize: "17px" }} />
              </motion.a>
            ))}

            <div
              className="w-px h-4 transition-colors duration-300"
              style={{ background: isDark ? "rgba(255,255,255,0.10)" : "rgba(99,102,241,0.22)" }}
            />

            <motion.a
              href="#home"
              aria-label="Back to top"
              className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <FaArrowUp aria-hidden="true" style={{ fontSize: "11px" }} />
              <span>Top</span>
            </motion.a>
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          className="h-px"
          style={{
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(99,102,241,0.12)",
          }}
        />

        {/* ── Bottom Row: Copyright only ── */}
        <div className="flex items-center justify-center">
          <p className="text-neutral-500 dark:text-gray-600 text-xs text-center transition-colors duration-200">
            © {new Date().getFullYear()} Sahil Sameer Siddique. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

