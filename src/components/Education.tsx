import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { educationTimeline } from "../data/portfolio";

export default function Education() {
  return (
    <SectionWrapper
      id="education"
      sectionNumber="07"
      title="PENDIDIKAN"
      subtitle="LATAR BELAKANG AKADEMIK"
    >
      <div className="space-y-6">
        <div className="font-mono-code text-xs text-[var(--accent)] font-semibold tracking-wider uppercase">
          // PENDIDIKAN FORMAL
        </div>

        <div className="grid md:grid-cols-2 gap-6">
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
      </div>
    </SectionWrapper>
  );
}
