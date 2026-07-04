import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const INTERACTIVE =
  "a, button, input, textarea, select, label, [role='button'], [tabindex]";

/**
 * Cursor — global cursor system with three layers:
 *
 * 1. Page glow  — soft radial spotlight (~220px) that follows the cursor.
 *                 Dark mode : transparent white, mix-blend-mode: screen
 *                             → adds soft white light over dark content.
 *                 Light mode: semi-transparent dark, mix-blend-mode: multiply
 *                             → adds a subtle shadow under the cursor.
 *
 * 2. Dot        — 8px solid circle, snaps instantly to cursor position.
 *
 * 3. Ring       — 36px outline circle that trails with spring physics.
 *
 * Position writes go directly to the DOM via Framer Motion (no React re-renders
 * per frame). Auto-disabled on touch + reduced-motion devices.
 */
export default function Cursor() {
  const dotX = useMotionValue(-400);
  const dotY = useMotionValue(-400);

  const ringX = useSpring(dotX, { stiffness: 220, damping: 24, mass: 0.1 });
  const ringY = useSpring(dotY, { stiffness: 220, damping: 24, mass: 0.1 });

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [hovering, setHovering] = useState(false);
  const [visible,  setVisible]  = useState(false);
  const [mounted,  setMounted]  = useState(false);

  useEffect(() => {
    const isTouch      = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduceMotion) return;

    setMounted(true);
    document.documentElement.classList.add("custom-cursor");

    const onMove  = (e) => { dotX.set(e.clientX); dotY.set(e.clientY); setVisible(true); };
    const onOver  = (e) => setHovering(!!e.target.closest(INTERACTIVE));
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove,  { passive: true });
    document.addEventListener("mouseover", onOver,  { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [dotX, dotY]);

  if (!mounted) return null;

  return (
    <>
      {/* ── 1. Page glow ───────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[30]"
        style={{
          x:            dotX,
          y:            dotY,
          translateX:   "-50%",
          translateY:   "-50%",
          width:        220,
          height:       220,
          borderRadius: "50%",
          // Dark  → white glow  (screen adds light over dark content)
          // Light → dark smudge (multiply darkens light content slightly)
          background: isDark
            ? "radial-gradient(circle, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.05) 50%, transparent 70%)"
            : "radial-gradient(circle, rgba(99,102,241,0.20) 0%, rgba(99,102,241,0.08) 50%, transparent 70%)",
          mixBlendMode: isDark ? "screen" : "multiply",
          opacity:      visible ? 1 : 0,
          transition:   "opacity 0.5s ease",
        }}
      />

      {/* ── 2. Dot: instant snap ───────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hovering ? 0 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <div
          style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #a78bfa)",
          }}
        />
      </motion.div>

      {/* ── 3. Ring: spring-lagged trail ───────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hovering ? 1.75 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div
          style={{
            width: 36, height: 36, borderRadius: "50%",
            border:     `1.5px solid ${hovering ? "rgba(99,102,241,0.85)" : "rgba(99,102,241,0.5)"}`,
            background: hovering ? "rgba(99,102,241,0.10)" : "transparent",
            boxShadow:  hovering
              ? "0 0 18px rgba(99,102,241,0.35), inset 0 0 10px rgba(99,102,241,0.08)"
              : "0 0 6px rgba(99,102,241,0.15)",
            transition: "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
          }}
        />
      </motion.div>
    </>
  );
}

