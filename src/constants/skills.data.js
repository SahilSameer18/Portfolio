import {
  SiJavascript,
  SiCplusplus,
  SiReact,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiSocketdotio,
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
  SiGoogle,
} from "react-icons/si";
import { TbWorldWww, TbDatabase, TbSparkles, TbLayersIntersect, TbCpu, TbFilter } from "react-icons/tb";

export const skillsData = [
  { name: "JavaScript",     icon: "SiJavascript",    color: "#F7DF1E", category: "Language" },
  { name: "C++",            icon: "SiCplusplus",     color: "#00599C", category: "Language" },
  { name: "React.js",       icon: "SiReact",         color: "#61DAFB", category: "Frontend" },
  { name: "Tailwind CSS",   icon: "SiTailwindcss",   color: "#06B6D4", category: "Frontend" },
  { name: "HTML",           icon: "SiHtml5",         color: "#E34F26", category: "Frontend" },
  { name: "CSS",            icon: "SiCss",           color: "#1572B6", category: "Frontend" },
  { name: "Node.js",        icon: "SiNodedotjs",     color: "#339933", category: "Backend" },
  { name: "Express.js",     icon: "SiExpress",       color: "#FFFFFF", category: "Backend" },
  { name: "Socket.io",      icon: "SiSocketdotio",   color: "#010101", category: "Backend" },
  { name: "REST APIs",      icon: "TbWorldWww",      color: "#38BDF8", category: "Backend" },
  { name: "JWT",            icon: "SiJsonwebtokens", color: "#D63AFF", category: "Backend" },
  { name: "OAuth / Google", icon: "SiGoogle",        color: "#4285F4", category: "Backend" },
  { name: "Zod",            icon: "SiZod",           color: "#3068B7", category: "Backend" },
  { name: "Gemini AI",      icon: "TbSparkles",      color: "#8E75B2", category: "AI & APIs" },
  { name: "MongoDB",        icon: "SiMongodb",       color: "#47A248", category: "Databases & ORM" },
  { name: "PostgreSQL",     icon: "SiPostgresql",    color: "#4169E1", category: "Databases & ORM" },
  { name: "Prisma",         icon: "SiPrisma",        color: "#2D3748", category: "Databases & ORM" },
  { name: "Neon",           icon: "TbDatabase",      color: "#00E599", category: "Databases & ORM" },
  { name: "Git",            icon: "SiGit",           color: "#F05032", category: "Tools & DevOps" },
  { name: "GitHub",         icon: "SiGithub",        color: "#FFFFFF", category: "Tools & DevOps" },
  { name: "Postman",        icon: "SiPostman",       color: "#FF6C37", category: "Tools & DevOps" },
  { name: "Vercel",         icon: "SiVercel",        color: "#FFFFFF", category: "Tools & DevOps" },
  { name: "Render",         icon: "SiRender",        color: "#46E3B7", category: "Tools & DevOps" },
];

export const skillCategories = [
  "Frontend",
  "Backend",
  "Language",
  "AI & APIs",
  "Databases & ORM",
  "Tools & DevOps",
];

export const skillCategoryAccents = {
  "Language":        "#6366f1",
  "Frontend":        "#4DB8D4",
  "Backend":         "#818cf8",
  "AI & APIs":       "#c084fc",
  "Databases & ORM": "#34d399",
  "Tools & DevOps":  "#fb923c",
};

export const skillCategoryBentoSpans = {
  "Frontend":        "md:col-span-2",
  "Backend":         "md:col-span-2",
  "Language":        "md:col-span-1",
  "AI & APIs":       "md:col-span-1",
  "Databases & ORM": "md:col-span-1",
  "Tools & DevOps":  "md:col-span-1",
};

export const skillCoreStackNames = ["JavaScript", "Node.js", "React.js", "PostgreSQL"];



