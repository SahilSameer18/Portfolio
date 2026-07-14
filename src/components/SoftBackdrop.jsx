/**
 * SoftBackdrop — full-screen fixed background layer.
 *
 * Fully static — zero scroll listeners, zero JS animations, zero will-change.
 * All blobs are plain <div>s with CSS radial-gradients. The browser paints
 * them once and never touches them again, giving maximum scroll performance
 * on both desktop and mobile.
 */

const SoftBackdrop = () => (
  <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">

    {/* ═══════════════════ LIGHT MODE ═══════════════════ */}
    <div
      className="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-500"
      style={{
        background: "linear-gradient(150deg, #fbfaff 0%, #f2efff 38%, #ece6ff 70%, #e7e0fe 100%)",
      }}
    >
      {/* Top-left indigo glow */}
      <div
        className="absolute -left-20 -top-12 w-[50rem] h-[38rem] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(99,102,241,0.28) 0%, rgba(99,102,241,0.08) 50%, transparent 72%)",
          filter: "blur(40px)",
        }}
      />

      {/* Top-right violet accent */}
      <div
        className="absolute -right-12 -top-6 w-[32rem] h-[24rem] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 70% 20%, rgba(139,92,246,0.10) 0%, rgba(139,92,246,0.03) 55%, transparent 75%)",
          filter: "blur(32px)",
        }}
      />

      {/* Bottom-left */}
      <div
        className="absolute -left-8 bottom-0 w-[30rem] h-[22rem] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 20% 80%, rgba(79,70,229,0.14) 0%, rgba(99,102,241,0.04) 55%, transparent 78%)",
          filter: "blur(40px)",
        }}
      />

      {/* Bottom-right rose accent */}
      <div
        className="absolute -right-16 -bottom-8 w-[28rem] h-[20rem] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 75% 75%, rgba(236,72,153,0.08) 0%, rgba(168,85,247,0.04) 55%, transparent 78%)",
          filter: "blur(40px)",
        }}
      />
    </div>

    {/* ═══════════════════ DARK MODE ═══════════════════ */}
    <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500">

      {/* Deep dark base */}
      <div className="absolute inset-0" style={{ background: "#050507" }} />

      {/* Top-centre glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-20 w-[34rem] h-[16rem] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.24) 0%, rgba(236,72,153,0.09) 55%, transparent 80%)",
          filter: "blur(36px)",
        }}
      />

      {/* Bottom-right accent */}
      <div
        className="absolute right-10 bottom-10 w-[24rem] h-[13rem] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.14) 0%, rgba(236,72,153,0.07) 60%, transparent 80%)",
          filter: "blur(28px)",
        }}
      />

      {/* Bottom-left accent */}
      <div
        className="absolute -left-8 bottom-0 w-[22rem] h-[16rem] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.11) 0%, rgba(79,70,229,0.05) 60%, transparent 80%)",
          filter: "blur(36px)",
        }}
      />
    </div>

  </div>
);

export default SoftBackdrop;
