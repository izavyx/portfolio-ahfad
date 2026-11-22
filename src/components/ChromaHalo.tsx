import { useEffect, useRef, useState } from "react";

export interface ChromaHaloProps {
  /** Radius of the core pointer halo in pixels */
  radius?: number;
  /** Maximum blooming radius of the diffusing ink spots */
  bloomRadius?: number;
  /** How long ink particles bloom and linger in seconds */
  duration?: number;
  /** Custom chromatic color palette */
  colors?: string[];
  /** Overall opacity multiplier */
  opacity?: number;
  /** Canvas blend mode in dark mode */
  blendMode?: GlobalCompositeOperation;
  /** Trigger an extra bloom splash on click */
  clickBloom?: boolean;
  /** Extra CSS classes */
  className?: string;
}

interface InkDrop {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  maxR: number;
  age: number;
  life: number;
  color: string;
}

export default function ChromaHalo({
  radius = 18,
  bloomRadius = 70,
  duration = 1.4,
  colors,
  opacity = 0.85,
  blendMode = "screen",
  clickBloom = true,
  className = "",
}: ChromaHaloProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Detect touch-only devices to avoid unnecessary overhead
    if (window.matchMedia("(pointer: coarse)").matches && !window.matchMedia("(pointer: fine)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const checkDark = () => {
      const dark =
        document.documentElement.getAttribute("data-theme") === "dark" ||
        document.documentElement.classList.contains("dark") ||
        (window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false);
      setIsDark(dark);
      return dark;
    };

    let darkCurrent = checkDark();

    const themeObserver = new MutationObserver(() => {
      darkCurrent = checkDark();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates & smooth trailing halo
    const mouse = { x: width / 2, y: height / 2, moved: false, inside: false };
    const halo = { x: width / 2, y: height / 2, vx: 0, vy: 0 };
    const particles: InkDrop[] = [];
    let lastTime = performance.now();
    let spawnTimer = 0;

    // Palettes matching portfolio design tokens
    const darkPalette = [
      "rgba(59, 130, 246, 0.45)",   // Accent blue
      "rgba(99, 102, 241, 0.40)",   // Indigo
      "rgba(147, 51, 234, 0.35)",   // Purple
      "rgba(6, 182, 212, 0.40)",    // Cyan
      "rgba(56, 189, 248, 0.45)",   // Sky blue
    ];

    const lightPalette = [
      "rgba(37, 99, 235, 0.35)",   // Deep royal blue
      "rgba(79, 70, 229, 0.30)",   // Deep indigo
      "rgba(147, 51, 234, 0.30)",  // Soft violet
      "rgba(13, 148, 136, 0.32)",  // Deep teal ink
      "rgba(2, 132, 199, 0.35)",   // Rich sky
    ];

    const getPalette = () => {
      if (colors && colors.length > 0) return colors;
      return darkCurrent ? darkPalette : lightPalette;
    };

    const spawnInkDrop = (x: number, y: number, speedMultiplier = 1, isClick = false) => {
      const palette = getPalette();
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.3 + Math.random() * 1.8) * speedMultiplier;
      const col = palette[Math.floor(Math.random() * palette.length)];
      const maxR = (radius * 1.2 + Math.random() * bloomRadius) * (isClick ? 1.4 : 1);

      particles.push({
        x: x + (Math.random() - 0.5) * radius * 0.5,
        y: y + (Math.random() - 0.5) * radius * 0.5,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: radius * (0.4 + Math.random() * 0.4),
        maxR,
        age: 0,
        life: duration * (0.8 + Math.random() * 0.5),
        color: col,
      });

      if (particles.length > 180) {
        particles.shift();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.inside = true;
      if (!mouse.moved) {
        halo.x = e.clientX;
        halo.y = e.clientY;
        mouse.moved = true;
      }
    };

    const handleMouseEnter = () => {
      mouse.inside = true;
    };

    const handleMouseLeave = () => {
      mouse.inside = false;
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickBloom) return;
      const count = 10;
      for (let i = 0; i < count; i++) {
        spawnInkDrop(e.clientX, e.clientY, 2.5, true);
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);
    window.addEventListener("resize", handleResize);

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Smooth trailing halo spring physics
      const spring = 0.16;
      halo.vx = (mouse.x - halo.x) * spring;
      halo.vy = (mouse.y - halo.y) * spring;
      halo.x += halo.vx;
      halo.y += halo.vy;

      const speed = Math.hypot(halo.vx, halo.vy);

      // Spawn soft blooming ink droplets on cursor motion
      if (mouse.inside && mouse.moved) {
        spawnTimer += dt;
        const interval = Math.max(0.015, 0.055 - speed * 0.002);
        if (spawnTimer >= interval) {
          spawnTimer = 0;
          spawnInkDrop(halo.x, halo.y, Math.min(speed * 0.08, 1.6));
        }
      }

      ctx.save();
      ctx.globalCompositeOperation = darkCurrent ? blendMode : "source-over";

      // 1. Draw diffusing ink bloom particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += dt;
        if (p.age >= p.life) {
          particles.splice(i, 1);
          continue;
        }

        const progress = p.age / p.life;
        const expansion = Math.sin(progress * Math.PI * 0.5);
        const currentR = p.r + (p.maxR - p.r) * expansion;
        const fade = Math.sin(progress * Math.PI) * opacity;

        p.x += p.vx * (1 - progress * 0.6);
        p.y += p.vy * (1 - progress * 0.6);

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentR);
        grad.addColorStop(0, p.color);
        grad.addColorStop(0.45, p.color.replace(/[\d.]+\)$/, `${0.22 * fade})`));
        grad.addColorStop(1, p.color.replace(/[\d.]+\)$/, "0)"));

        ctx.globalAlpha = fade;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentR, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw active glowing chromatic halo at cursor
      if (mouse.inside && mouse.moved) {
        const coreR = radius * (1 + Math.min(speed * 0.03, 0.4));
        const outerR = coreR * 2.8;

        const haloGrad = ctx.createRadialGradient(halo.x, halo.y, 0, halo.x, halo.y, outerR);
        if (darkCurrent) {
          haloGrad.addColorStop(0, "rgba(255, 255, 255, 0.35)");
          haloGrad.addColorStop(0.2, "rgba(59, 130, 246, 0.45)");
          haloGrad.addColorStop(0.55, "rgba(147, 51, 234, 0.22)");
          haloGrad.addColorStop(1, "rgba(6, 182, 212, 0)");
        } else {
          haloGrad.addColorStop(0, "rgba(37, 99, 235, 0.35)");
          haloGrad.addColorStop(0.3, "rgba(79, 70, 229, 0.25)");
          haloGrad.addColorStop(0.6, "rgba(147, 51, 234, 0.15)");
          haloGrad.addColorStop(1, "rgba(37, 99, 235, 0)");
        }

        ctx.globalAlpha = opacity * 0.9;
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(halo.x, halo.y, outerR, 0, Math.PI * 2);
        ctx.fill();

        // Delicate inner core pip
        ctx.globalAlpha = opacity * 0.75;
        ctx.fillStyle = darkCurrent ? "rgba(255, 255, 255, 0.6)" : "rgba(37, 99, 235, 0.7)";
        ctx.beginPath();
        ctx.arc(halo.x, halo.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      themeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, [radius, bloomRadius, duration, colors, opacity, blendMode, clickBloom]);

  if (isTouchDevice) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-500 ${className}`}
      style={{ mixBlendMode: isDark && blendMode === "screen" ? "screen" : undefined }}
      aria-hidden="true"
    />
  );
}
