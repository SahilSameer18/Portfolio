import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

// ─── Module-scoped precomputed particle positions (Zero render-time RNG) ─────
const PARTICLE_COUNT = 550;
const particlePositions = new Float32Array(PARTICLE_COUNT * 3);

// Deterministic LCG pseudo-random generator
let seed = 42891;
function lcg() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particlePositions[i * 3]     = (lcg() - 0.5) * 26;
  particlePositions[i * 3 + 1] = (lcg() - 0.5) * 13;
  particlePositions[i * 3 + 2] = (lcg() - 0.5) * 6 - 3;
}

// ─── Single shared mouse ref (one listener for the whole scene) ───────────────
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

// ─── Particle cloud ──────────────────────────────────────────────────────────
function ParticleCloud({ isDark, mouse }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.012 + mouse.current.x * 0.05;
    ref.current.rotation.x = t * 0.007 + mouse.current.y * 0.03;
  });

  return (
    <Points ref={ref} positions={particlePositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={isDark ? "#818cf8" : "#6366f1"}
        size={0.040}
        sizeAttenuation
        depthWrite={false}
        opacity={isDark ? 0.42 : 0.30}
      />
    </Points>
  );
}

// ─── Wireframe torus ──────────────────────────────────────────────────────────
function WireTorus({ isDark, mouse }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.12 + mouse.current.y * 0.15;
    ref.current.rotation.y = t * 0.17 + mouse.current.x * 0.15;
    ref.current.rotation.z = t * 0.05;
  });
  return (
    <mesh ref={ref} position={[4.2, 0, -2]}>
      <torusGeometry args={[1.55, 0.010, 8, 60]} />
      <meshBasicMaterial
        color={isDark ? "#6366f1" : "#4f46e5"}
        opacity={isDark ? 0.26 : 0.18}
        transparent
        wireframe
      />
    </mesh>
  );
}

// ─── Photo orbit rings ────────────────────────────────────────────────────────
function PhotoOrbit({ isDark, mouse }) {
  const outer = useRef();
  const inner = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outer.current) {
      outer.current.rotation.x = Math.PI / 4 + mouse.current.y * 0.08;
      outer.current.rotation.y = t * 0.32 + mouse.current.x * 0.08;
    }
    if (inner.current) {
      inner.current.rotation.x = Math.PI / 3.5 + mouse.current.y * 0.06;
      inner.current.rotation.y = -t * 0.20;
    }
  });

  const color      = isDark ? "#6366f1" : "#4f46e5";
  const colorInner = isDark ? "#c084fc" : "#9333ea";

  return (
    <group position={[3.5, 0, 0]}>
      <mesh ref={outer}>
        <torusGeometry args={[2.0, 0.006, 6, 70]} />
        <meshBasicMaterial color={color} opacity={isDark ? 0.50 : 0.30} transparent />
      </mesh>
      <mesh ref={inner}>
        <torusGeometry args={[1.4, 0.004, 6, 60]} />
        <meshBasicMaterial color={colorInner} opacity={isDark ? 0.36 : 0.22} transparent />
      </mesh>
    </group>
  );
}

// ─── Camera parallax ──────────────────────────────────────────────────────────
function CameraRig({ mouse }) {
  const { camera } = useThree();
  const target     = useRef({ x: 0, y: 0 });

  useFrame(() => {
    target.current.x += (mouse.current.x * 0.35 - target.current.x) * 0.04;
    target.current.y += (mouse.current.y * 0.18 - target.current.y) * 0.04;
    camera.position.set(target.current.x, target.current.y, 8);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Scene ───────────────────────────────────────────────────────────────────
function Scene({ isDark }) {
  const mouse = useMouse();

  return (
    <>
      <CameraRig   mouse={mouse} />
      <ParticleCloud isDark={isDark} mouse={mouse} />
      <WireTorus     isDark={isDark} mouse={mouse} />
      <PhotoOrbit    isDark={isDark} mouse={mouse} />
    </>
  );
}

// ─── Exported canvas with Auto-Sleep frameloop ─────────────────────────────────
export default function HeroScene({ isDark, isVisible = true }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      frameloop={isVisible ? "always" : "never"}
      gl={{
        antialias: false,          // off — big win on low-end GPUs
        alpha: true,
        powerPreference: "low-power",
      }}
      dpr={1}                      // locked to 1 — no high-DPI upscale
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <Scene isDark={isDark} />
    </Canvas>
  );
}
