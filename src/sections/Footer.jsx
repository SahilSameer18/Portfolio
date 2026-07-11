import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaArrowUp, FaHeart } from "react-icons/fa";
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
  { label: "Home",     href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer
      className="py-6 md:py-8 px-6 md:px-12 transition-[background,border-color] duration-300"
      style={{
        borderTop: isDark
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid rgba(99,102,241,0.18)",
        background: isDark ? "rgba(0,0,0,0.40)" : "rgba(238,236,250,0.55)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <div className="max-w-6xl mx-auto space-y-4">

        {/* ── Top Row: Logo | Nav | Socials+Top ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Logo — visible on all screens */}
          <a
            href="#home"
            className="text-lg font-extrabold select-none"
            style={{
              background: "linear-gradient(135deg, #818cf8, #c084fc, #f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
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

        {/* ── Bottom Row: Copyright ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-neutral-500 dark:text-gray-600 text-xs text-center transition-colors duration-200">
            © {new Date().getFullYear()} Sahil Sameer Siddique. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
