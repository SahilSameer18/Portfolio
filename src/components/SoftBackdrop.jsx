import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

/**
 * SoftBackdrop — full-screen fixed background layer with interactive particles.
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
    const maxParticles = 65;
    const mouse = { x: null, y: null, radius: 130 };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.baseSpeedY = -(Math.random() * 0.4 + 0.15); // float up (antigravity)
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = this.baseSpeedY;
        this.size = Math.random() * 1.8 + 0.8; // particles size
        this.opacity = Math.random() * 0.45 + 0.15;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reset if it goes off top
        if (this.y < -10) {
          this.y = window.innerHeight + 10;
          this.x = Math.random() * window.innerWidth;
          this.speedY = this.baseSpeedY;
          this.speedX = Math.random() * 0.2 - 0.1;
        }
        if (this.x < -10) this.x = window.innerWidth + 10;
        if (this.x > window.innerWidth + 10) this.x = -10;

        // Mouse interaction (repelling force)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius; // 0 to 1
            const angle = Math.atan2(dy, dx);
            const targetX = this.x + Math.cos(angle) * force * 18;
            const targetY = this.y + Math.sin(angle) * force * 18;

            this.x += (targetX - this.x) * 0.08;
            this.y += (targetY - this.y) * 0.08;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        if (theme === "dark") {
          ctx.fillStyle = `rgba(167, 139, 250, ${this.opacity})`; // violet-400
        } else {
          ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity * 0.7})`; // indigo-500
        }
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
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

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

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
};

export default SoftBackdrop;
