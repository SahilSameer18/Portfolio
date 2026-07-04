import {
  SiJavascript,
  SiCplusplus,
  SiReact,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiJsonwebtokens,
  SiZod,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiRender,
} from "react-icons/si";
import { TbWorldWww, TbDatabase } from "react-icons/tb";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const skillsData = [
  {
    name: "JavaScript",
    icon: "SiJavascript",
    color: "#F7DF1E",
    category: "Language",
  },
  // { name: "TypeScript",  icon: "SiTypescript",    color: "#3178C6", category: "Language" },
  { name: "C++", icon: "SiCplusplus", color: "#00599C", category: "Language" },
  { name: "React.js", icon: "SiReact", color: "#61DAFB", category: "Frontend" },
  {
    name: "Tailwind CSS",
    icon: "SiTailwindcss",
    color: "#06B6D4",
    category: "Frontend",
  },
  { name: "HTML", icon: "SiHtml5", color: "#E34F26", category: "Frontend" },
  { name: "CSS", icon: "SiCss", color: "#1572B6", category: "Frontend" },
  {
    name: "Node.js",
    icon: "SiNodedotjs",
    color: "#339933",
    category: "Backend",
  },
  {
    name: "Express.js",
    icon: "SiExpress",
    color: "#FFFFFF",
    category: "Backend",
  },
  {
    name: "REST APIs",
    icon: "TbWorldWww",
    color: "#38BDF8",
    category: "Backend",
  },
  {
    name: "JWT",
    icon: "SiJsonwebtokens",
    color: "#D63AFF",
    category: "Backend",
  },
  { name: "Zod", icon: "SiZod", color: "#3068B7", category: "Backend" },
  {
    name: "MongoDB",
    icon: "SiMongodb",
    color: "#47A248",
    category: "Databases & ORM",
  },
  {
    name: "PostgreSQL",
    icon: "SiPostgresql",
    color: "#4169E1",
    category: "Databases & ORM",
  },
  {
    name: "Prisma",
    icon: "SiPrisma",
    color: "#2D3748",
    category: "Databases & ORM",
  },
  // { name: "Redis",       icon: "SiRedis",         color: "#DC382D", category: "Databases & ORM" },
  {
    name: "Neon",
    icon: "TbDatabase",
    color: "#00E599",
    category: "Databases & ORM",
  },
  { name: "Git", icon: "SiGit", color: "#F05032", category: "Tools & DevOps" },
  {
    name: "GitHub",
    icon: "SiGithub",
    color: "#FFFFFF",
    category: "Tools & DevOps",
  },
  {
    name: "Postman",
    icon: "SiPostman",
    color: "#FF6C37",
    category: "Tools & DevOps",
  },
  {
    name: "Vercel",
    icon: "SiVercel",
    color: "#FFFFFF",
    category: "Tools & DevOps",
  },
  {
    name: "Render",
    icon: "SiRender",
    color: "#46E3B7",
    category: "Tools & DevOps",
  },
  // { name: "Docker",      icon: "SiDocker",        color: "#2496ED", category: "Tools & DevOps"  },
];

const categories = [
  "Language",
  "Frontend",
  "Backend",
  "Databases & ORM",
  "Tools & DevOps",
];

const categoryAccents = {
  Language: "#6366f1",
  Frontend: "#4DB8D4",
  Backend: "#a5b4fc",
  "Databases & ORM": "#338A30",
  "Tools & DevOps": "#CC5520",
};

const Icon = ({ name, color, size }) => {
  const iconMap = {
    SiJavascript,
    SiCplusplus,
    SiReact,
    SiTailwindcss,
    SiHtml5,
    SiCss,
    SiNodedotjs,
    SiExpress,
    SiJsonwebtokens,
    SiZod,
    SiMongodb,
    SiPostgresql,
    SiPrisma,
    SiGit,
    SiGithub,
    SiPostman,
    SiVercel,
    SiRender,
    TbWorldWww,
    TbDatabase,
  };

  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent color={color} size={size} />;
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
};

const item = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
};

export default function Skills() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
              background:
                "linear-gradient(135deg, var(--heading-grad-start) 0%, var(--heading-grad-mid) 50%, var(--heading-grad-end) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Skills
          </h2>
          <p className="text-neutral-500 text-xs uppercase tracking-widest mb-5">
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
            const catSkills = skillsData.filter((s) => s.category === category);
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
                  <p className="text-sm font-semibold uppercase tracking-widest text-neutral-600 dark:text-gray-300">
                    {category}
                  </p>
                  <div className="flex-1 h-px bg-neutral-200 dark:bg-white/5" />
                  <span className="text-xs text-neutral-400 dark:text-gray-600">
                    {catSkills.length}
                  </span>
                </div>

                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2.5"
                >
                  {catSkills.map(({ name, icon, color }) => {
                    const iconColor = (name === "Express.js" || name === "GitHub" || name === "Vercel" || name === "Prisma") && theme === "light"
                      ? "#09090b"
                      : name === "Prisma" && theme === "dark"
                      ? "#a5b4fc"
                      : color;

                    return (
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
                          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.55)",
                          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.85)"}`,
                          backdropFilter: "blur(12px)",
                          WebkitBackdropFilter: "blur(12px)",
                          boxShadow: isDark
                            ? "none"
                            : "0 2px 8px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
                          transition: "box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = isDark
                            ? `0 0 20px 4px ${color}30`
                            : `0 0 22px 4px ${color}55, 0 4px 16px ${color}30`;
                          e.currentTarget.style.borderColor = `${color}99`;
                          e.currentTarget.style.background = isDark ? `${color}12` : `${color}15`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = isDark
                            ? "none"
                            : "0 2px 8px rgba(99,102,241,0.08), inset 0 1px 0 rgba(255,255,255,0.7)";
                          e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.85)";
                          e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.55)";
                        }}
                      >
                        <Icon name={icon} color={iconColor} size={19} />
                        <span className="text-sm font-medium text-neutral-800 dark:text-gray-200 whitespace-nowrap transition-colors duration-300">
                          {name}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}