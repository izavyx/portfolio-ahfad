import { motion } from "framer-motion";
import { Film, Sparkles } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { personalInfo } from "../data/portfolio";

export default function About() {
  const metadata = [
    { label: "PERAN", value: personalInfo.role },
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
              Saya adalah seorang Video Editor & Motion Graphics Artist yang berfokus pada penyusunan cerita visual yang kuat, ritme editing yang presisi, serta animasi grafis yang ekspresif untuk berbagai format konten digital.
            </p>
            <p>
              Mulai dari konten short-form dinamis (Reels, TikTok, Shorts), video komersial, hingga explainer motion graphics, saya menggabungkan teknik storytelling, tipografi kinetik, serta sound design untuk menjaga keterlibatan audiens dari detik pertama.
            </p>
            <p>
              Prinsip kerja saya berfokus pada detail visual yang rapi, transisi yang mulus, color grading yang konsisten, serta alur produksi yang tepat waktu sesuai kebutuhan brand dan kreator.
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
                <Film size={20} />
              </div>
              <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">
                Video Editing & Storytelling
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              Mengolah footage mentah menjadi narasi visual yang mengalir dan emosional dengan pacing terukur, color grading sinematik, serta sinkronisasi audio dan sound effects yang tajam.
            </p>
            <div className="flex flex-wrap gap-1.5 font-mono-code text-[11px]">
              {["Premiere Pro", "DaVinci Resolve", "CapCut Pro", "Color Grading", "Sound Sync"].map((t) => (
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
                <Sparkles size={20} />
              </div>
              <h3 className="font-heading text-lg font-bold text-[var(--text-primary)]">
                Motion Graphics & Visual FX
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              Merancang animasi 2D/3D, kinetic typography, animasi logo, UI/HUD motion, dan compositing visual untuk memperkuat identitas visual dan daya tarik video.
            </p>
            <div className="flex flex-wrap gap-1.5 font-mono-code text-[11px]">
              {["After Effects", "Kinetic Type", "Blender", "Compositing", "Illustrator"].map((t) => (
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
