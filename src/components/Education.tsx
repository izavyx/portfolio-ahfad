import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { educationTimeline, certificates } from "../data/portfolio";

export default function Education() {
  return (
    <SectionWrapper
      id="education"
      sectionNumber="07"
      title="PENDIDIKAN & SERTIFIKASI"
      subtitle="LATAR BELAKANG AKADEMIK"
    >
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Education Timeline */}
        <div className="lg:col-span-7 space-y-6">
          <div className="font-mono-code text-xs text-[var(--accent)] font-semibold tracking-wider uppercase mb-2">
            // PENDIDIKAN FORMAL
          </div>

          {educationTimeline.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)] transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[var(--accent-muted)] text-[var(--accent)]">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">
                      {edu.title}
                    </h3>
                    <p className="text-sm font-medium text-[var(--accent)]">
                      {edu.organization}
                    </p>
                  </div>
                </div>

                <span className="font-mono-code text-xs px-2.5 py-1 rounded-md bg-[var(--surface-alt)] border border-[var(--border-subtle)] text-[var(--text-muted)] whitespace-nowrap">
                  {edu.period}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {edu.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="lg:col-span-5 space-y-4">
          <div className="font-mono-code text-xs text-[var(--accent)] font-semibold tracking-wider uppercase mb-2">
            // SERTIFIKASI & PELATIHAN
          </div>

          <div className="space-y-3">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)] transition-all flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <h4 className="font-heading text-sm font-bold text-[var(--text-primary)]">
                    {cert.title}
                  </h4>
                  <div className="flex items-center gap-2 font-mono-code text-[11px] text-[var(--text-muted)]">
                    <span>{cert.issuer}</span>
                    <span>·</span>
                    <span>{cert.period}</span>
                  </div>
                  {cert.skills && (
                    <div className="flex flex-wrap gap-1 pt-1 font-mono-code text-[10px]">
                      {cert.skills.map((s) => (
                        <span key={s} className="px-1.5 py-0.5 rounded bg-[var(--surface-alt)] text-[var(--text-secondary)]">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-2 rounded-lg bg-[var(--surface-alt)] text-[var(--text-muted)]">
                  <Award size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
