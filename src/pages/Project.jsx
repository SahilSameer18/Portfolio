import { motion } from "framer-motion";
import safar from "../assets/safar.png";
import thumblify from "../assets/thumblify.png";
import { FaGithub } from "react-icons/fa";
import skillbridgeAI from '../assets/skillbridgeAI.png'

const projects = [
  {
    title: "SafarAI",
    description:
      "An intelligent trip planning application that uses AI to create personalized travel itineraries based on user preferences, budget, and interests.",
    link: "https://www.safarai.in/",
    techStack: ["React", "Tailwind CSS", "Firebase", "Gemini AI"],
    image: safar,
  },
  {
    title: "SkillBridgeAI",
    description:
      "Helps users prepare effectively for interviews based on submitted profiles, providing personalized questions, a tailored preparation plan, and skill gap insights.",
    link: "https://skillbridgeai-s.vercel.app/",
    techStack: ["React", "Tailwind CSS", "Express", "Gemini AI"],
    image: skillbridgeAI,
  },
  {
    title: "Thumblify",
    description:
      "A smart tool that creates custom, eye-catching thumbnails instantly using artificial intelligence. Designed to enhance visual content and streamline creative workflows.",
    link: "https://github.com/SahilSameer18",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    image: thumblify,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen flex flex-col">

      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-5xl md:text-6xl font-bold">My Projects</h2>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">

        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, x: idx % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >

            {/* Project Image */}
            <motion.div
              className="flex justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <motion.img
                  src={project.image}
                  alt={`Screenshot showcasing the ${project.title} project`}
                  className="w-72 md:w-96 rounded-2xl border border-white/10 shadow-lg object-cover"
                />

                <div className="absolute -inset-2 bg-indigo-500/20 blur-2xl -z-10 rounded-2xl"></div>
              </div>
            </motion.div>

            {/* Project Details */}
            <div className="space-y-4">
              <motion.h3
                className="text-3xl font-bold text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                {project.title}
              </motion.h3>

              <p className="text-gray-300 max-w-lg">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1 bg-indigo-600/30 text-indigo-200 rounded-full text-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="inline-block mt-2 text-indigo-400 hover:text-indigo-500 font-medium"
              >
                View Project →
              </motion.a>
            </div>

          </motion.div>
        ))}

      </div>

      {/* Github Button */}
      <motion.div
        className="flex flex-col items-center mt-16 gap-4 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-gray-300">
          Explore more projects and open-source contributions on my GitHub
        </p>

        <motion.a
          href="https://github.com/SahilSameer18"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-5 py-3.5 rounded-full 
          border border-slate-600 hover:bg-slate-800 
          text-white font-semibold shadow-lg"
        >
          <FaGithub className="text-xl" />
          See More Projects
        </motion.a>
      </motion.div>

    </section>
  );
}
