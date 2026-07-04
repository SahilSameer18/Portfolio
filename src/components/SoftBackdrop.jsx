/**
 * SoftBackdrop — static full-screen background layer.
 *
 * Deliberately static (no CSS animations, no will-change) to avoid
 * creating extra GPU compositor layers on low-end hardware.
 * Large blurred elements are the #1 cause of scroll jank — keep this lean.
 */
const SoftBackdrop = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">

      {/* ───────────────── LIGHT MODE ───────────────── */}
      <div
        className="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(145deg, #faf9ff 0%, #f4f1ff 30%, #eee9fd 70%, #e8e2fa 100%)",
        }}
      >
        {/* Top-left indigo glow */}
        <div
          className="absolute left-[-14rem] top-[-12rem] w-[64rem] h-[48rem] rounded-full blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,.35) 0%, rgba(99,102,241,.14) 45%, transparent 75%)",
          }}
        />

        {/* Top-right lavender glow */}
        <div
          className="absolute right-[-8rem] top-[-6rem] w-[40rem] h-[34rem] rounded-full blur-[75px]"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,.18) 0%, rgba(168,85,247,.08) 55%, transparent 75%)",
          }}
        />

        {/* Bottom-right amber glow */}
        <div
          className="absolute right-[-12rem] bottom-[-10rem] w-[48rem] h-[36rem] rounded-full blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,.14) 0%, rgba(250,204,21,.10) 50%, transparent 78%)",
          }}
        />

        {/* Subtle dot-noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(rgba(0,0,0,.18) .5px, transparent .5px)",
            backgroundSize: "18px 18px",
          }}
        />
      </div>

      {/* ───────────────── DARK MODE ───────────────── */}
      <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500">
        {/* Top-centre glow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-20 w-[38rem] h-[18rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.18) 0%, rgba(236,72,153,0.08) 55%, transparent 80%)",
          }}
        />

        {/* Bottom-right accent */}
        <div
          className="absolute right-12 bottom-10 w-[28rem] h-[14rem] rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, rgba(236,72,153,0.07) 60%, transparent 80%)",
          }}
        />
      </div>

    </div>
  );
};

export default SoftBackdrop;
