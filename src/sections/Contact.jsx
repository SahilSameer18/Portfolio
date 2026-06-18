import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";

const lines = [
  { type: "comment", text: "// reach out through any channel" },
  {
    type: "entry",
    icon: FaEnvelope,
    cmd: "email",
    value: "sahilsameer.dev18@gmail.com",
    href: "mailto:sahilsameer.dev18@gmail.com",
    external: false,
  },
  {
    type: "entry",
    icon: FaLinkedin,
    cmd: "linkedin",
    value: "/in/sahil-sameer-siddique",
    href: "https://www.linkedin.com/in/sahil-sameer-siddique/",
    external: true,
  },
  {
    type: "entry",
    icon: FaGithub,
    cmd: "github",
    value: "@SahilSameer18",
    href: "https://github.com/SahilSameer18",
    external: true,
  },
  {
    type: "entry",
    icon: FaInstagram,
    cmd: "instagram",
    value: "@yourinstagram",
    href: "https://instagram.com/yourinstagram",
    external: true,
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.25 } },
};

const lineVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

export default function Contact() {
  const [typed, setTyped] = useState(0);
  const fullText = "contact --list";

  useEffect(() => {
    const interval = setInterval(() => {
      setTyped((prev) => {
        if (prev >= fullText.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center py-20 md:py-28 scroll-mt-12"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12 w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-6"
        >
          Get in touch
        </motion.p>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-3 text-xs text-gray-500 font-mono">
              sahil@portfolio: ~
            </span>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 font-mono text-sm md:text-base space-y-4">
            {/* Typed command line */}
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-purple-400">➜</span>
              <span className="text-indigo-300">~</span>
              <span>
                {fullText.slice(0, typed)}
                <span className="inline-block w-2 h-4 bg-indigo-400 ml-0.5 align-middle animate-pulse" />
              </span>
            </div>

            {typed >= fullText.length && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-3 pt-2"
              >
                {lines.map((line, i) =>
                  line.type === "comment" ? (
                    <motion.p
                      key={i}
                      variants={lineVariants}
                      className="text-gray-500 text-xs md:text-sm"
                    >
                      {line.text}
                    </motion.p>
                  ) : (
                    <motion.a
                      key={i}
                      variants={lineVariants}
                      href={line.href}
                      target={line.external ? "_blank" : undefined}
                      rel={line.external ? "noopener noreferrer" : undefined}
                      className="group flex flex-wrap items-center gap-2 md:gap-3 py-1.5 -mx-2 px-2 rounded-lg hover:bg-white/[0.04] transition-colors duration-200"
                    >
                      <line.icon className="text-indigo-400 flex-shrink-0" style={{ fontSize: "14px" }} />
                      <span className="text-purple-400">{line.cmd}</span>
                      <span className="text-gray-500">:</span>
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-200 break-all">
                        {line.value}
                      </span>
                    </motion.a>
                  )
                )}

                <motion.div
                  variants={lineVariants}
                  className="flex items-center gap-2 text-gray-300 pt-2"
                >
                  <span className="text-purple-400">➜</span>
                  <span className="text-indigo-300">~</span>
                  <span className="inline-block w-2 h-4 bg-indigo-400/70 ml-0.5 align-middle animate-pulse" />
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-xs text-gray-500 mt-6 font-mono"
        >
          # usually responds within a day or two
        </motion.p>
      </div>
    </section>
  );
}