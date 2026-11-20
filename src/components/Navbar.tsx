import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Terminal, Download } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { navItems, personalInfo } from "../data/portfolio";

interface NavbarProps {
  onOpenTerminal: () => void;
}

export default function Navbar({ onOpenTerminal }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ["profile", "projects", "experience", "about", "stack", "contact"];
      for (const id of sectionIds.reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (href: string) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 pt-2.5 sm:pt-4 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Floating pill navigation container */}
        <div
          className={`pointer-events-auto flex items-center justify-between w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-300 ${
            scrolled
              ? "glass-panel shadow-2xl shadow-black/30 border-[var(--border)]"
              : "bg-[var(--surface)]/90 backdrop-blur-md border-[var(--border)]"
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#profile"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#profile");
            }}
            className="flex items-center gap-1.5 font-heading text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)] hover:opacity-80 transition-opacity"
          >
            <span>{personalInfo.shortName}</span>
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse"></span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const secId = item.href.replace("#", "");
              const isActive = activeSection === secId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(item.href);
                  }}
                  className={`relative px-3 py-1.5 text-xs font-mono-code font-medium tracking-wider transition-all rounded-full ${
                    isActive
                      ? "text-[var(--accent)] font-semibold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 border border-[var(--accent)]/40 bg-[var(--accent-muted)] rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Terminal Trigger */}
            <button
              onClick={onOpenTerminal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] border border-[var(--border-subtle)] rounded-full transition-colors"
              title="Buka Terminal (Ctrl+J)"
            >
              <Terminal size={13} />
              <span>TERMINAL</span>
            </button>

            {/* Resume button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#contact");
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono-code font-medium bg-[var(--accent)] text-[var(--accent-contrast)] hover:opacity-90 rounded-full transition-all"
            >
              <Download size={13} />
              <span>CV</span>
            </a>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] rounded-full transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] rounded-full transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto md:hidden mt-2 p-4 rounded-3xl glass-panel shadow-2xl border border-[var(--border)] max-w-6xl mx-auto"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(item.href);
                  }}
                  className="px-4 py-2.5 text-sm font-mono-code text-[var(--text-primary)] hover:bg-[var(--surface-hover)] rounded-xl transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenTerminal();
                  }}
                  className="inline-flex items-center gap-2 px-3 py-2 text-xs font-mono-code text-[var(--text-secondary)]"
                >
                  <Terminal size={14} />
                  <span>BUKA TERMINAL</span>
                </button>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo("#contact");
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code bg-[var(--accent)] text-[var(--accent-contrast)] rounded-full font-medium"
                >
                  <Download size={13} />
                  <span>UNDUH CV</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
