/**
 * SoftBackdrop — full-screen fixed background layer.
 *
 * Key blobs in both modes are <motion.div> elements driven by scroll progress,
 * creating a subtle parallax depth as the user scrolls through sections.
 * All other blobs remain static for GPU performance.
 *
 * transform and opacity are excluded from the global transition rule in
 * index.css, so Framer Motion's useTransform runs without interference.
 */
import { motion, useScroll, useTransform } from "framer-motion";

const SoftBackdrop = () => {
  const { scrollYProgress } = useScroll();

  // ── Dark mode blob drifts (pixel offsets, smooth & subtle) ────────────────
  const darkTop_Y  = useTransform(scrollYProgress, [0, 1], [0,  90]);  // top blob drifts down
  const darkBotR_Y = useTransform(scrollYProgress, [0, 1], [0, -70]);  // bottom-right drifts up
  const darkBotL_X = useTransform(scrollYProgress, [0, 1], [0,  55]);  // bottom-left drifts right

  // ── Light mode blob drifts ─────────────────────────────────────────────────
  const lightTL_Y  = useTransform(scrollYProgress, [0, 1], [0,  80]);  // top-left drifts down
  const lightTR_Y  = useTransform(scrollYProgress, [0, 1], [0, -55]);  // top-right drifts up

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">

      {/* ═══════════════════ LIGHT MODE ═══════════════════ */}
      <div
        className="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-500"
        style={{
          background: "linear-gradient(150deg, #fbfaff 0%, #f2efff 38%, #ece6ff 70%, #e7e0fe 100%)",
        }}
      >
        {/* ── Top-left: primary indigo glow — scroll-driven ── */}
        <motion.div
          className="absolute -left-24 -top-16 w-[72rem] h-[54rem] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 30% 30%, rgba(99,102,241,0.32) 0%, rgba(99,102,241,0.12) 40%, transparent 72%)",
            filter: "blur(80px)",
            y: lightTL_Y,
          }}
        />

        {/* ── Top-right: violet accent — scroll-driven ── */}
        <motion.div
          className="absolute -right-16 -top-8 w-[48rem] h-[38rem] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 70% 20%, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.05) 50%, transparent 75%)",
            filter: "blur(70px)",
            y: lightTR_Y,
          }}
        />

        {/* ── Bottom-left: static depth accent ── */}
        <div
          className="absolute -left-10 bottom-0 w-[44rem] h-[32rem] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 20% 80%, rgba(79,70,229,0.18) 0%, rgba(99,102,241,0.06) 55%, transparent 78%)",
            filter: "blur(80px)",
          }}
        />

        {/* ── Bottom-right: warm rose accent — static ── */}
        <div
          className="absolute -right-20 -bottom-10 w-[42rem] h-[30rem] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 75% 75%, rgba(236,72,153,0.10) 0%, rgba(168,85,247,0.06) 55%, transparent 78%)",
            filter: "blur(80px)",
          }}
        />

        {/* ── Dot-noise texture ── */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(79,70,229,0.12) 0.5px, transparent 0.5px)",
            backgroundSize: "20px 20px",
            opacity: 0.045,
          }}
        />
      </div>

      {/* ═══════════════════ DARK MODE ═══════════════════ */}
      <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500">

        {/* Deep dark base */}
        <div className="absolute inset-0" style={{ background: "#050507" }} />

        {/* Top-centre glow — scroll-driven: drifts downward */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-20 w-[44rem] h-[22rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.28) 0%, rgba(236,72,153,0.12) 55%, transparent 80%)",
            y: darkTop_Y,
          }}
        />

        {/* Bottom-right accent — scroll-driven: drifts upward */}
        <motion.div
          className="absolute right-12 bottom-10 w-[32rem] h-[18rem] rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.18) 0%, rgba(236,72,153,0.09) 60%, transparent 80%)",
            y: darkBotR_Y,
          }}
        />

        {/* Bottom-left accent — scroll-driven: drifts right */}
        <motion.div
          className="absolute -left-10 bottom-0 w-[30rem] h-[22rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.14) 0%, rgba(79,70,229,0.07) 60%, transparent 80%)",
            x: darkBotL_X,
          }}
        />

        {/* Dot-noise texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 0.5px, transparent 0.5px)",
            backgroundSize: "18px 18px",
          }}
        />
      </div>

      {/* ── Grain / film-noise texture — both modes ──────────────────────────
           SVG fractalNoise at ~3.5% opacity + overlay blend gives the
           premium tactile "paper" feel without affecting readability.         */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23grain)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.035,
          mixBlendMode: "overlay",
        }}
      />

    </div>
  );
};

export default SoftBackdrop;
