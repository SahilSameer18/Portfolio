import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const BOOT_LOGS = [
  "[system] Initializing boot sequence...",
  "[system] Loading environment variables...",
  "[ok] ENV loaded successfully.",
  "[network] Resolving localhost...",
  "[network] Starting reverse proxy on port 80...",
  "[db] Connecting to PostgreSQL cluster at aws-ap-south-1...",
  "[db] Authenticating user 'sahil_admin'...",
  "[ok] PostgreSQL connected (Pool size: 20).",
  "[cache] Initializing Redis connection...",
  "[ok] Redis connected (Latency: 12ms).",
  "[auth] Initializing JWT strategies...",
  "[api] Mounting routes: /api/v1/auth, /api/v1/users...",
  "[api] Compiling AI models...",
  "[ok] Gemini LLM interface ready.",
  "[server] Starting Express application...",
  "[ok] Server listening on port 8080.",
  "System is ready. Welcome to Sahil Sameer portfolio."
];

export default function Preloader({ onComplete }) {
  const [logs, setLogs] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    let currentIndex = 0;
    let isActive = true;
    
    const showNextLog = () => {
      if (!isActive) return;
      
      if (currentIndex < BOOT_LOGS.length) {
        const logToAdd = BOOT_LOGS[currentIndex];
        setLogs(prev => [...prev, logToAdd]);
        currentIndex++;
        
        // Randomize typing speed for realism (between 30ms and 110ms)
        const delay = Math.random() * 80 + 30;
        
        // Add artificial pauses for "heavy" operations
        let extraDelay = 0;
        if (BOOT_LOGS[currentIndex - 1].includes("Connecting to PostgreSQL")) extraDelay = 500;
        if (BOOT_LOGS[currentIndex - 1].includes("Compiling AI models")) extraDelay = 600;
        if (BOOT_LOGS[currentIndex - 1].includes("Starting Express application")) extraDelay = 400;
        
        setTimeout(showNextLog, delay + extraDelay);
      } else {
        // Finished booting. Wait a bit, then dismiss.
        setTimeout(() => {
          if (isActive) onComplete();
        }, 1200);
      }
    };
    
    // Start sequence after a small delay
    const startTimeout = setTimeout(showNextLog, 400);
    
    return () => {
      isActive = false;
      clearTimeout(startTimeout);
    };
  }, [onComplete]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView();
    }
  }, [logs]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col justify-end p-6 md:p-12 lg:p-24 overflow-hidden"
      style={{ background: "#050507", fontFamily: "monospace" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="w-full max-w-4xl flex flex-col gap-1.5 md:gap-2">
        {logs.map((log, index) => {
          if (!log) return null;
          
          // Color coding parts of the log for visual flair
          let colorClass = "text-neutral-400";
          if (log.startsWith("[ok]")) colorClass = "text-emerald-400";
          else if (log.startsWith("[system]")) colorClass = "text-indigo-400";
          else if (log.startsWith("[db]")) colorClass = "text-blue-400";
          else if (log.startsWith("[cache]")) colorClass = "text-amber-400";
          else if (log.startsWith("[api]") || log.startsWith("[auth]")) colorClass = "text-purple-400";
          else if (log.startsWith("System is ready")) colorClass = "text-white font-bold text-xl md:text-2xl mt-6 mb-2";

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`text-xs md:text-sm lg:text-base leading-relaxed break-words ${colorClass}`}
            >
              {log}
            </motion.div>
          );
        })}
        {/* Blinking cursor */}
        {logs.length < BOOT_LOGS.length && (
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="w-2.5 h-4 md:w-3 md:h-5 bg-indigo-500 mt-2"
          />
        )}
        <div ref={bottomRef} className="h-4" />
      </div>
      
      {/* Background ambient glow to make it look premium */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at bottom right, rgba(99,102,241,0.08) 0%, transparent 60%)",
          zIndex: -1
        }}
      />
    </motion.div>
  );
}
