const SoftBackdrop = () => {
  return (
    <div className="fixed inset-0 bg-black/40 -z-10 pointer-events-none overflow-hidden">

      
      
      {/* Top Glow */}
      <div className="absolute left-1/2 top-20 -translate-x-1/2 w-[38rem] h-[18rem] 
      bg-linear-to-tr from-indigo-500/25 via-pink-400/15 to-transparent 
      rounded-full blur-3xl" />

      {/* Bottom Glow */}
      <div className="absolute right-12 bottom-10 w-[28rem] h-[14rem] 
      bg-linear-to-bl from-indigo-600/20 via-pink-200/20 to-transparent 
      rounded-full blur-2xl" />

    </div>
  );
};

export default SoftBackdrop;