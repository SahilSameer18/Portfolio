import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen text-white py-20 md:py-28 px-6 md:px-12 scroll-mt-12"
    >
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-5xl md:text-6xl font-bold">Contact Me</h2>
        <p className="text-xs tracking-widest text-white/60 mt-2">
          GET IN TOUCH
        </p>
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/30">
          <p className="text-white/70 leading-relaxed text-base md:text-lg">
            I'm currently open to new opportunities, freelance projects, and meaningful collaborations. If you'd like to connect, just send a message to the email below and I will get back to you as soon as possible.
          </p>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-indigo-500 text-3xl" />
              <span className="break-words text-sm sm:text-base">
                sahilsameer.dev18@gmail.com
              </span>
            </div>

            <div className="flex gap-5 justify-center sm:justify-end">
              {[
                { icon: FaLinkedin, href: "https://www.linkedin.com/in/sahil-sameer-siddique/", color: "#0077B5" },
                { icon: FaGithub, href: "https://github.com/SahilSameer18", color: "#ffffff" },
                { icon: FaInstagram, href: "https://instagram.com/yourinstagram", color: "#E1306C" },
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="text-3xl"
                    style={{ color: social.color }}
                  >
                    <Icon />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
