import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import pic from "../assets/pic2.jpg";
import resume from "../assets/sameer-resume.pdf";

export default function Header() {
  const titles = ["Full Stack Developer", "Software Developer"];
  const [currentTitle, setCurrentTitle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <motion.p
            className="text-indigo-400 font-medium"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Hello 👋 I'm
          </motion.p>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            Sahil Sameer Siddique
          </motion.h1>

          {/* Animated Title */}
          <div className="h-8">
            <AnimatePresence mode="wait">
              <motion.h2
                key={titles[currentTitle]}
                className="text-xl md:text-2xl text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1.42 }}
              >
                {titles[currentTitle]}
              </motion.h2>
            </AnimatePresence>
          </div>

          <motion.p
            className="text-gray-400 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            I build modern, responsive and high-performance web applications
            using React and modern web technologies.
          </motion.p>

          {/* Button */}
          <motion.a href={resume} target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-500 rounded-full text-white cursor-pointer"
            >
              <p className="relative h-6 overflow-hidden">
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                  Resume
                </span>

                <span className="absolute inset-x-0 top-full block text-center transition-transform duration-300 group-hover:translate-y-[-100%]">
                  Resume
                </span>
              </p>
            </motion.button>
          </motion.a>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="relative">
            <motion.img
              src={pic}
              alt="Sahil Sameer Siddique profile photo"
              className="w-72 md:w-96 rounded-full border border-white/10 shadow-lg"
              whileHover={{ scale: 1.05 }}
            />

            {/* Glow */}
            <div className="absolute -inset-2 bg-indigo-500/20 blur-2xl -z-10 rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
