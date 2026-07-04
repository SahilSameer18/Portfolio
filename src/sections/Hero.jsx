import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import pic from "../assets/pic2.webp";

const titles = [
  "Full Stack Developer",
  "Backend Developer",
  "Software Developer",
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Hero() {
  const [currentTitle, setCurrentTitle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-16 items-center">
        {/* ── Left Text ── */}
        <motion.div
          className="space-y-7"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Greeting */}
          <motion.p
            variants={itemVariants}
            className="text-indigo-600 dark:text-indigo-400 font-medium tracking-wide"
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-neutral-900 dark:text-white"
          >
            Sahil Sameer
            <br />
            <span className="bg-gradient-to-r from-indigo-950 via-indigo-600 to-purple-600 dark:from-white/90 dark:via-indigo-400 dark:to-purple-500 bg-clip-text text-transparent">
              Siddique
            </span>
          </motion.h1>

          {/* Rotating Title */}
          <motion.div variants={itemVariants} className="h-7">
            <AnimatePresence mode="wait">
              <motion.p
                key={titles[currentTitle]}
                className="text-base md:text-lg font-medium tracking-wide bg-gradient-to-r from-indigo-950 via-indigo-600 to-purple-700 dark:from-white/90 dark:via-indigo-500 dark:to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {titles[currentTitle]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Divider Lines (Rounded Ends) */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3"
          >
            <div className="h-px w-12 bg-gradient-to-r from-indigo-600 to-purple-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-500" />
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-neutral-600 dark:text-gray-400 max-w-md leading-relaxed"
          >
            I build AI-powered, production-ready web apps using the MERN stack
            and PostgreSQL - from scalable REST APIs to Gemini AI integration.
          </motion.p>

          {/* Resume Button */}
          <motion.div variants={itemVariants}>
            <motion.a
              href="/my-resume.pdf"
              download="Sahil-Sameer-Resume.pdf"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-sm bg-gradient-to-r from-indigo-600 to-purple-500 shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_4px_32px_rgba(99,102,241,0.55)] transition-shadow duration-300"
            >
              {/* Download Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4"
                />
              </svg>

              {/* Text */}
              <span className="relative h-5 overflow-hidden flex flex-col">
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                  Resume
                </span>
                <span className="absolute top-full block transition-transform duration-300 group-hover:-translate-y-full">
                  Resume
                </span>
              </span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── Right Image ── */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative will-change-transform"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-full -z-10 bg-gradient-radial from-indigo-500/10 to-transparent blur-3xl scale-125" />

            {/* Profile Image */}
            <motion.img
              src={pic}
              alt="Sahil Sameer Siddique"
              loading="eager"
              fetchPriority="high"
              className="w-72 h-72 md:w-[22rem] md:h-[22rem] rounded-full object-cover border border-neutral-900/10 dark:border-white/10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}