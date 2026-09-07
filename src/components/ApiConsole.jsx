import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy, FaCheck } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

// Method badge color helper
const getMethodBadgeStyle = (method) => {
  switch (method) {
    case "POST":
      return {
        bg: "rgba(16, 185, 129, 0.15)",
        border: "1px solid rgba(16, 185, 129, 0.35)",
        color: "#10b981",
      };
    case "GET":
      return {
        bg: "rgba(14, 165, 233, 0.15)",
        border: "1px solid rgba(14, 165, 233, 0.35)",
        color: "#0ea5e9",
      };
    case "PATCH":
      return {
        bg: "rgba(245, 158, 11, 0.15)",
        border: "1px solid rgba(245, 158, 11, 0.35)",
        color: "#f59e0b",
      };
    case "DELETE":
      return {
        bg: "rgba(244, 63, 94, 0.15)",
        border: "1px solid rgba(244, 63, 94, 0.35)",
        color: "#f43f5e",
      };
    default:
      return {
        bg: "rgba(99, 102, 241, 0.15)",
        border: "1px solid rgba(99, 102, 241, 0.35)",
        color: "#6366f1",
      };
  }
};

// Syntax-highlighted JSON renderer
const JsonViewer = ({ data, isDark }) => {
  if (data === null || data === undefined) {
    return (
      <div className="py-6 px-4 text-center text-xs font-mono text-neutral-400 dark:text-gray-500 italic">
        (No request body required — headers & query params only)
      </div>
    );
  }

  const jsonString = JSON.stringify(data, null, 2);

  const formatLine = (line, idx) => {
    const keyValMatch = line.match(/^(\s*)(".*?")(\s*:\s*)(.*)$/);
    if (keyValMatch) {
      const [, indent, key, colon, value] = keyValMatch;
      let valColor = isDark ? "#e2e8f0" : "#1e293b";

      if (value.startsWith('"')) {
        valColor = isDark ? "#34d399" : "#059669";
      } else if (!isNaN(Number(value.replace(/,$/, "")))) {
        valColor = isDark ? "#fbbf24" : "#d97706";
      } else if (value.startsWith("true") || value.startsWith("false")) {
        valColor = isDark ? "#818cf8" : "#4f46e5";
      }

      return (
        <div key={idx} className="leading-5 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
          <span>{indent}</span>
          <span style={{ color: isDark ? "#93c5fd" : "#0284c7" }}>{key}</span>
          <span className="text-neutral-400 dark:text-gray-600">{colon}</span>
          <span style={{ color: valColor }} className="break-all sm:break-words">{value}</span>
        </div>
      );
    }

    return (
      <div key={idx} className="leading-5 text-neutral-500 dark:text-gray-400 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
        {line}
      </div>
    );
  };

  const lines = jsonString.split("\n");

  return (
    <pre className="font-mono text-[10px] sm:text-[11.5px] select-text whitespace-pre-wrap break-words [overflow-wrap:anywhere] overflow-x-hidden p-3 sm:p-3.5 leading-relaxed max-w-full">
      <code className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{lines.map(formatLine)}</code>
    </pre>
  );
};

export default function ApiConsole({ endpoints = [], accent = "#6366f1" }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeIdx, setActiveIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("response"); // "response" | "request"
  const [copied, setCopied] = useState(false);

  const currentEndpoint = endpoints[activeIdx] || endpoints[0];

  const handleCopy = () => {
    const payload =
      activeTab === "response"
        ? currentEndpoint?.responsePayload
        : currentEndpoint?.requestPayload;

    if (payload) {
      navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!currentEndpoint) return null;

  return (
    <div
      className="w-full max-w-full min-w-0 rounded-2xl overflow-hidden flex flex-col border transition-all duration-300 shadow-xl"
      style={{
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(99,102,241,0.18)",
        background: isDark ? "rgba(10,12,18,0.92)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Console Header */}
      <div
        className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 border-b select-none"
        style={{
          background: isDark ? "rgba(255,255,255,0.02)" : "rgba(99,102,241,0.04)",
          borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(99,102,241,0.10)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-gray-400 ml-1">
            API Inspector
          </span>
        </div>

        {/* Live Latency Indicator */}
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold tracking-wider">
            {currentEndpoint.latency}
          </span>
        </div>
      </div>

      {/* Endpoint Selector Tabs */}
      <div
        className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 border-b max-w-full"
        style={{
          borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(99,102,241,0.08)",
          background: isDark ? "rgba(0,0,0,0.2)" : "rgba(248,250,252,0.6)",
        }}
      >
        {endpoints.map((ep, idx) => {
          const isSelected = idx === activeIdx;
          const badgeStyle = getMethodBadgeStyle(ep.method);

          return (
            <button
              key={ep.route}
              onClick={() => {
                setActiveIdx(idx);
                setCopied(false);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer min-h-[32px] ${
                isSelected
                  ? "shadow-sm font-semibold"
                  : "text-neutral-500 dark:text-gray-400 hover:text-neutral-800 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5"
              }`}
              style={
                isSelected
                  ? {
                      border: `1px solid ${accent}55`,
                      background: isDark ? `${accent}22` : `${accent}14`,
                      color: isDark ? "#ffffff" : "#0f172a",
                    }
                  : {
                      border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)",
                      background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                    }
              }
            >
              <span
                className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0"
                style={badgeStyle}
              >
                {ep.method}
              </span>
              <span className="text-[10.5px] sm:text-[11px] tracking-tight">
                {ep.route.replace("/api/v1", "")}
              </span>
            </button>
          );
        })}
      </div>

      {/* Endpoint Context Bar */}
      <div
        className="px-3.5 sm:px-4 py-2 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs"
        style={{
          borderColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(99,102,241,0.06)",
        }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="px-2 py-0.5 rounded text-[9.5px] sm:text-[10px] font-mono font-bold"
            style={{
              background: isDark ? "rgba(16,185,129,0.12)" : "rgba(16,185,129,0.10)",
              border: "1px solid rgba(16,185,129,0.30)",
              color: "#10b981",
            }}
          >
            STATUS {currentEndpoint.status} OK
          </span>

          <span
            className="px-2 py-0.5 rounded text-[9.5px] sm:text-[10px] font-mono font-medium"
            style={{
              background: isDark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.08)",
              border: "1px solid rgba(99,102,241,0.25)",
              color: isDark ? "#a5b4fc" : "#4f46e5",
            }}
          >
            🔒 {currentEndpoint.auth}
          </span>
        </div>

        <p className="text-[10.5px] sm:text-[11px] text-neutral-500 dark:text-gray-400 italic line-clamp-1 sm:line-clamp-none">
          {currentEndpoint.description}
        </p>
      </div>

      {/* Payload Sub-tabs & Copy Button */}
      <div
        className="flex items-center justify-between px-3.5 sm:px-4 py-1.5 border-b select-none"
        style={{
          borderColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(99,102,241,0.06)",
          background: isDark ? "rgba(0,0,0,0.15)" : "rgba(241,245,249,0.5)",
        }}
      >
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab("response")}
            className={`px-2.5 py-1 rounded text-[11px] sm:text-xs font-mono font-medium transition-colors cursor-pointer ${
              activeTab === "response"
                ? isDark
                  ? "bg-white/10 text-emerald-400 font-bold"
                  : "bg-white text-emerald-600 font-bold shadow-sm"
                : "text-neutral-500 dark:text-gray-400 hover:text-neutral-800 dark:hover:text-gray-200"
            }`}
          >
            Response JSON
          </button>
          <button
            onClick={() => setActiveTab("request")}
            className={`px-2.5 py-1 rounded text-[11px] sm:text-xs font-mono font-medium transition-colors cursor-pointer ${
              activeTab === "request"
                ? isDark
                  ? "bg-white/10 text-indigo-400 font-bold"
                  : "bg-white text-indigo-600 font-bold shadow-sm"
                : "text-neutral-500 dark:text-gray-400 hover:text-neutral-800 dark:hover:text-gray-200"
            }`}
          >
            Request Payload
          </button>
        </div>

        <button
          onClick={handleCopy}
          aria-label="Copy payload"
          className="flex items-center gap-1 px-2 py-1 rounded-md text-[10.5px] font-mono text-neutral-500 dark:text-gray-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
        >
          {copied ? (
            <>
              <FaCheck className="text-emerald-500 text-[10px]" />
              <span className="text-emerald-500 font-bold">Copied</span>
            </>
          ) : (
            <>
              <FaCopy className="text-[10px]" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Window */}
      <div
        className="relative max-h-60 sm:max-h-72 overflow-y-auto overflow-x-hidden thin-scrollbar max-w-full"
        style={{
          background: isDark ? "#06080d" : "#f8fafc",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeIdx}-${activeTab}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="min-w-0 max-w-full"
          >
            <JsonViewer
              data={
                activeTab === "response"
                  ? currentEndpoint.responsePayload
                  : currentEndpoint.requestPayload
              }
              isDark={isDark}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Info Strip */}
      <div
        className="px-3.5 sm:px-4 py-2 text-[9px] sm:text-[10px] font-mono text-neutral-400 dark:text-gray-600 border-t flex flex-wrap items-center justify-between gap-1.5"
        style={{
          borderColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(99,102,241,0.06)",
        }}
      >
        <span className="truncate">application/json</span>
        <span>Latency: {currentEndpoint.latency}</span>
      </div>
    </div>
  );
}
