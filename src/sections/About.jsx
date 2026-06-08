import { motion } from "framer-motion";
import ais from "../assets/about2.png";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center pt-24 pb-10 scroll-mt-12"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center w-full">
        {/* ── Left: Image ── */}
        <motion.div
          className="flex justify-center order-2 md:order-1"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Subtle bob animation */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Subtle glow */}
            <div
              className="absolute -inset-4 rounded-2xl -z-10"
              style={{
                background:
                  "radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            {/* Image */}
            <motion.div
              className="w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(99,102,241,0.2)",
                boxShadow: "0 8px 32px rgba(99,102,241,0.08)",
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={ais}
                alt="Sahil Sameer Siddique"
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Corner accent — top left */}
            <div
              className="absolute -top-2 -left-2 w-10 h-10"
              style={{
                borderTop: "2px solid rgba(99,102,241,0.5)",
                borderLeft: "2px solid rgba(99,102,241,0.5)",
                borderRadius: "8px 0 0 0",
              }}
            />

            {/* Corner accent — bottom right */}
            <div
              className="absolute -bottom-2 -right-2 w-10 h-10"
              style={{
                borderBottom: "2px solid rgba(99,102,241,0.5)",
                borderRight: "2px solid rgba(99,102,241,0.5)",
                borderRadius: "0 0 8px 0",
              }}
            />
          </motion.div>
        </motion.div>

        {/* ── Right: Content ── */}
        <motion.div
          className="space-y-6 order-1 md:order-2"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Heading */}
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            About Me
          </h2>

          {/* Accent divider */}
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-indigo-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
          </div>

          {/* Bio — backend focused */}
          <p className="text-gray-400 max-w-lg leading-relaxed">
            I'm{" "}
            <span className="text-white font-medium">
              Sahil Sameer Siddique
            </span>
            , a Full Stack Developer with a deep focus on backend engineering. I
            specialise in building scalable REST APIs, JWT authentication with
            refresh token rotation, and architecting databases for performance
            and reliability.
          </p>

          <p className="text-gray-400 max-w-lg leading-relaxed">
            My stack includes <span className="text-indigo-300">Node.js</span>,{" "}
            <span className="text-indigo-300">Express.js</span>,{" "}
            <span className="text-indigo-300">MongoDB</span>,{" "}
            <span className="text-indigo-300">PostgreSQL</span>, and{" "}
            <span className="text-indigo-300">Prisma</span> on the backend, with{" "}
            <span className="text-indigo-300">React</span> and{" "}
            <span className="text-indigo-300">Tailwind CSS</span> on the
            frontend. I've shipped production platforms like{" "}
            <span className="text-white font-medium">PrepStack</span> and{" "}
            <span className="text-white font-medium">SkillBridgeAI</span>, both
            live and integrated with the{" "}
            <span className="text-indigo-300">Gemini API</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
