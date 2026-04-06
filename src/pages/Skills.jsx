import * as SiIcons from "react-icons/si";
import * as TbIcons from "react-icons/tb";
import { motion } from "framer-motion";

const skillsData = [
  { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
  { name: "React.js", icon: "SiReact", color: "#61DAFB" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4" },
  { name: "HTML", icon: "SiHtml5", color: "#E34F26" },
  { name: "Node.js", icon: "SiNodedotjs", color: "#339933" },
  { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
  { name: "PostgreSQL", icon: "SiPostgresql", color: "#00599C" },
  { name: "GitHub", icon: "SiGithub", color: "#000000" },
  { name: "Postman", icon: "SiPostman", color: "#FF6C37" },
  { name: "REST APIs", icon: "TbApi", color: "#000000" },
  { name: "C++", icon: "SiCplusplus", color: "#00599C" },
  { name: "Express.js", icon: "SiExpress", color: "#000000" },
  { name: "JWT", icon: "TbApi", color: "#000000" },
  { name: "Git", icon: "SiGit", color: "#F05032" },
];

const Icon = ({ name, color, size }) => {
  const IconComponent = SiIcons[name] || TbIcons[name];
  if (!IconComponent) return null;

  const isPureBlack = color?.toLowerCase() === "#000000";

  return isPureBlack
    ? <IconComponent size={size} />
    : <IconComponent color={color} size={size} />;
};

/* container animation */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

/* each card animation */
const item = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 scroll-mt-12">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 text-center mb-10"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-3">Skills</h2>
        <p className="text-gray-400 uppercase tracking-widest text-xs">
          I CONSTANTLY TRY TO IMPROVE AND LEARN NEW THINGS
        </p>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
      >
        {skillsData.map(({ name, icon, color }, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="h-[65px] flex flex-col items-center justify-center gap-1
            bg-white/5 border border-white/10 rounded-md
            hover:bg-white/10 hover:border-white/20
            transition duration-300 cursor-pointer"
          >
            <Icon name={icon} color={color} size={20} />
            <span className="text-[11px] font-medium">{name}</span>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}