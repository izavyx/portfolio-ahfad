import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot, User } from "lucide-react";
import { personalInfo, socialLinks } from "../data/portfolio";

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ sender: "ai" | "user"; text: string }>>([
    {
      sender: "ai",
      text: `Halo! Saya asisten AI portofolio ${personalInfo.shortName}. Ada yang ingin Anda tanyakan seputar proyek, keahlian teknologi, atau pengalaman kerjanya?`,
    },
  ]);

  const quickPrompts = [
    "Apa proyek terbesarnya?",
    "Teknologi yang dikuasai?",
    "Pengalaman kerja saat ini?",
    "Bagaimana cara kontak?",
  ];

  const handleSend = (userText: string) => {
    const text = userText.trim();
    if (!text) return;

    const lower = text.toLowerCase();
    let reply = "";

    if (lower.includes("proyek") || lower.includes("project")) {
      reply = `${personalInfo.shortName} telah membangun beberapa proyek unggulan seperti StudyFlow (EdTech bertenaga AI), Internship Journal Siswa (React + Laravel), dan Class Portal Website. Cek bagian Proyek untuk detailnya!`;
    } else if (lower.includes("teknologi") || lower.includes("skill") || lower.includes("stack")) {
      reply = `Tech stack utamanya mencakup TypeScript, React, Next.js, Tailwind CSS di frontend; Node.js, Express, Laravel, Prisma, PostgreSQL di backend; serta integrasi AI dengan Gemini API.`;
    } else if (lower.includes("pengalaman") || lower.includes("kerja") || lower.includes("magang")) {
      reply = `Saat ini ${personalInfo.shortName} memiliki pengalaman sebagai Frontend Developer Intern di PT. AMA Salam Indonesia (5 bulan), mengembangkan sistem manajemen proyek dan optimasi performa web vitals.`;
    } else if (lower.includes("kontak") || lower.includes("hubungi") || lower.includes("email")) {
      const linkedInHandle = socialLinks.find((s) => s.name === "LinkedIn")?.handle || "LinkedIn";
      reply = `Anda dapat menghubungi ${personalInfo.shortName} langsung melalui email di ${personalInfo.email} atau LinkedIn di ${linkedInHandle}.`;
    } else {
      reply = `Terima kasih pertanyaannya! ${personalInfo.shortName} adalah Web Developer & Software Engineer berfokus pada ekosistem React, TypeScript, dan arsitektur backend scalable. Ada hal spesifik lain yang ingin Anda ketahui?`;
    }

    setMessages((prev) => [...prev, { sender: "user", text }, { sender: "ai", text: reply }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Sparkle Button */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] shadow-xl shadow-[var(--accent)]/30 hover:opacity-95 font-mono-code text-xs font-semibold tracking-wider uppercase transition-all hover:scale-105"
        >
          <Sparkles size={15} />
          <span>TANYA AI</span>
        </motion.button>
      )}

      {/* Chat Window Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-80 sm:w-96 rounded-3xl glass-panel shadow-2xl border border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-xl overflow-hidden flex flex-col h-[480px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--surface-muted)] border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center">
                  <Bot size={15} />
                </div>
                <div>
                  <h4 className="font-heading text-xs font-bold text-[var(--text-primary)]">
                    ASISTEN PORTOFOLIO
                  </h4>
                  <div className="flex items-center gap-1.5 font-mono-code text-[10px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ONLINE · AI READY</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Close assistant"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-2 items-start ${
                    m.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] ${
                      m.sender === "user"
                        ? "bg-[var(--accent)] text-white"
                        : "bg-[var(--surface-alt)] border border-[var(--border)] text-[var(--accent)]"
                    }`}
                  >
                    {m.sender === "user" ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  <div
                    className={`px-3 py-2 rounded-2xl max-w-[80%] leading-relaxed ${
                      m.sender === "user"
                        ? "bg-[var(--accent)] text-white rounded-tr-none font-medium"
                        : "bg-[var(--surface-alt)] border border-[var(--border-subtle)] text-[var(--text-secondary)] rounded-tl-none"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompts */}
            <div className="p-2 border-t border-[var(--border-subtle)] bg-[var(--surface-muted)] overflow-x-auto flex gap-1.5 no-scrollbar">
              {quickPrompts.map((qp) => (
                <button
                  key={qp}
                  onClick={() => handleSend(qp)}
                  className="px-2.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] text-[10px] font-mono-code text-[var(--text-muted)] hover:text-[var(--text-primary)] whitespace-nowrap transition-colors"
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 border-t border-[var(--border-subtle)] flex items-center gap-2 bg-[var(--surface)]"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanyakan sesuatu..."
                className="flex-1 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-alt)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
              >
                <Send size={13} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
