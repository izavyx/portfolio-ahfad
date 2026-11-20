import { GitCommit, GitPullRequest, Flame, Users, ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";
import SectionWrapper from "./SectionWrapper";
import { personalInfo } from "../data/portfolio";

export default function GitHubActivity() {
  const stats = [
    { label: "KONTRIBUSI TAHUNAN", value: "987", icon: GitCommit },
    { label: "STREAK AKTIF", value: "2 Hari", icon: Flame },
    { label: "REPOSITORI PUBLIK", value: "22", icon: GitPullRequest },
    { label: "PENGIKUT", value: "22 / 23", icon: Users },
  ];

  // Generate simulated 52 weeks x 7 days heatmap grid
  const weeks = 40;
  const days = 7;
  const heatmapData = Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: days }, (_, d) => {
      // Deterministic pseudo-random commit level (0 to 4)
      const val = (w * 7 + d * 13) % 11;
      if (val > 8) return 4;
      if (val > 6) return 3;
      if (val > 4) return 2;
      if (val > 2) return 1;
      return 0;
    })
  );

  const getCellColor = (level: number) => {
    switch (level) {
      case 4: return "bg-blue-500";
      case 3: return "bg-blue-600/80";
      case 2: return "bg-blue-700/60";
      case 1: return "bg-blue-900/40";
      default: return "bg-zinc-800/40";
    }
  };

  return (
    <SectionWrapper
      id="github"
      sectionNumber="06"
      title="AKTIVITAS GITHUB"
      subtitle="KODE TERBUKA & REPOSITORI"
    >
      <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
        {/* Profile Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)] mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[var(--border)]">
              <img
                src={personalInfo.avatar}
                alt="GitHub avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-base text-[var(--text-primary)]">
                  @{personalInfo.githubUsername}
                </span>
                <span className="px-2 py-0.5 rounded-full font-mono-code text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  TERVERIFIKASI
                </span>
              </div>
              <span className="font-mono-code text-xs text-[var(--text-muted)]">
                github.com/{personalInfo.githubUsername}
              </span>
            </div>
          </div>

          <a
            href={`https://github.com/${personalInfo.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--border)] hover:border-[var(--border-hover)] bg-[var(--surface-alt)] font-mono-code text-xs text-[var(--text-primary)] transition-colors"
          >
            <GithubIcon width={14} height={14} />
            <span>PROFIL GITHUB</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {stats.map((st) => (
            <div
              key={st.label}
              className="p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-muted)]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-code text-[10px] text-[var(--text-muted)] tracking-wider uppercase">
                  {st.label}
                </span>
                <st.icon size={14} className="text-[var(--accent)]" />
              </div>
              <div className="font-heading text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                {st.value}
              </div>
            </div>
          ))}
        </div>

        {/* Heatmap Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono-code text-xs text-[var(--text-muted)]">
            <span>PETA KONTRIBUSI (52 MINGGU TERAKHIR)</span>
            <div className="flex items-center gap-1 text-[10px]">
              <span>Kurang</span>
              <span className="w-2.5 h-2.5 rounded-xs bg-zinc-800/40 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-blue-900/40 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-blue-700/60 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-blue-600/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-blue-500 inline-block"></span>
              <span>Banyak</span>
            </div>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="inline-flex gap-1">
              {heatmapData.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((level, dIdx) => (
                    <div
                      key={dIdx}
                      title={`Week ${wIdx + 1}, Day ${dIdx + 1}: Level ${level}`}
                      className={`w-3 h-3 rounded-xs ${getCellColor(level)} transition-transform hover:scale-125`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
