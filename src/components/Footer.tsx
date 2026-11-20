import { ArrowUp } from "lucide-react";
import { personalInfo, socialLinks, footerInfo } from "../data/portfolio";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-[var(--border)] bg-[var(--surface-muted)]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Row: Brand & Back to Top */}
        <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-[var(--border-subtle)]">
          <div>
            <div className="flex items-center gap-2 font-heading text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-1">
              <span>{personalInfo.shortName}</span>
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
            </div>
            <p className="font-mono-code text-xs text-[var(--text-muted)]">
              {personalInfo.role}
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] hover:border-[var(--border-hover)] bg-[var(--surface)] text-[var(--text-primary)] font-mono-code text-xs transition-colors"
          >
            <span>KEMBALI KE ATAS</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Middle Row: Links & Social */}
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2 font-mono-code text-xs">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-colors"
              >
                {s.name}
              </a>
            ))}
          </div>

          <div className="font-mono-code text-xs text-[var(--text-muted)]">
            {footerInfo.builtWith}
          </div>
        </div>

        {/* Bottom Row: Copyright & Last Update */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4 font-mono-code text-xs text-[var(--text-muted)]">
          <div>{footerInfo.copyright}</div>
          <div>{footerInfo.updated}</div>
        </div>
      </div>
    </footer>
  );
}
