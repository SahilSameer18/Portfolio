const SoftBackdrop = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* ───────────── LIGHT MODE ───────────── */}
      <div
        className="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(160deg, #f4f2fc 0%, #f0eef9 45%, #ece8f5 100%)",
        }}
      >
        {/* Large top-left indigo glow */}
        <div
          className="absolute left-[-12rem] top-[-10rem] w-[60rem] h-[42rem] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,.28) 0%, rgba(99,102,241,.10) 55%, transparent 75%)",
          }}
        />

        {/* Soft center glow */}
        <div
          className="absolute left-1/2 top-32 -translate-x-1/2 w-[44rem] h-[22rem] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(129,140,248,.12) 0%, transparent 75%)",
          }}
        />

        {/* Bottom-right violet/pink glow */}
        <div
          className="absolute right-[-8rem] bottom-[-8rem] w-[48rem] h-[34rem] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(217,70,239,.18) 0%, rgba(139,92,246,.12) 55%, transparent 75%)",
          }}
        />

        {/* Small top-right accent */}
        <div
          className="absolute right-16 top-16 w-[20rem] h-[20rem] rounded-full blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,.10) 0%, transparent 75%)",
          }}
        />

        {/* Tiny noise texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(0,0,0,.18) .5px, transparent .5px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* ───────────── DARK MODE ───────────── */}
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
