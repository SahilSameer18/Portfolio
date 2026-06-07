import * as SiIcons from "react-icons/si";
import * as TbIcons from "react-icons/tb";
import { motion } from "framer-motion";

const skillsData = [
  { name: "JavaScript",  icon: "SiJavascript",    color: "#C9B832", category: "Language" },
  { name: "TypeScript",  icon: "SiTypescript",    color: "#3178C6", category: "Language" },
  { name: "C++",         icon: "SiCplusplus",     color: "#5B9BD5", category: "Language" },
  { name: "React.js",    icon: "SiReact",         color: "#4DB8D4", category: "Frontend" },
  { name: "Tailwind CSS",icon: "SiTailwindcss",   color: "#0891A8", category: "Frontend" },
  { name: "HTML",        icon: "SiHtml5",         color: "#B84020", category: "Frontend" },
  { name: "CSS",         icon: "SiCss",           color: "#2965A8", category: "Frontend" },
  { name: "Node.js",     icon: "SiNodedotjs",     color: "#27762A", category: "Backend"  },
  { name: "Express.js",  icon: "SiExpress",       color: "#a5b4fc", category: "Backend"  },
  { name: "REST APIs",   icon: "TbWorldWww",      color: "#a5b4fc", category: "Backend"  },
  { name: "JWT",         icon: "SiJsonwebtokens", color: "#a5b4fc", category: "Backend"  },
  { name: "Zod",         icon: "SiZod",           color: "#a5b4fc", category: "Backend"  },
  { name: "MongoDB",     icon: "SiMongodb",       color: "#338A30", category: "Database" },
  { name: "PostgreSQL",  icon: "SiPostgresql",    color: "#5B9BD5", category: "Database" },
  { name: "Prisma",      icon: "SiPrisma",        color: "#a5b4fc", category: "Database" },
  { name: "Git",         icon: "SiGit",           color: "#C04020", category: "Tools"    },
  { name: "GitHub",      icon: "SiGithub",        color: "#c4c4c4", category: "Tools"    },
  { name: "Postman",     icon: "SiPostman",       color: "#CC5520", category: "Tools"    },
  { name: "Vercel",      icon: "SiVercel",        color: "#c4c4c4", category: "Tools"    },
  { name: "Render",      icon: "SiRender",        color: "#a5b4fc", category: "Tools"    },
];

const categories = ["Language", "Frontend", "Backend", "Database", "Tools"];

const categoryAccents = {
  Language: "#6366f1",
  Frontend: "#4DB8D4",
  Backend:  "#a5b4fc",
  Database: "#338A30",
  Tools:    "#CC5520",
};

const Icon = ({ name, color, size }) => {
  const IconComponent = SiIcons[name] || TbIcons[name];
  if (!IconComponent) return null;
  return <IconComponent color={color} size={size} />;
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
};

const item = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.3 } },
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 scroll-mt-12">
      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Skills
          </h2>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-5">
            Technologies I work with
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-500/50" />
          </div>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, ci) => {
            const catSkills = skillsData.filter(s => s.category === category);
            if (!catSkills.length) return null;
            const accent = categoryAccents[category];

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: ci * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-1 h-5 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <p className="text-sm font-semibold uppercase tracking-widest text-gray-300">
                    {category}
                  </p>
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="text-xs text-gray-600">{catSkills.length}</span>
                </div>

                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2.5"
                >
                  {catSkills.map(({ name, icon, color }) => (
                    <motion.div
                      key={name}
                      variants={item}
                      whileHover={{
                        y: -4,
                        scale: 1.04,
                        transition: { duration: 0.2 },
                      }}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-default select-none"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: `1px solid rgba(255,255,255,0.07)`,
                        backdropFilter: "blur(8px)",
                        boxShadow: `0 0 0 0 ${color}00`,
                        transition: "box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.boxShadow = `0 0 18px 2px ${color}30`;
                        e.currentTarget.style.borderColor = `${color}50`;
                        e.currentTarget.style.background = `${color}10`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = "0 0 0 0 transparent";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                      }}
                    >
                      <Icon name={icon} color={color} size={19} />
                      <span className="text-sm font-medium text-gray-200 whitespace-nowrap">
                        {name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}