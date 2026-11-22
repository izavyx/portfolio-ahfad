import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { skillCategories } from "../data/portfolio";

export default function Skills() {
  const allSkillsList = skillCategories.flatMap((c) => c.skills.map((s) => s.name));

  return (
    <SectionWrapper
      id="stack"
      sectionNumber="05"
      title="TOOLS"
      subtitle="SOFTWARE & TOOLS YANG DIGUNAKAN"
    >
      {/* Bento Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.code}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={`p-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)] transition-all ${
              category.code === "02" || category.code === "03" ? "lg:col-span-1" : ""
            }`}
          >
            {/* Category Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-5">
              <span className="font-mono-code text-xs font-bold text-[var(--accent)]">
                // {category.code}
              </span>
              <span className="font-mono-code text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                {category.skills.length} TOOLS
              </span>
            </div>

            <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] uppercase mb-4">
              {category.title}
            </h3>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="px-3 py-1.5 rounded-xl font-mono-code text-xs bg-[var(--surface-alt)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors cursor-default"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Infinite Marquee Ribbon Simulation */}
      <div className="relative overflow-hidden py-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]">
        <div className="flex gap-8 whitespace-nowrap animate-[marquee_25s_linear_infinite]">
          {[...allSkillsList, ...allSkillsList].map((tech, i) => (
            <div key={i} className="flex items-center gap-3 font-mono-code text-xs text-[var(--text-muted)] uppercase tracking-wider">
              <span>{tech}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-60"></span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
