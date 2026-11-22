import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CornerDownLeft } from "lucide-react";
import { terminalCommands } from "../data/portfolio";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: string;
}

export default function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: "welcome",
      output: `AHFADH-OS v1.0.0 (x86_64-pc-browser)
Ketik 'help' untuk daftar perintah yang tersedia.`,
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const output =
      terminalCommands[trimmed] ||
      `Perintah '${trimmed}' tidak dikenali. Ketik 'help' untuk daftar perintah.`;

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput("");
  };

  const quickCommands = ["help", "whoami", "skills", "instagram", "contact", "clear"];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-[#0d1117] text-zinc-200 shadow-2xl overflow-hidden font-mono-code flex flex-col max-h-[80vh]"
          >
            {/* macOS Chrome Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs text-zinc-400">visitor@ahfadh: ~ zsh</span>
              </div>
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label="Close terminal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick Command Pills */}
            <div className="flex items-center gap-1.5 px-4 py-2 bg-[#1b2028] border-b border-zinc-800/80 overflow-x-auto text-[11px]">
              <span className="text-zinc-500">Quick:</span>
              {quickCommands.map((qc) => (
                <button
                  key={qc}
                  onClick={() => handleCommand(qc)}
                  className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                >
                  {qc}
                </button>
              ))}
            </div>

            {/* Terminal Body */}
            <div className="p-4 overflow-y-auto flex-1 space-y-4 text-xs">
              {history.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span>visitor@ahfadh:~$</span>
                    <span className="text-white">{item.command}</span>
                  </div>
                  <pre className="text-zinc-300 whitespace-pre-wrap pl-4 border-l border-zinc-800 leading-relaxed font-sans text-xs">
                    {item.output}
                  </pre>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommand(input);
              }}
              className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-t border-zinc-800"
            >
              <span className="text-emerald-400 text-xs">visitor@ahfadh:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ketik perintah..."
                className="flex-1 bg-transparent text-xs text-white focus:outline-none placeholder-zinc-600"
              />
              <button
                type="submit"
                className="p-1 rounded text-zinc-400 hover:text-white"
                title="Jalankan perintah"
              >
                <CornerDownLeft size={14} />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
