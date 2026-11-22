import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export interface UserCursorProps {
  /** Name displayed inside the collaborator tag */
  name?: string;
  /** Optional short role or handle badge */
  badge?: string;
  /** Accent background color of the cursor & tag */
  color?: string;
  /** Text color inside the tag */
  textColor?: string;
  /** Whether to hide the native OS cursor */
  hideDefaultCursor?: boolean;
  /** Offset from pointer when native cursor remains visible */
  offset?: { x: number; y: number };
  /** Spring stiffness */
  stiffness?: number;
  /** Spring damping */
  damping?: number;
  className?: string;
}

export default function UserCursor({
  name = "Ahfadh",
  badge = "@necessaryy._",
  color = "var(--accent)",
  textColor = "#ffffff",
  hideDefaultCursor = false,
  offset = { x: 14, y: 16 },
  stiffness = 420,
  damping = 32,
  className = "",
}: UserCursorProps) {
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const rawRotate = useMotionValue(0);

  const x = useSpring(rawX, { stiffness, damping, mass: 0.45 });
  const y = useSpring(rawY, { stiffness, damping, mass: 0.45 });
  const rotate = useSpring(rawRotate, { stiffness: 260, damping: 22 });

  const offsetX = offset?.x ?? 14;
  const offsetY = offset?.y ?? 16;

  useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reducedMotion) return;

    const coarseOnly =
      window.matchMedia?.("(pointer: coarse)")?.matches &&
      !window.matchMedia?.("(pointer: fine)")?.matches;
    if (coarseOnly) return;

    const effectiveX = hideDefaultCursor ? 0 : offsetX;
    const effectiveY = hideDefaultCursor ? 0 : offsetY;
    let lastX = 0;
    let resetTiltTimer = 0;

    if (hideDefaultCursor) {
      document.documentElement.classList.add("cursor-none");
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") {
        setVisible(false);
        return;
      }

      const nextX = e.clientX + effectiveX;
      const nextY = e.clientY + effectiveY;
      const dx = e.clientX - lastX;
      lastX = e.clientX;

      rawX.set(nextX);
      rawY.set(nextY);
      setVisible(true);

      // Subtle velocity-based tilt
      const clampedTilt = Math.max(-12, Math.min(12, dx * 0.45));
      rawRotate.set(clampedTilt);
      window.clearTimeout(resetTiltTimer);
      resetTiltTimer = window.setTimeout(() => rawRotate.set(0), 90);

      // Detect interactive element hover
      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest("a, button, [role='button'], input, textarea, select, [data-cursor-interactive]")
      );
      setHoveringInteractive(isInteractive);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      setPressed(true);
    };

    const onPointerUp = () => {
      setPressed(false);
    };

    const onMouseLeave = () => {
      setVisible(false);
      setPressed(false);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.clearTimeout(resetTiltTimer);
      if (hideDefaultCursor) {
        document.documentElement.classList.remove("cursor-none");
      }
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [hideDefaultCursor, offsetX, offsetY, rawX, rawY, rawRotate]);

  return (
    <motion.div
      aria-hidden="true"
      className={`fixed top-0 left-0 z-[70] pointer-events-none select-none will-change-transform ${className}`}
      style={{
        x,
        y,
        rotate,
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: pressed ? 0.9 : hoveringInteractive ? 1.05 : 1,
      }}
      transition={{ opacity: { duration: 0.16 }, scale: { duration: 0.14 } }}
    >
      <div className="relative flex items-start">
        {/* Multiplayer Collaborator Pointer Arrow */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)] shrink-0"
        >
          <path
            d="M4.5 3.5L19.5 11.2L12.6 13.6L9.8 20.5L4.5 3.5Z"
            fill={color}
            stroke="#ffffff"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>

        {/* Floating Name Tag */}
        <div
          className="ml-1 mt-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full rounded-tl-sm shadow-lg shadow-black/30 border border-white/20 backdrop-blur-md whitespace-nowrap"
          style={{
            backgroundColor: color,
            color: textColor,
          }}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              hoveringInteractive ? "bg-emerald-300 animate-ping" : "bg-white/90"
            }`}
          />
          <span className="font-mono-code text-[11px] font-semibold tracking-wide leading-none">
            {name}
          </span>
          {badge && (
            <span className="font-mono-code text-[10px] opacity-80 border-l border-white/25 pl-1.5 leading-none">
              {badge}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
