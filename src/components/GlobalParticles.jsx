import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

// ─── Mouse tracker ────────────────────────────────────────────────────────────
function useMouse() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const fn = (e) => {
      mouse.current.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", fn, { passive: true });
    return () => window.removeEventListener("pointermove", fn);
  }, []);
  return mouse;
}

// ─── Camera parallax ─────────────────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const mouse      = useMouse();
  const target     = useRef({ x: 0, y: 0 });

  useFrame(() => {
    target.current.x += (mouse.current.x * 0.25 - target.current.x) * 0.04;
    target.current.y += (mouse.current.y * 0.15 - target.current.y) * 0.04;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Particle field ───────────────────────────────────────────────────────────
function ParticleField({ isDark }) {
  const ref   = useRef();
  const mouse = useMouse();
  const count = 700;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 32;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    // Ultra-slow drift so it never distracts from content
    ref.current.rotation.y = t * 0.008 + mouse.current.x * 0.04;
    ref.current.rotation.x = t * 0.005 + mouse.current.y * 0.025;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? "#818cf8" : "#6366f1"}
        size={isDark ? 0.038 : 0.030}
        sizeAttenuation
        depthWrite={false}
        opacity={isDark ? 0.22 : 0.18}
      />
    </Points>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ isDark }) {
  return (
    <>
      <CameraRig />
      <ParticleField isDark={isDark} />
    </>
  );
}

// ─── Exported component — mount once in App.jsx ───────────────────────────────
export default function GlobalParticles() {
  const prefersReduced = useReducedMotion();
  const { theme }      = useTheme();
  const isDark         = theme === "dark";

  // Skip on reduced-motion or light mode (particles invisible on white)
  if (prefersReduced) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        dpr={[1, 1]}
        frameloop="always"
        style={{ width: "100%", height: "100%" }}
      >
        <Scene isDark={isDark} />
      </Canvas>
    </div>
  );
}

