import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy, FaCheck } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const SPEC_KEYS = [
  { key: "database", label: "Database", fullLabel: "DB & Indexing", icon: "🗄️", file: "schema.index.ts" },
  { key: "caching",  label: "Caching",  fullLabel: "Caching Strategy", icon: "⚡", file: "cache.aside.ts" },
  { key: "security", label: "Security", fullLabel: "Auth & Pipeline", icon: "🔒", file: "auth.security.ts" },
];

export default function ArchitectureSpecViewer({
  backendSpecs,
  architectureSummary,
  accent = "#6366f1",
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeKey, setActiveKey] = useState("database");
  const [copied, setCopied] = useState(false);

  if (!backendSpecs) return null;

  const currentSpec = backendSpecs[activeKey] || backendSpecs.database;
  const currentMeta = SPEC_KEYS.find((s) => s.key === activeKey) || SPEC_KEYS[0];

  const handleCopy = () => {
    if (currentSpec?.snippet) {
      navigator.clipboard.writeText(currentSpec.snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-3.5 w-full max-w-full min-w-0">
      {/* Architecture Summary Banner */}
      {architectureSummary && (
        <div
          className="p-3 sm:p-3.5 rounded-xl border text-[11px] sm:text-xs leading-relaxed font-medium transition-colors"
          style={{
            background: isDark ? "rgba(99,102,241,0.08)" : "rgba(238,242,255,0.8)",
            borderColor: isDark ? "rgba(99,102,241,0.25)" : "rgba(199,210,254,0.8)",
            color: isDark ? "#c7d2fe" : "#3730a3",
          }}
        >
          <span className="font-bold mr-1.5 uppercase tracking-wider text-[9.5px] sm:text-[10px]">
            Blueprint:
          </span>
          {architectureSummary}
        </div>
      )}

      {/* Spec Category Selector */}
      <div
        className="flex items-center gap-1 p-1 sm:p-1.5 rounded-xl border scrollbar-none max-w-full"
        style={{
          borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(99,102,241,0.12)",
          background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.6)",
        }}
      >
        {SPEC_KEYS.map((s) => {
          const isSelected = s.key === activeKey;
          return (
            <button
              key={s.key}
              onClick={() => {
                setActiveKey(s.key);
                setCopied(false);
              }}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer min-h-[32px] flex-1 truncate ${
                isSelected
                  ? "shadow-sm font-bold"
                  : "text-neutral-500 dark:text-gray-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
              style={
                isSelected
                  ? {
                      background: isDark ? `${accent}25` : accent,
                      border: `1px solid ${accent}50`,
                      color: isDark ? accent : "#ffffff",
                    }
                  : undefined
              }
            >
              <span className="shrink-0">{s.icon}</span>
              <span className="hidden sm:inline truncate">{s.fullLabel}</span>
              <span className="sm:hidden truncate">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Spec Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeKey}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="space-y-3 min-w-0 max-w-full"
        >
          {/* Header Row: Engine Name & Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
              {currentSpec.title}
            </h4>
            <span
              className="self-start sm:self-auto px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider break-words max-w-full"
              style={{
                background: isDark ? "rgba(255,255,255,0.08)" : "rgba(99,102,241,0.10)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(99,102,241,0.25)"}`,
                color: isDark ? "#e2e8f0" : "#4338ca",
              }}
            >
              {currentSpec.engine}
            </span>
          </div>

          {/* Deep Architectural Explanation */}
          <p className="text-[11.5px] sm:text-xs md:text-sm text-neutral-600 dark:text-gray-400 leading-relaxed">
            {currentSpec.detail}
          </p>

          {/* Code Snippet Box */}
          <div
            className="rounded-xl border overflow-hidden transition-all duration-200 max-w-full min-w-0"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(99,102,241,0.14)",
              background: isDark ? "#06080d" : "#f8fafc",
            }}
          >
            {/* Snippet Header */}
            <div
              className="flex items-center justify-between px-3 py-1.5 sm:py-2 border-b select-none text-[10.5px] sm:text-[11px] font-mono"
              style={{
                borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(99,102,241,0.08)",
                background: isDark ? "rgba(255,255,255,0.02)" : "rgba(99,102,241,0.04)",
              }}
            >
              <span className="text-neutral-500 dark:text-gray-400 flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60 shrink-0" />
                {currentMeta.file}
              </span>
              <button
                onClick={handleCopy}
                aria-label="Copy snippet code"
                className="flex items-center gap-1 text-neutral-500 dark:text-gray-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
              >
                {copied ? (
                  <>
                    <FaCheck className="text-emerald-500 text-[10px]" />
                    <span className="text-emerald-500 font-semibold text-[10px]">Copied</span>
                  </>
                ) : (
                  <>
                    <FaCopy className="text-[10px]" />
                    <span className="text-[10px]">Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Snippet Code Pre */}
            <pre className="p-2.5 sm:p-3.5 font-mono text-[10px] sm:text-[11px] whitespace-pre-wrap break-words [overflow-wrap:anywhere] overflow-x-hidden text-neutral-800 dark:text-gray-200 leading-relaxed select-text max-w-full">
              <code className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{currentSpec.snippet}</code>
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
