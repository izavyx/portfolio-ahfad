import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Terminal, Briefcase } from "lucide-react";
import { personalInfo, socialLinks } from "../data/portfolio";

interface HeroProps {
  onOpenTerminal: () => void;
}

export default function Hero({ onOpenTerminal }: HeroProps) {
  const [cardRotate, setCardRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCardRotate({ x: -(y / 15), y: x / 15 });
  };

  const handleMouseLeave = () => {
    setCardRotate({ x: 0, y: 0 });
  };

  return (
    <section
      id="profile"
      className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[var(--border-subtle)]"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-[var(--accent)]/10 blur-[140px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-6xl mx-auto w-full">
        {/* Top Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-2.5 mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono-code text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold uppercase tracking-wider">{personalInfo.status}</span>
          </div>

          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface-alt)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] font-mono-code text-xs transition-colors"
          >
            <Briefcase size={12} className="text-[var(--accent)]" />
            <span>UNTUK REKRUTER →</span>
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Main Info */}
          <div className="lg:col-span-8">
            {/* Massive Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-[var(--text-primary)] leading-[1.05] uppercase mb-4"
            >
              {personalInfo.name}
            </motion.h1>

            {/* Sub-headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-mono-code text-sm sm:text-base font-semibold tracking-widest text-[var(--accent)] uppercase mb-6 flex items-center gap-2"
            >
              <span>——</span>
              <span>{personalInfo.role}</span>
            </motion.div>

            {/* Bio description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed mb-8"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] font-mono-code text-xs sm:text-sm font-semibold tracking-wider uppercase hover:opacity-95 shadow-lg shadow-[var(--accent)]/20 transition-all hover:-translate-y-0.5"
              >
                <span>LIHAT KARYA</span>
                <ArrowDown size={14} />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] font-mono-code text-xs sm:text-sm font-medium tracking-wider hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)] transition-all hover:-translate-y-0.5"
              >
                <Download size={14} />
                <span>UNDUH CV</span>
              </a>

              <a
                href={`https://github.com/${personalInfo.githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono-code text-xs sm:text-sm transition-colors"
              >
                <span>GITHUB</span>
                <ArrowUpRight size={14} />
              </a>

              {/* Terminal Trigger Button */}
              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-alt)] text-[var(--text-muted)] hover:text-[var(--text-primary)] font-mono-code text-xs transition-colors"
              >
                <Terminal size={14} className="text-[var(--accent)]" />
                <span>_ INVOKE TERMINAL [Ctrl+J]</span>
              </button>
            </motion.div>

            {/* Social Icons Dock */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 text-[var(--text-muted)]"
            >
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:text-[var(--accent)] hover:bg-[var(--surface-hover)] transition-colors"
                  aria-label={s.name}
                >
                  <s.icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Interactive Lanyard / ID Badge Card */}
          <div className="lg:col-span-4 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${cardRotate.x}deg) rotateY(${cardRotate.y}deg)`,
                transition: "transform 0.15s ease-out",
              }}
              className="relative w-64 sm:w-72 rounded-3xl p-5 border border-[var(--border)] bg-[var(--surface)] shadow-2xl shadow-black/40"
            >
              {/* Lanyard Clip Simulation */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-600 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-zinc-400"></div>
              </div>

              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-4">
                <span className="font-mono-code text-[10px] tracking-widest text-[var(--accent)] font-semibold uppercase">
                  {personalInfo.shortName}.DEV // RUNNER
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>

              {/* Photo / Avatar */}
              <div className="w-full h-44 rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface-alt)] mb-4 flex items-center justify-center relative group">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Card Details */}
              <div className="space-y-1">
                <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">
                  {personalInfo.name}
                </h3>
                <p className="font-mono-code text-xs text-[var(--text-secondary)]">
                  FULL-STACK DEV
                </p>
                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono-code text-[10px] text-[var(--text-muted)]">
                  <span>ID: #DEV-2026</span>
                  <span>BOGOR, ID</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-16 flex items-center justify-center gap-2 font-mono-code text-xs text-[var(--text-muted)] tracking-widest">
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            GULIR ↓
          </motion.span>
        </div>
      </div>
    </section>
  );
}
