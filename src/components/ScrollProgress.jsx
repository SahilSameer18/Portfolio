import { motion, useScroll } from "framer-motion";

/**
 * ScrollProgress — a slim gradient bar pinned to the viewport top.
 * Fills left-to-right as the user scrolls down the page.
 * Uses Framer Motion's useScroll so it's 100% GPU-composited (no repaints).
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[2.5px] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
      }}
    />
  );
}
