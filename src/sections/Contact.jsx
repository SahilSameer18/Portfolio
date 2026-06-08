import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";

// ─── Social Links Data ────────────────────────────────────────────────────────
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
  {
    icon: FaInstagram,
    href: "https://instagram.com/yourinstagram",
    label: "Instagram",
    color: "#E1306C",
  },
];

// ─── Contact Section ──────────────────────────────────────────────────────────
export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center py-20 md:py-28 scroll-mt-12"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-16 items-center">

        {/* ── Left: Heading + Text ── */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Label */}
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Get in touch
          </p>

          {/* Heading */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Let's build
            <br />something
            <br />together.
          </h2>

          {/* Accent divider */}
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-indigo-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
          </div>

          {/* Subtext */}
          <p className="text-gray-400 leading-relaxed max-w-sm">
            I'm open to new opportunities, freelance projects, and meaningful
            collaborations. Feel free to reach out anytime.
          </p>
        </motion.div>

        {/* ── Right: Contact Card ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div
            className="rounded-3xl p-8 md:p-10 space-y-8"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
            }}
          >

            {/* Email */}
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Email
              </p>
              <motion.a
                href="mailto:sahilsameer.dev18@gmail.com"
                className="flex items-center gap-4 group w-fit"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(99,102,241,0.12)",
                    border: "1px solid rgba(99,102,241,0.25)",
                  }}
                >
                  <FaEnvelope className="text-indigo-400" style={{ fontSize: "15px" }} />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200 text-sm">
                  sahilsameer.dev18@gmail.com
                </span>
              </motion.a>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-white/5" />

            {/* Socials */}
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Socials
              </p>
              <div className="flex flex-col gap-3">
                {socials.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group w-fit"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = `${color}15`;
                        e.currentTarget.style.borderColor = `${color}40`;
                        e.currentTarget.style.boxShadow = `0 0 14px ${color}25`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <Icon style={{ color, fontSize: "15px" }} />
                    </div>
                    <span className="text-gray-400 group-hover:text-white transition-colors duration-200 text-sm">
                      {label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            

          </div>
        </motion.div>

      </div>
    </section>
  );
}