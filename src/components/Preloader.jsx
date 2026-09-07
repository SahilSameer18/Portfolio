import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

// ─── Boot sequence ────────────────────────────────────────────────────────────
const BOOT_LOGS = [
  { tag: "system",  text: "Initializing boot sequence..." },
  { tag: "system",  text: "Loading environment variables..." },
  { tag: "ok",      text: "ENV loaded successfully." },
  { tag: "network", text: "Resolving localhost:3000..." },
  { tag: "network", text: "Starting reverse proxy on port 80..." },
  { tag: "db",      text: "Connecting to PostgreSQL cluster at aws-ap-south-1...", pause: 80 },
  { tag: "db",      text: "Authenticating user 'sahil_admin'..." },
  { tag: "ok",      text: "PostgreSQL connected (Pool size: 20)." },
  { tag: "cache",   text: "Initializing Redis connection..." },
  { tag: "ok",      text: "Redis connected (Latency: 12ms)." },
  { tag: "auth",    text: "Initializing JWT strategies..." },
  { tag: "api",     text: "Mounting routes: /api/v1/auth, /api/v1/users..." },
  { tag: "api",     text: "Compiling AI models...", pause: 100 },
  { tag: "ok",      text: "Gemini LLM interface ready." },
  { tag: "server",  text: "Starting Express application...", pause: 80 },
  { tag: "ok",      text: "Server listening on port 8080." },
  { tag: "ready",   text: "System is ready. Welcome to Sahil Sameer portfolio." },
];

const TAG_STYLES = {
  system:  { color: "#818cf8", label: "SYS" },   // indigo-400
  ok:      { color: "#34d399", label: " OK" },   // emerald-400
  network: { color: "#60a5fa", label: "NET" },   // blue-400
  db:      { color: "#38bdf8", label: " DB" },   // sky-400
  cache:   { color: "#fbbf24", label: "CCH" },   // amber-400
  auth:    { color: "#c084fc", label: "AUTH" },  // purple-400
  api:     { color: "#c084fc", label: "API" },   // purple-400
  server:  { color: "#f472b6", label: "SRV" },   // pink-400
  ready:   { color: "#ffffff", label: "RDY" },
};

// ─── Module-scoped precomputed particle coordinates (Zero render-time RNG) ───
const PRELOADER_PARTICLE_COUNT = 800; // Optimized from 1800 to 800 for mobile/low-end GPU
const preloaderPositions = new Float32Array(PRELOADER_PARTICLE_COUNT * 3);

let pSeed = 99881;
function pLcg() {
  pSeed = (pSeed * 16807) % 2147483647;
  return (pSeed - 1) / 2147483646;
}

for (let i = 0; i < PRELOADER_PARTICLE_COUNT; i++) {
  const theta = pLcg() * Math.PI * 2;
  const phi   = Math.acos(2 * pLcg() - 1);
  const r     = 3 + pLcg() * 8;
  preloaderPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
  preloaderPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  preloaderPositions[i * 3 + 2] = r * Math.cos(phi);
}

// ─── 3D: Floating particle field ─────────────────────────────────────────────
function ParticleField() {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.04;
      ref.current.rotation.y = state.clock.elapsedTime * 0.06;
    }
  });

  return (
    <Points ref={ref} positions={preloaderPositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6366f1"
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
      />
    </Points>
  );
}

// ─── 3D: Wireframe icosahedron ────────────────────────────────────────────────
function WireIcosahedron() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.18;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshBasicMaterial color="#6366f1" wireframe opacity={0.18} transparent />
    </mesh>
  );
}

// ─── 3D: Outer orbiting torus ─────────────────────────────────────────────────
function OrbitRing({ radius, speed, tilt, color }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.005, 8, 60]} />
      <meshBasicMaterial color={color} opacity={0.22} transparent />
    </mesh>
  );
}

// ─── 3D: Glowing central sphere ───────────────────────────────────────────────
function CoreSphere() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.04;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.42, 24, 24]} />
      <meshBasicMaterial color="#818cf8" opacity={0.14} transparent />
    </mesh>
  );
}

// ─── 3D: Scene root ───────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <CoreSphere />
      <WireIcosahedron />
      <OrbitRing radius={2.4} speed={0.28} tilt={Math.PI / 5}       color="#818cf8" />
      <OrbitRing radius={3.0} speed={-0.18} tilt={Math.PI / 3.2}    color="#c084fc" />
      <OrbitRing radius={3.7} speed={0.12} tilt={Math.PI / 2.1}     color="#38bdf8" />
      <ParticleField />
    </>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ progress }) {
  return (
    <div className="w-full h-px bg-white/5 relative overflow-hidden">
      <motion.div
        className="absolute left-0 top-0 h-full"
        style={{
          background: "linear-gradient(90deg, #6366f1, #a78bfa, #38bdf8)",
          boxShadow: "0 0 12px rgba(99,102,241,0.7)",
        }}
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ ease: "easeOut", duration: 0.15 }}
      />
      {/* Shimmer sweep */}
      <motion.div
        className="absolute top-0 h-full w-20"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
        }}
        animate={{ x: ["-80px", "100vw"] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear", repeatDelay: 0.2 }}
      />
    </div>
  );
}

// ─── Main Preloader ───────────────────────────────────────────────────────────
export default function Preloader({ onComplete }) {
  const [logs, setLogs]     = useState([]);
  const [isDone, setIsDone] = useState(false);
  const bottomRef           = useRef(null);
  const progress            = Math.round((logs.length / BOOT_LOGS.length) * 100);

  // Quick skip function
  const handleSkip = () => {
    onComplete();
  };

  // Keyboard shortcut (Escape to skip)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onComplete]);

  // Boot sequence runner (~3.2s total: ~2s logs + ~1.2s name display)
  useEffect(() => {
    let idx      = 0;
    let isActive = true;

    const next = () => {
      if (!isActive) return;
      if (idx < BOOT_LOGS.length) {
        const entry = BOOT_LOGS[idx];
        setLogs((prev) => [...prev, entry]);
        idx++;
        const base  = Math.random() * 20 + 95; // avg ~105ms per log step (~1.9s for all logs)
        const extra = entry.pause ? entry.pause : 0;
        setTimeout(next, base + extra);
      } else {
        // Show name right after logs complete
        setTimeout(() => {
          if (isActive) setIsDone(true);
        }, 50);

        // Keep name displayed for exactly ~1.2s before transition
        setTimeout(() => {
          if (isActive) onComplete();
        }, 1250);
      }
    };

    const t = setTimeout(next, 80);
    return () => {
      isActive = false;
      clearTimeout(t);
    };
  }, [onComplete]);

  // Auto-scroll terminal logs
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [logs]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{ background: "#04040f" }}
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* ── 3D canvas background (low-power, DPR=1) ── */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 55 }}
          gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
          dpr={1}
        >
          <Scene />
        </Canvas>
      </div>

      {/* ── Radial vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(4,4,15,0.85) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Scanlines overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)",
          zIndex: 2,
        }}
      />

      {/* ── Corner accent lines ── */}
      {[
        "top-0 left-0 border-t border-l",
        "top-0 right-0 border-t border-r",
        "bottom-0 left-0 border-b border-l",
        "bottom-0 right-0 border-b border-r",
      ].map((cls, i) => (
        <motion.div
          key={i}
          className={`absolute ${cls} w-8 h-8 border-indigo-500/30`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 + i * 0.04 }}
          style={{ zIndex: 3 }}
        />
      ))}

      {/* ── Content layer ── */}
      <div
        className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8 md:p-12 lg:p-16"
        style={{ zIndex: 4, fontFamily: "monospace" }}
      >
        {/* Top bar */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-2 h-2 rounded-full bg-indigo-500"
              style={{ boxShadow: "0 0 8px rgba(99,102,241,0.8)" }}
            />
            <span className="text-indigo-400/70 text-[10px] md:text-xs uppercase tracking-[0.25em]">
              SYSTEM BOOT
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-neutral-600 text-[10px] md:text-xs font-mono hidden sm:inline">
              v1.0.0 · Node.js · Express
            </span>
            <button
              onClick={handleSkip}
              className="px-2.5 py-1 rounded text-[10px] md:text-xs font-mono text-indigo-300/80 hover:text-white bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/25 transition cursor-pointer"
            >
              Skip [Esc]
            </button>
          </div>
        </motion.div>

        {/* Center name (fades in at end) */}
        <AnimatePresence>
          {isDone && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ zIndex: 5 }}
            >
              <div className="text-center select-none">
                <p
                  className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
                  style={{
                    fontFamily: "'Outfit', 'Inter', sans-serif",
                    background: "linear-gradient(135deg, #ffffff 0%, #a5b4fc 40%, #818cf8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "none",
                  }}
                >
                  Sahil Sameer
                </p>
                <p
                  className="text-xs sm:text-sm tracking-[0.35em] uppercase mt-2"
                  style={{ color: "rgba(99,102,241,0.6)" }}
                >
                  Portfolio
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Terminal log area */}
        <div className="w-full max-w-2xl space-y-0">
          {/* Log lines */}
          <div className="space-y-1 mb-4 max-h-56 sm:max-h-72 overflow-hidden">
            {logs.map((entry, i) => {
              const style = TAG_STYLES[entry.tag] ?? TAG_STYLES.system;
              const isReady = entry.tag === "ready";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.12 }}
                  className="flex items-start gap-2.5 leading-relaxed"
                >
                  {/* Tag badge */}
                  <span
                    className="text-[9px] sm:text-[10px] font-bold tracking-widest shrink-0 mt-0.5 px-1.5 py-px rounded"
                    style={{
                      color: style.color,
                      background: `${style.color}18`,
                      border: `1px solid ${style.color}30`,
                    }}
                  >
                    {style.label}
                  </span>

                  {/* Log text */}
                  <span
                    className={`text-[11px] sm:text-xs leading-relaxed ${
                      isReady
                        ? "text-white font-semibold"
                        : entry.tag === "ok"
                        ? "text-emerald-400/90"
                        : "text-neutral-400"
                    }`}
                  >
                    {entry.text}
                  </span>
                </motion.div>
              );
            })}

            {/* Blinking cursor */}
            {logs.length < BOOT_LOGS.length && (
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                className="w-2 h-3.5 sm:h-4 mt-1"
                style={{
                  background: "#6366f1",
                  boxShadow: "0 0 6px rgba(99,102,241,0.9)",
                }}
              />
            )}
            <div ref={bottomRef} />
          </div>

          {/* Progress bar + percent */}
          <div className="space-y-2">
            <ProgressBar progress={progress} />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-600 tracking-widest uppercase">
                Loading assets
              </span>
              <motion.span
                className="text-[10px] font-mono"
                style={{ color: "#6366f1" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.0, repeat: Infinity }}
              >
                {progress}%
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
