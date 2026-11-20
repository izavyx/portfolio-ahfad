import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import GitHubActivity from "./components/GitHubActivity";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import TerminalModal from "./components/TerminalModal";
import MusicPlayer from "./components/MusicPlayer";
import AiAssistant from "./components/AiAssistant";

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Global keyboard shortcut Ctrl+J to toggle terminal modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300 relative selection:bg-[var(--accent)] selection:text-white">
      {/* Navigation Header */}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Floating Interactive Music Player */}
      <MusicPlayer />

      {/* Main Sections */}
      <main>
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />
        <Projects />
        <About />
        <Experience />
        <Skills />
        <GitHubActivity />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Terminal Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Floating AI Assistant Chat */}
      <AiAssistant />
    </div>
  );
}
