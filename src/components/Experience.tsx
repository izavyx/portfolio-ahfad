import { motion } from "framer-motion";
import { CheckCircle2, Calendar, MapPin, Film } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { experienceTimeline, journeyTimeline } from "../data/portfolio";

export default function Experience() {
  return (
    <SectionWrapper
      id="experience"
      sectionNumber="03"
      title="PENGALAMAN KERJA"
      subtitle="PENGALAMAN INDUSTRI"
    >
      <div className="space-y-12">
        {/* Industry Experience Card */}
        {experienceTimeline.map((exp) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)] transition-all shadow-sm"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pb-6 border-b border-[var(--border-subtle)]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono-code text-[11px] font-semibold bg-[var(--accent-muted)] text-[var(--accent)] mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <span>FREELANCE // {exp.number}</span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                  {exp.title}
                </h3>
                <p className="text-base font-medium text-[var(--accent)] mt-1">
                  {exp.organization}
                </p>
              </div>

              <div className="space-y-1 text-right font-mono-code text-xs text-[var(--text-muted)]">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Calendar size={13} />
                  <span>{exp.period}</span>
                </div>
                {exp.duration && (
                  <span className="inline-block px-2 py-0.5 rounded bg-[var(--surface-alt)] border border-[var(--border-subtle)] text-[10px]">
                    {exp.duration}
                  </span>
                )}
                {exp.location && (
                  <div className="flex items-center sm:justify-end gap-1.5 text-[var(--text-muted)]">
                    <MapPin size={13} />
                    <span>{exp.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
              {exp.description}
            </p>

            {/* Responsibilities list */}
            {exp.highlights && (
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {exp.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                    <CheckCircle2 size={16} className="text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Tags & Actions */}
            <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5 font-mono-code text-[11px]">
                {exp.tags?.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-[var(--surface-alt)] border border-[var(--border-subtle)] text-[var(--text-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-alt)] text-[var(--text-primary)] hover:border-[var(--border-hover)] font-mono-code text-xs transition-colors"
              >
                <Film size={13} className="text-[var(--accent)]" />
                <span>LIHAT KARYA REEL</span>
              </a>
            </div>
          </motion.div>
        ))}

        {/* Career Journey Milestones */}
        <div className="pt-8">
          <div className="font-mono-code text-xs text-[var(--accent)] font-semibold tracking-wider uppercase mb-6 flex items-center gap-2">
            <span>04 / PERJALANAN</span>
            <span className="h-px w-10 bg-[var(--accent)] opacity-40"></span>
            <span>MILESTONE PERJALANAN</span>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {journeyTimeline.map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]"
              >
                <div className="font-mono-code text-xs font-bold text-[var(--accent)] mb-2">
                  {item.number} · MILESTONE
                </div>
                <h4 className="font-heading text-base font-bold text-[var(--text-primary)] mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
