import { useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Preloader — branded intro animation (plays once per browser session).
 * Parent wraps this in <AnimatePresence>; calling onComplete removes it
 * from the tree and triggers the exit animation automatically.
 */
export default function Preloader({ onComplete }) {
  useEffect(() => {
    // After 2.2s, signal parent to remove us → AnimatePresence runs exit
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 select-none"
      style={{ background: "#050507" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }}
    >
      {/* ── Ambient radial glow behind logo ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.10) 45%, transparent 72%)",
          pointerEvents: "none",
        }}
      />

      {/* ── SS Logo ── */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.45, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Soft glow ring behind letters */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "-28px",
            background: "radial-gradient(circle, rgba(99,102,241,0.28) 0%, transparent 72%)",
            filter: "blur(24px)",
            pointerEvents: "none",
          }}
        />

        <span
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight"
          style={{
            background: "linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 36px rgba(129,140,248,0.45))",
            lineHeight: 1,
          }}
        >
          Sahil Sameer
        </span>
      </motion.div>

      {/* ── Progress bar + label ── */}
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4, ease: "easeOut" }}
      >
        {/* Track */}
        <div
          className="relative w-28 h-[2px] rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          {/* Fill — sweeps left → right */}
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: "linear-gradient(90deg, #6366f1 0%, #a78bfa 50%, #f472b6 100%)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.55, duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* "portfolio" label */}
        <motion.p
          className="text-[9px] tracking-[0.38em] uppercase font-semibold"
          style={{ color: "rgba(148,163,184,0.45)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.4 }}
        >
          portfolio
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
