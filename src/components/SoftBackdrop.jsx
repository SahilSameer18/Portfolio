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
        {/* Large top-left indigo glow */}
        <div
          className="absolute left-[-14rem] top-[-12rem] w-[64rem] h-[48rem] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,.40) 0%, rgba(99,102,241,.18) 45%, transparent 75%)",
          }}
        />

        {/* Top-right lavender glow */}
        <div
          className="absolute right-[-8rem] top-[-6rem] w-[40rem] h-[34rem] rounded-full blur-[95px]"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,.22) 0%, rgba(168,85,247,.10) 55%, transparent 75%)",
          }}
        />

        {/* Center white glow */}
        <div
          className="absolute left-1/2 top-28 -translate-x-1/2 w-[46rem] h-[24rem] rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,.70) 0%, rgba(255,255,255,.25) 50%, transparent 80%)",
          }}
        />

        {/* Bottom-left blue glow */}
        <div
          className="absolute left-[-8rem] bottom-[-8rem] w-[34rem] h-[30rem] rounded-full blur-[95px]"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,.14) 0%, transparent 75%)",
          }}
        />

        {/* Bottom-right amber glow */}
        <div
          className="absolute right-[-12rem] bottom-[-10rem] w-[56rem] h-[42rem] rounded-full blur-[105px]"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,.18) 0%, rgba(250,204,21,.14) 50%, transparent 78%)",
          }}
        />

        {/* Ambient center glow */}
        <div
          className="absolute left-1/3 top-1/2 w-[28rem] h-[22rem] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(129,140,248,.14) 0%, transparent 75%)",
          }}
        />

        {/* Noise */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,.18) .5px, transparent .5px)",
            backgroundSize: "18px 18px",
          }}
        />
      </div>

      {/* ───────────────── DARK MODE  ───────────────── */}
      <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500">
        {/* Top glow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-20 w-[38rem] h-[18rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.22) 0%, rgba(236,72,153,0.10) 55%, transparent 80%)",
          }}
        />

        {/* Bottom-right glow */}
        <div
          className="absolute right-12 bottom-10 w-[28rem] h-[14rem] rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.16) 0%, rgba(236,72,153,0.10) 60%, transparent 80%)",
          }}
        />
      </div>
    </div>
  );
};

export default SoftBackdrop;
