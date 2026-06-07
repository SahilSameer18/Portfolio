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
          className="flex justify-center"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <div
              className="w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(99,102,241,0.2)",
                boxShadow: "0 8px 32px rgba(99,102,241,0.1)",
              }}
            >
              <img
                src={ais}
                alt="Sahil Sameer Siddique"
                className="w-full h-full object-contain"
              />
            </div>
            <div
              className="absolute -inset-4 rounded-2xl -z-10"
              style={{
                background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)",
                filter: "blur(20px)",
              }}
            />
          </div>
        </motion.div>

        {/* ── Right: Content ── */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Heading */}
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            About Me
          </h2>

          {/* Accent divider — matches rest of portfolio */}
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-indigo-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
          </div>

          {/* Bio */}
          <p className="text-gray-400 max-w-lg leading-relaxed">
            I'm{" "}
            <span className="text-white font-medium">Sahil Sameer Siddique</span>
            , a Full Stack Developer with a strong backend focus. I specialise
            in designing and building robust server-side systems — REST APIs,
            JWT authentication, database architecture, and scalable backend
            infrastructure.
          </p>

          <p className="text-gray-400 max-w-lg leading-relaxed">
            On the backend I work with{" "}
            <span className="text-indigo-300">Node.js</span>,{" "}
            <span className="text-indigo-300">Express.js</span>,{" "}
            <span className="text-indigo-300">MongoDB</span>,{" "}
            <span className="text-indigo-300">PostgreSQL</span>, and{" "}
            <span className="text-indigo-300">Prisma ORM</span>. On the frontend
            I build clean, responsive interfaces with{" "}
            <span className="text-indigo-300">React</span> and{" "}
            <span className="text-indigo-300">Tailwind CSS</span>. I also
            integrate AI capabilities using the{" "}
            <span className="text-indigo-300">Gemini API</span>.
          </p>

          <p className="text-gray-400 max-w-lg leading-relaxed">
            I've shipped production-ready platforms like{" "}
            <span className="text-white font-medium">PrepStack</span> and{" "}
            <span className="text-white font-medium">SkillBridge</span>, and I'm
            constantly pushing to write cleaner, more secure, and more
            performant code.
          </p>

        </motion.div>
      </div>
    </section>
  );
}