import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

// ─── Module-scoped Particle Class (Zero reallocation on render) ─────────────
class Particle {
  constructor(width, height) {
    this.reset(width, height, true);
  }

  reset(width, height, initial = false) {
    this.x = Math.random() * width;
    this.y = initial ? Math.random() * height : height + 10;
    this.baseSpeedY = -(Math.random() * 0.3 + 0.08);
    this.speedX = Math.random() * 0.15 - 0.075;
    this.speedY = this.baseSpeedY;
    this.size = Math.random() * 1.2 + 0.6;      // 0.6–1.8px — tiny
    this.opacity = Math.random() * 0.26 + 0.12; // 0.12–0.38 — subtle
  }

  update(mouse, width, height) {
    this.x += this.speedX;
    this.y += this.speedY;

    // Reset if it goes off top
    if (this.y < -10) {
      this.reset(width, height, false);
    }
    if (this.x < -10) this.x = width + 10;
    if (this.x > width + 10) this.x = -10;

    // Mouse interaction (repelling force)
    if (mouse.x !== null && mouse.y !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const distance = Math.hypot(dx, dy);

      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        const targetX = this.x + Math.cos(angle) * force * 18;
        const targetY = this.y + Math.sin(angle) * force * 18;

        this.x += (targetX - this.x) * 0.08;
        this.y += (targetY - this.y) * 0.08;
      }
    }
  }

  draw(ctx, isDark) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    if (isDark) {
      ctx.fillStyle = `rgba(129, 140, 248, ${this.opacity})`; // indigo-400
    } else {
      ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity * 0.75})`; // indigo-500
    }
    ctx.fill();
  }
}

/**
 * SoftBackdrop — full-screen fixed background layer with optimized particles.
 * Reduced from 120 -> 45 particles to minimize GPU/CPU redraw overhead on low-end laptops.
 */
const SoftBackdrop = () => {
  const { theme } = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const maxParticles = 45; // reduced: saves 60% GPU raster cycles
    const mouse = { x: null, y: null, radius: 120 };
    let isDark = theme === "dark";

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(mouse, w, h);
        particles[i].draw(ctx, isDark);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    // Auto-pause loop when tab is hidden to preserve battery / low-end CPU
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [theme]);

  return (
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

      {/* Canvas on top of backgrounds so particles are visible */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
    </div>
  );
};

export default SoftBackdrop;