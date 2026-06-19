import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram, FaArrowUp } from "react-icons/fa";

// ─── Social Links ─────────────────────────────────────────────────────────────
const socials = [
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/sahil-sameer-siddique/",
    label: "LinkedIn",
    color: "#0077B5",
  },
  {
    icon: FaGithub,
    href: "https://github.com/SahilSameer18",
    label: "GitHub",
    color: "#c4c4c4",
  },
  // {
  //   icon: FaInstagram,
  //   href: "https://instagram.com/yourinstagram",
  //   label: "Instagram",
  //   color: "#E1306C",
  // },
];

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer
      className="py-4 md:py-8 px-6 md:px-12"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(0,0,0,0.4)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* ── Logo ── */}

        <a
          href="#home"
          className="text-lg font-extrabold select-none hidden md:block"
          style={{
            background: "linear-gradient(135deg, #818cf8, #c084fc, #f472b6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          SS
        </a>

        {/* ── Copyright ── */}
        <p className="text-gray-600 text-xs text-center">
          © {new Date().getFullYear()} Sahil Sameer Siddique. All rights
          reserved.
        </p>

        {/* ── Right: Socials + Back to top ── */}
        <div className="flex items-center gap-5">
          {/* Social icons */}
          {socials.map(({ icon: Icon, href, label, color }) => (
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
              <Icon style={{ color, fontSize: "17px" }} />
            </motion.a>
          ))}

          {/* Divider */}
          <div className="w-px h-4 bg-white/10" />

          {/* Back to top */}
          <motion.a
            href="#home"
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-indigo-400 transition-colors duration-200"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <FaArrowUp style={{ fontSize: "11px" }} />
            Top
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
