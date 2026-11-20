import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, BookOpen } from "lucide-react";
import { GithubIcon } from "./Icons";
import SectionWrapper from "./SectionWrapper";
import { projects, type Project } from "../data/portfolio";

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "featured">("all");

  const displayedProjects = filter === "featured"
    ? projects.filter((p) => p.featured)
    : projects;

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
          TOTAL {displayedProjects.length} PROYEK TERDAFTAR
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
              className="group rounded-3xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-black/20 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Cover */}
                <div className="relative h-56 sm:h-64 overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--surface-alt)]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-60" />

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

                  {/* Tech stack pills */}
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
              <div className="px-6 pb-6 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3 font-mono-code text-xs">
                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors"
                    >
                      <GithubIcon width={13} height={13} />
                      <span>KODE</span>
                    </a>
                  )}

                  {project.caseStudyUrl && (
                    <a
                      href={project.caseStudyUrl}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <BookOpen size={13} />
                      <span>STUDI KASUS</span>
                    </a>
                  )}
                </div>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] font-medium hover:opacity-90 transition-opacity"
                  >
                    <span>DEMO</span>
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}
