import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  sectionNumber?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({
  id,
  sectionNumber,
  title,
  subtitle,
  children,
  className = "",
}: SectionWrapperProps) {
  return (
    <section id={id} className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-subtle)] ${className}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-3 font-mono-code text-xs sm:text-sm tracking-widest text-[var(--accent)] font-semibold uppercase mb-2">
            {sectionNumber && <span>{sectionNumber} /</span>}
            <span>{title}</span>
            <span className="h-px w-10 bg-[var(--accent)] opacity-40"></span>
          </div>

          {subtitle && (
            <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] uppercase">
              {subtitle} <span className="text-[var(--accent)]">.</span>
            </h2>
          )}
        </motion.div>

        {children}
      </div>
    </section>
  );
}
