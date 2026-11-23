import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from "framer-motion";

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
  /** Maximum tilt rotation angle in degrees */
  maxTilt?: number;
  className?: string;
}

export default function UserCursor({
  name = "Ahfadh",
  badge = "@necessaryy._",
  color = "var(--accent)",
  textColor = "#ffffff",
  hideDefaultCursor = true,
  offset = { x: 14, y: 16 },
  stiffness = 950,
  damping = 48,
  maxTilt = 28,
  className = "",
}: UserCursorProps) {
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const x = useSpring(rawX, { stiffness, damping, mass: 0.2 });
  const y = useSpring(rawY, { stiffness, damping, mass: 0.2 });

  const xVelocity = useVelocity(x);
  const yVelocity = useVelocity(y);

  const targetRotate = useTransform([xVelocity, yVelocity], ([vx, vy]: number[]) => {
    const angle = vx * 0.024 - vy * 0.005;
    return Math.max(-maxTilt, Math.min(maxTilt, angle));
  });

  const rotate = useSpring(targetRotate, { stiffness: 320, damping: 20, mass: 0.3 });

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
    let hasMoved = false;

    if (hideDefaultCursor) {
      document.documentElement.classList.add("hide-os-cursor");
    }

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") {
        setVisible(false);
        return;
      }

      const target = e.target as HTMLElement | null;
      if (target?.tagName === "IFRAME") {
        setVisible(false);
        return;
      }

      const nextX = e.clientX + effectiveX;
      const nextY = e.clientY + effectiveY;

      if (!hasMoved) {
        hasMoved = true;
        rawX.jump(nextX);
        rawY.jump(nextY);
        x.jump(nextX);
        y.jump(nextY);
      } else {
        rawX.set(nextX);
        rawY.set(nextY);
      }
      setVisible(true);

      // Detect interactive element hover
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
      hasMoved = false;
      setVisible(false);
      setPressed(false);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      if (hideDefaultCursor) {
        document.documentElement.classList.remove("hide-os-cursor");
      }
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [hideDefaultCursor, offsetX, offsetY, rawX, rawY, x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className={`fixed top-0 left-0 z-[70] pointer-events-none select-none will-change-transform ${className}`}
      style={{
        x,
        y,
        originX: 0,
        originY: 0,
        transformOrigin: "0px 0px",
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: pressed ? 0.9 : hoveringInteractive ? 1.05 : 1,
      }}
      transition={{ opacity: { duration: 0.16 }, scale: { duration: 0.14 } }}
    >
      <div className="relative flex items-start">
        {/* Multiplayer Collaborator Pointer Arrow (only the cursor arrow tilts, pivoting at its tip) */}
        <motion.svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            rotate,
            transformOrigin: "4px 3px",
          }}
          className="-ml-[4px] -mt-[3px] drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)] shrink-0 will-change-transform"
        >
          <path
            d="M4.5 3.5L19.5 11.2L12.6 13.6L9.8 20.5L4.5 3.5Z"
            fill={color}
            stroke="#ffffff"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </motion.svg>

        {/* Floating Name Tag (stays upright without tilt) */}
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
