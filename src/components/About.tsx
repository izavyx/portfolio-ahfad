import { motion } from "framer-motion";
import { Code2, Layers } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { personalInfo } from "../data/portfolio";

export default function About() {
  const metadata = [
    { label: "PERAN", value: "Web Developer / Software Engineer" },
    { label: "LOKASI", value: personalInfo.location },
    { label: "STATUS", value: "Tersedia untuk Proyek & Kerja" },
  ];

  return (
    <SectionWrapper
      id="about"
      sectionNumber="02"
      title="TENTANG"
      subtitle="TENTANG SAYA"
    >
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Metadata & Narrative */}
        <div className="lg:col-span-7 space-y-8">
          {/* Metadata Cards Grid */}
          <div className="grid sm:grid-cols-3 gap-3">
            {metadata.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]"
              >
                <div className="font-mono-code text-[11px] text-[var(--accent)] font-semibold tracking-wider uppercase mb-1">
                  {item.label}
                </div>
                <div className="text-xs sm:text-sm font-medium text-[var(--text-primary)]">
                  {item.value}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Narrative paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            <p>
              Saya adalah seorang Web Developer & Software Engineer yang berfokus pada pembangunan solusi digital yang bersih, terstruktur, dan scalable. Ketertarikan saya terhadap dunia rekayasa perangkat lunak dimulai dari keinginan memahami bagaimana sistem besar diorkestrasi di balik layar.
            </p>
            <p>
              Dengan latar belakang pendidikan kejuruan Rekayasa Perangkat Lunak dan studi Informatika di Universitas Gunadarma, saya mengkombinasikan fondasi ilmu komputer teoritis dengan eksekusi kode praktis berstandar industri.
            </p>
            <p>
              Prinsip kerja saya berakar pada kode yang mudah dipelihara (maintainable), performa optimal (Lighthouse 95+), serta antarmuka intuitif yang memberikan kenyamanan maksimal bagi pengguna akhir.
            </p>
          </div>
        </div>

        {/* Right Column: Focus Areas */}
        <div className="lg:col-span-5 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)] transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-[var(--accent-muted)] text-[var(--accent)]">
                <Code2 size={20} />
              </div>
              <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">
                Rekayasa Frontend
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              Membangun Single Page & Server-Side Rendered Applications dengan React, Next.js, TypeScript, dan Tailwind CSS dengan penekanan pada micro-interactions, state management efisien, dan rendering performance.
            </p>
            <div className="flex flex-wrap gap-1.5 font-mono-code text-[11px]">
              {["React", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion"].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-md bg-[var(--surface-alt)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)] transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                <Layers size={20} />
              </div>
              <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">
                Arsitektur Full-Stack & API
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              Merancang REST API terstruktur, schema database relasional yang aman, autentikasi berbasis JWT/OAuth, dan integrasi asynchronous background workers untuk proses komputasi berat.
            </p>
            <div className="flex flex-wrap gap-1.5 font-mono-code text-[11px]">
              {["Node.js", "Express", "Prisma ORM", "PostgreSQL", "Redis", "Zod"].map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-md bg-[var(--surface-alt)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
