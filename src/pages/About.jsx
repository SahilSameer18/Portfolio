import { motion } from "framer-motion";
import ais from "../assets/about2.png";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center pt-24 pb-10 scroll-mt-12"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">

        {/* Left: Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          
        >
          <div className="relative">
            <motion.div
            
              className="w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-lg"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={ais}
                alt="Sahil Sameer Siddique"
                className="w-full h-full object-contain"
              />
            </motion.div>

          </div>
        </motion.div>

        {/* Right: Text */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Me
          </motion.h2>

          <motion.p
            className="text-gray-300 max-w-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            I'm Sahil Sameer Siddique, a passionate Full Stack Developer with
            experience building modern, scalable, and responsive web
            applications. I love transforming ideas into interactive digital
            experiences.
          </motion.p>

          <motion.p
            className="text-gray-300 max-w-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            I enjoy working with technologies like React, Node.js, Express.js,
            Tailwind CSS, and more. I am constantly learning new tools and
            techniques to deliver high-quality projects.
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
}