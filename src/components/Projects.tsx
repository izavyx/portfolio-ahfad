import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Play,
  X,
  AlertCircle,
  CheckCircle2,
  Sliders,
  Layers,
  Scan,
  Copy,
  Check,
  Film,
} from "lucide-react";
import { InstagramIcon } from "./Icons";
import SectionWrapper from "./SectionWrapper";
import { projects, socialLinks, type Project } from "../data/portfolio";

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [previewMode, setPreviewMode] = useState<"embed" | "cover">("embed");
  const [copiedLink, setCopiedLink] = useState(false);

  const displayedProjects =
    filter === "featured" ? projects.filter((p) => p.featured) : projects;

  const instagramProfileUrl =
    socialLinks.find((s) => s.name === "Instagram")?.url ||
    "https://www.instagram.com/necessaryy._/";

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  const openModal = (project: Project) => {
    setPreviewMode("embed");
    setCopiedLink(false);
    setSelectedProject(project);
  };

  const handleCopyReelLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <SectionWrapper
      id="projects"
      sectionNumber="01"
      title="PROYEK"
      subtitle="KARYA TERPILIH"
    >
      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-10 pb-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1.5 rounded-full font-mono-code text-xs uppercase tracking-wider transition-all ${
              filter === "all"
                ? "bg-[var(--accent)] text-[var(--accent-contrast)] font-semibold shadow-md"
                : "border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
            }`}
          >
            SEMUA ({projects.length})
          </button>
          <button
            onClick={() => setFilter("featured")}
            className={`px-4 py-1.5 rounded-full font-mono-code text-xs uppercase tracking-wider transition-all ${
              filter === "featured"
                ? "bg-[var(--accent)] text-[var(--accent-contrast)] font-semibold shadow-md"
                : "border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
            }`}
          >
            UNGGULAN ({projects.filter((p) => p.featured).length})
          </button>
        </div>

        <span className="font-mono-code text-xs text-[var(--text-muted)] hidden sm:inline-block">
          TOTAL {displayedProjects.length} REEL TERDAFTAR
        </span>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid md:grid-cols-2 gap-6 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project: Project, index: number) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              onClick={() => openModal(project)}
              className="group cursor-pointer rounded-3xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-black/20 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Cover */}
                <div className="relative h-64 sm:h-72 overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--surface-alt)]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-black/20 to-transparent opacity-80" />

                  {/* Play indicator overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-[var(--accent)]/90 text-white flex items-center justify-center shadow-xl shadow-black/40 backdrop-blur-md scale-95 group-hover:scale-100 transition-transform">
                      <Play size={22} className="ml-0.5 fill-current" />
                    </div>
                  </div>

                  {/* Top Badge: Number and Category */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full font-mono-code text-[11px] font-bold bg-black/70 text-white backdrop-blur-md border border-white/10">
                      {project.number}
                    </span>
                    <span className="px-3 py-1 rounded-full font-mono-code text-[10px] tracking-wider uppercase font-semibold bg-[var(--accent)] text-white backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {project.version && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 rounded-full font-mono-code text-[10px] bg-black/60 text-zinc-300 border border-white/10">
                        {project.version}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tools & tags pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg font-mono-code text-[11px] border border-[var(--border-subtle)] bg-[var(--surface-muted)] text-[var(--text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="px-6 pb-6 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3 font-mono-code text-xs"
              >
                <button
                  type="button"
                  onClick={() => openModal(project)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors"
                >
                  <Film size={13} />
                  <span>DETAIL & PREVIEW</span>
                </button>

                <a
                  href={project.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] font-medium hover:opacity-90 transition-opacity"
                >
                  <InstagramIcon width={13} height={13} />
                  <span>REEL</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Pop-up Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              className="w-full max-w-4xl max-h-[90vh] rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-start sm:items-center justify-between gap-4 px-5 sm:px-7 py-4 sm:py-5 border-b border-[var(--border-subtle)] bg-[var(--surface)]">
                <div>
                  <div className="font-mono-code text-[11px] font-semibold tracking-wider text-[var(--accent)] uppercase mb-1">
                    {selectedProject.number} / {selectedProject.category}
                  </div>
                  <h3
                    id="project-modal-title"
                    className="font-heading text-lg sm:text-2xl font-extrabold uppercase tracking-tight text-[var(--text-primary)]"
                  >
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono-code text-xs transition-colors"
                >
                  <X size={14} />
                  <span>ESC / TUTUP</span>
                </button>
              </div>

              {/* Scrollable Modal Body */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5">
                {/* Preview Container */}
                <div className="relative rounded-2xl border border-[var(--border)] bg-[#0a0a0c] overflow-hidden">
                  {/* Top-left corner frame accent & top-right preview mode toggle */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-black/50">
                    <div className="flex items-center gap-2 font-mono-code text-[11px] text-zinc-400">
                      <Scan size={14} className="text-[var(--accent)]" />
                      <span>INSTAGRAM REEL PREVIEW</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono-code text-[11px]">
                      <button
                        type="button"
                        onClick={() => setPreviewMode("embed")}
                        className={`px-2.5 py-1 rounded-lg transition-colors ${
                          previewMode === "embed"
                            ? "bg-[var(--accent)] text-white font-semibold"
                            : "text-zinc-400 hover:text-white bg-white/5"
                        }`}
                      >
                        PLAYER
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewMode("cover")}
                        className={`px-2.5 py-1 rounded-lg transition-colors ${
                          previewMode === "cover"
                            ? "bg-[var(--accent)] text-white font-semibold"
                            : "text-zinc-400 hover:text-white bg-white/5"
                        }`}
                      >
                        POSTER
                      </button>
                    </div>
                  </div>

                  {previewMode === "embed" ? (
                    <div className="w-full py-5 px-4 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_70%)]">
                      <div className="w-full max-w-[340px] h-[520px] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                        <iframe
                          src={selectedProject.embedUrl}
                          title={selectedProject.title}
                          className="w-full h-full border-0"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                      <p className="mt-3 font-mono-code text-[11px] text-zinc-400 text-center">
                        Jika player tidak muncul karena pembatasan browser, gunakan tombol{" "}
                        <a
                          href={selectedProject.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--accent)] underline hover:opacity-80"
                        >
                          Tonton di Instagram
                        </a>{" "}
                        atau pilih tab POSTER.
                      </p>
                    </div>
                  ) : (
                    <div className="relative h-64 sm:h-80 w-full">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-5">
                        <span className="font-mono-code text-xs text-zinc-200">
                          {selectedProject.version} · {selectedProject.category}
                        </span>
                        <a
                          href={selectedProject.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--accent)] text-white font-mono-code text-xs font-semibold hover:opacity-90"
                        >
                          <Play size={13} className="fill-current" />
                          <span>PUTAR DI INSTAGRAM</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Description */}
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Two-Column Detail Cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]">
                    <div className="flex items-center gap-2 font-mono-code text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-2.5">
                      <AlertCircle size={14} />
                      <span>KONSEP & BRIEF</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {selectedProject.details.concept}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]">
                    <div className="flex items-center gap-2 font-mono-code text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2.5">
                      <CheckCircle2 size={14} />
                      <span>EKSEKUSI & SOLUSI</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {selectedProject.details.execution}
                    </p>
                  </div>
                </div>

                {/* Workflow & Tools Card */}
                <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] space-y-3">
                  <div className="flex items-center gap-2 font-mono-code text-xs font-semibold text-purple-400 uppercase tracking-wider">
                    <Sliders size={14} />
                    <span>WORKFLOW & TOOLS</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {selectedProject.details.workflow}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg font-mono-code text-[11px] border border-[var(--border-subtle)] bg-[var(--surface-alt)] text-[var(--text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights / Elemen Utama Card */}
                <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]">
                  <div className="flex items-center gap-2 font-mono-code text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
                    <Layers size={14} />
                    <span>ELEMEN UTAMA</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                    {selectedProject.details.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer Bar */}
              <div className="px-5 sm:px-7 py-4 border-t border-[var(--border-subtle)] bg-[var(--surface-muted)] flex flex-col gap-2.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={selectedProject.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent)] text-[var(--accent-contrast)] font-mono-code text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    <InstagramIcon width={14} height={14} />
                    <span>TONTON REEL DI INSTAGRAM</span>
                    <ExternalLink size={13} />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopyReelLink(selectedProject.instagramUrl)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] font-mono-code text-xs font-medium uppercase tracking-wider transition-colors"
                  >
                    {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copiedLink ? "LINK TERSALIN" : "SALIN LINK REEL"}</span>
                  </button>

                  <a
                    href={instagramProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent)]/90 text-[var(--accent-contrast)] font-mono-code text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    <span>PROFIL @necessaryy._</span>
                    <ExternalLink size={13} />
                  </a>
                </div>

                <span className="font-mono-code text-[11px] text-[var(--text-muted)]">
                  Tekan ESC atau klik di luar untuk menutup
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
