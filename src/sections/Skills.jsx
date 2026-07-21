import { useState } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import GlitchText from "../components/GlitchText";
import { skillsData, skillCategories as categories, skillCategoryAccents as categoryAccents, skillCategoryBentoSpans as categoryBentoSpans, skillCoreStackNames as coreStackNames } from "../constants/skills.data";

// Icon component mapping

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
    TbWorldWww,
    TbDatabase,
    TbSparkles,
  };

  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent color={color} size={size} />;
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Skills() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeCategory, setActiveCategory] = useState("All");

  const coreStack = skillsData.filter((s) => coreStackNames.includes(s.name));

  const filteredCategories =
    activeCategory === "All"
      ? categories
      : categories.filter((c) => c === activeCategory);

  return (
    <section id="skills" className="min-h-screen py-24 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full space-y-12">

        {/* Heading */}
        <div className="mb-16 text-center">
          <h2
            className="text-5xl md:text-6xl font-bold mb-4 text-gradient-heading"
          >
            <GlitchText text="Skills" />
          </h2>
          <p className="text-neutral-500 text-xs uppercase tracking-widest mb-5">
            Technologies I work with
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-500/50" />
          </div>
        </div>

        {/* ── MOBILE VIEW (< lg): Clean Pill Rows Layout ── */}
        <div className="lg:hidden space-y-8">
          {categories.map((category, ci) => {
            const catSkills = skillsData.filter((s) => s.category === category);
            if (!catSkills.length) return null;
            const accent = categoryAccents[category];

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: ci * 0.05 }}
                viewport={{ once: true }}
                style={{ willChange: "transform, opacity" }}
              >
                {/* Category Bar */}
                <div className="flex items-center gap-3 mb-3.5">
                  <div
                    className="w-1.5 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: accent }}
                  />
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-700 dark:text-gray-300">
                    {category}
                  </p>
                  <div className="flex-1 h-px bg-neutral-200 dark:bg-white/10" />
                  <span className="text-xs text-neutral-400 dark:text-gray-500 font-medium">
                    {catSkills.length}
                  </span>
                </div>

                {/* Skill Pills */}
                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2.5"
                >
                  {catSkills.map(({ name, icon, color }) => {
                    const iconColor =
                      (name === "Express.js" || name === "GitHub" || name === "Vercel" || name === "Prisma" || name === "Socket.io") && theme === "light"
                        ? "#09090b"
                        : (name === "Socket.io") && theme === "dark"
                        ? "#ffffff"
                        : name === "Prisma" && theme === "dark"
                        ? "#a5b4fc"
                        : color;

                    return (
                      <motion.div
                        key={name}
                        variants={item}
                        whileHover={{ scale: 1.03, y: -2 }}
                        className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-neutral-200/50 dark:border-white/5 bg-white/70 dark:bg-white/5 hover:border-indigo-500/30 transition-colors duration-300 shadow-sm"
                      >
                        <div className="flex-shrink-0">
                          <Icon name={icon} color={iconColor} size={18} />
                        </div>
                        <span className="text-xs font-medium text-neutral-800 dark:text-gray-200 whitespace-nowrap">
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


        {/* ── DESKTOP VIEW (>= lg): Asymmetric Split Canvas ── */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 items-start">

          {/* ── LEFT STICKY COLUMN (4 Cols / ~33% width) ── */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 space-y-6 z-10">
            
            {/* Architecture Focus Card */}
            <motion.div
              className="p-6 rounded-2xl bg-white/70 dark:bg-white/5 border border-neutral-200 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              style={{ willChange: "transform, opacity" }}
            >
              <div>
                <motion.span
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider cursor-default mb-4"
                  style={{
                    background: isDark ? "rgba(99,102,241,0.12)" : "rgba(238,242,255,0.95)",
                    border: isDark ? "1px solid rgba(99,102,241,0.32)" : "1px solid rgba(199,210,254,0.75)",
                    color: isDark ? "#a5b4fc" : "#4338ca",
                  }}
                >
                  <TbCpu className="text-base" /> Tech Architecture
                </motion.span>

                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  Engineering Stack
                </h3>

                <p className="text-xs md:text-sm text-neutral-600 dark:text-gray-400 leading-relaxed">
                  Curated stack of modern frameworks, tools, databases, and languages I use to build fast, scalable applications.
                </p>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-200/60 dark:border-white/10">
                <div className="p-3 rounded-xl border border-neutral-200/50 dark:border-white/5 bg-neutral-500/5">
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{skillsData.length}</p>
                  <p className="text-xs text-neutral-500 dark:text-gray-500">Technologies</p>
                </div>
                <div className="p-3 rounded-xl border border-neutral-200/50 dark:border-white/5 bg-neutral-500/5">
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{categories.length}</p>
                  <p className="text-xs text-neutral-500 dark:text-gray-500">Domains</p>
                </div>
              </div>
            </motion.div>

            {/* Filter Pills Card */}
            <motion.div
              className="p-6 rounded-2xl bg-white/70 dark:bg-white/5 border border-neutral-200 dark:border-white/10 shadow-sm space-y-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              style={{ willChange: "transform, opacity" }}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-gray-500 flex items-center gap-1.5">
                  <TbFilter /> Filter View
                </h4>
                {activeCategory !== "All" && (
                  <button
                    onClick={() => setActiveCategory("All")}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    Reset Filter
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory("All")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    activeCategory === "All"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-gray-400 hover:bg-neutral-200 dark:hover:bg-white/10"
                  }`}
                >
                  All ({skillsData.length})
                </button>
                {categories.map((cat) => {
                  const count = skillsData.filter((s) => s.category === cat).length;
                  const accent = categoryAccents[cat];
                  const isActive = activeCategory === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                      style={{
                        backgroundColor: isActive
                          ? accent
                          : isDark
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(0,0,0,0.04)",
                        color: isActive ? "#ffffff" : undefined,
                        border: `1px solid ${
                          isActive ? accent : isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"
                        }`,
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: isActive ? "#ffffff" : accent }}
                      />
                      <span>{cat}</span>
                      <span className="text-[10px] opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Core Stack Showcase Card */}
            <motion.div
              className="p-6 rounded-2xl bg-white/70 dark:bg-white/5 border border-neutral-200 dark:border-white/10 shadow-sm space-y-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
              style={{ willChange: "transform, opacity" }}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-gray-500 flex items-center gap-2">
                  <TbLayersIntersect className="text-indigo-500 text-base" /> Core Stack
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                  Primary
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {coreStack.map((s) => (
                  <motion.div
                    key={s.name}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-neutral-200/50 dark:border-white/5 bg-neutral-500/5 hover:border-indigo-500/30 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0">
                      <Icon name={s.icon} color={s.color} size={18} />
                    </div>
                    <span className="text-xs font-semibold text-neutral-800 dark:text-gray-300 truncate">
                      {s.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>


          {/* ── RIGHT BENTO CANVAS (8 Cols / ~67% width) ── */}
          <div className="lg:col-span-7 xl:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className={
                  activeCategory === "All"
                    ? "grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
                    : "space-y-6"
                }
              >
                {filteredCategories.map((category, ci) => {
                  const catSkills = skillsData.filter((s) => s.category === category);
                  if (!catSkills.length) return null;
                  const accent = categoryAccents[category];
                  const cardSpan = activeCategory === "All" ? categoryBentoSpans[category] || "md:col-span-1" : "w-full";

                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.5, delay: ci * 0.05 }}
                      viewport={{ once: true }}
                      className={`p-6 rounded-2xl bg-white/70 dark:bg-white/5 border border-neutral-200 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-4 ${cardSpan}`}
                      style={{ willChange: "transform, opacity" }}
                    >
                      {/* Category Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-2 h-5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: accent }}
                          />
                          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                            {category}
                          </h3>
                        </div>

                        <span
                          className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: `${accent}15`,
                            color: accent,
                            border: `1px solid ${accent}30`,
                          }}
                        >
                          {catSkills.length} {catSkills.length === 1 ? "tool" : "tools"}
                        </span>
                      </div>

                      {/* Skill Pills */}
                      <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-2.5"
                      >
                        {catSkills.map(({ name, icon, color }) => {
                          const iconColor =
                            (name === "Express.js" || name === "GitHub" || name === "Vercel" || name === "Prisma" || name === "Socket.io") && theme === "light"
                              ? "#09090b"
                              : (name === "Socket.io") && theme === "dark"
                              ? "#ffffff"
                              : name === "Prisma" && theme === "dark"
                              ? "#a5b4fc"
                              : color;

                          return (
                            <motion.div
                              key={name}
                              variants={item}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-neutral-200/50 dark:border-white/5 bg-neutral-500/5 hover:border-indigo-500/30 transition-colors duration-300"
                            >
                              <div className="flex-shrink-0">
                                <Icon name={icon} color={iconColor} size={18} />
                              </div>
                              <span className="text-xs md:text-sm font-semibold text-neutral-800 dark:text-gray-300 whitespace-nowrap">
                                {name}
                              </span>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}


