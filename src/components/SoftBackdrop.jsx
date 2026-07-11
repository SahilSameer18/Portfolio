/**
 * SoftBackdrop — static full-screen background layer.
 *
 * Deliberately static (no CSS animations, no will-change) to avoid
 * creating extra GPU compositor layers on low-end hardware.
 */
const SoftBackdrop = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">

      {/* ═══════════════════ LIGHT MODE ═══════════════════ */}
      <div
        className="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-500"
        style={{
          /* Cooler, crisper indigo-purple base — feels modern, not washed out */
          background: "linear-gradient(150deg, #fbfaff 0%, #f2efff 38%, #ece6ff 70%, #e7e0fe 100%)",
        }}
      >
        {/* ── Top-left: primary indigo glow — hero section anchor ── */}
        <div
          className="absolute -left-24 -top-16 w-[72rem] h-[54rem] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 30% 30%, rgba(99,102,241,0.32) 0%, rgba(99,102,241,0.12) 40%, transparent 72%)",
            filter: "blur(80px)",
          }}
        />

        {/* ── Top-right: violet accent ── */}
        <div
          className="absolute -right-16 -top-8 w-[48rem] h-[38rem] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 70% 20%, rgba(139,92,246,0.22) 0%, rgba(139,92,246,0.08) 50%, transparent 75%)",
            filter: "blur(70px)",
          }}
        />

        {/* ── Bottom-left: blue-indigo depth accent ── */}
        <div
          className="absolute -left-10 bottom-0 w-[44rem] h-[32rem] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 20% 80%, rgba(79,70,229,0.18) 0%, rgba(99,102,241,0.06) 55%, transparent 78%)",
            filter: "blur(80px)",
          }}
        />

        {/* ── Bottom-right: warm rose accent — keeps it from feeling cold ── */}
        <div
          className="absolute -right-20 -bottom-10 w-[42rem] h-[30rem] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 75% 75%, rgba(236,72,153,0.10) 0%, rgba(168,85,247,0.06) 55%, transparent 78%)",
            filter: "blur(80px)",
          }}
        />

        {/* ── Dot-noise texture — slightly more visible for depth ── */}
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

        {/* Top-centre glow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-20 w-[44rem] h-[22rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.38) 0%, rgba(236,72,153,0.20) 55%, transparent 80%)",
          }}
        />

        {/* Bottom-right accent */}
        <div
          className="absolute right-12 bottom-10 w-[32rem] h-[18rem] rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.26) 0%, rgba(236,72,153,0.16) 60%, transparent 80%)",
          }}
        />

        {/* Bottom-left accent */}
        <div
          className="absolute -left-10 bottom-0 w-[30rem] h-[22rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(147,51,234,0.24) 0%, rgba(99,102,241,0.14) 60%, transparent 80%)",
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

      {/* ── Grain / film-noise texture — both modes ──────────────────── */}
      {/* SVG fractalNoise at ~3.5% opacity + overlay blend gives the     */}
      {/* premium tactile "paper" feel without affecting readability.      */}
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
