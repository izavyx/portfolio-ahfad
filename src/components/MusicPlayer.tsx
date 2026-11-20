import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Music, X } from "lucide-react";

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  const track = {
    title: "Born to Die",
    artist: "Lana Del Rey",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
    duration: "4:25",
    currentTime: "1:33",
  };

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-40">
      {/* Mini Floating Pill Trigger */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel shadow-lg border border-[var(--border)] text-xs font-mono-code text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all"
        >
          <span className={`w-2 h-2 rounded-full bg-blue-500 ${isPlaying ? "animate-pulse" : ""}`} />
          <span className="truncate max-w-[120px] sm:max-w-[160px] font-medium">
            {track.title} · {track.artist}
          </span>
          <Music size={12} className="text-[var(--accent)]" />
        </motion.button>
      )}

      {/* Expanded Audio Player Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="w-72 rounded-3xl glass-panel p-4 shadow-2xl border border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-3">
              <div className="flex items-center gap-1.5 font-mono-code text-[11px] text-[var(--text-muted)]">
                <Music size={12} className="text-[var(--accent)]" />
                <span>SEDANG DIPUTAR</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Close music player"
              >
                <X size={14} />
              </button>
            </div>

            {/* Track Info & Cover */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-[var(--border-subtle)] flex-shrink-0">
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden">
                <h4 className="font-heading text-sm font-bold text-[var(--text-primary)] truncate">
                  {track.title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] truncate">
                  {track.artist}
                </p>
              </div>
            </div>

            {/* Scrubber Progress Bar */}
            <div className="space-y-1 mb-4">
              <div
                className="w-full h-1.5 rounded-full bg-[var(--surface-alt)] border border-[var(--border-subtle)] overflow-hidden cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                  setProgress(Math.max(0, Math.min(100, pct)));
                }}
              >
                <div
                  className="h-full bg-[var(--accent)] rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between font-mono-code text-[10px] text-[var(--text-muted)]">
                <span>{track.currentTime}</span>
                <span>{track.duration}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="p-1.5 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <SkipBack size={16} />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] hover:opacity-90 shadow-md transition-all"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
              </button>

              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="p-1.5 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <SkipForward size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
