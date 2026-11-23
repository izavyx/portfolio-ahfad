import { useEffect, useState } from "react";
import { GitCommit, GitPullRequest, Flame, Users, ExternalLink, RefreshCw } from "lucide-react";
import { GithubIcon } from "./Icons";
import SectionWrapper from "./SectionWrapper";
import { personalInfo } from "../data/portfolio";

interface GitHubUserResponse {
  avatar_url?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
  name?: string;
}

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionsApiResponse {
  total?: Record<string, number>;
  contributions?: ContributionDay[];
}

interface ContributionSummary {
  total: number;
  weeks: Array<Array<ContributionDay | null>>;
  activeStreak: number;
  longestStreak: number;
}

function groupByWeeks(days: ContributionDay[]): Array<Array<ContributionDay | null>> {
  if (!days.length) return [];
  const weeks: Array<Array<ContributionDay | null>> = [];
  let currentWeek: Array<ContributionDay | null> = Array(7).fill(null);

  for (const day of days) {
    const dow = new Date(`${day.date}T00:00:00`).getDay();
    if (dow === 0 && currentWeek.some(Boolean)) {
      weeks.push(currentWeek);
      currentWeek = Array(7).fill(null);
    }
    currentWeek[dow] = day;
  }
  if (currentWeek.some(Boolean)) {
    weeks.push(currentWeek);
  }
  return weeks;
}

function computeStreaks(days: ContributionDay[]): { activeStreak: number; longestStreak: number } {
  let longest = 0;
  let run = 0;
  for (const day of days) {
    if (day.count > 0) {
      run += 1;
      if (run > longest) longest = run;
    } else {
      run = 0;
    }
  }

  let active = 0;
  let idx = days.length - 1;
  if (idx >= 0 && days[idx].count === 0) {
    idx -= 1;
  }
  while (idx >= 0 && days[idx].count > 0) {
    active += 1;
    idx -= 1;
  }

  return { activeStreak: active, longestStreak: longest };
}

function formatDateLabel(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function GitHubActivity() {
  const username = personalInfo.githubUsername;
  const [userData, setUserData] = useState<GitHubUserResponse | null>(null);
  const [contribData, setContribData] = useState<ContributionSummary | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [reloadTick, setReloadTick] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGitHubData() {
      try {
        const [userRes, contribRes] = await Promise.allSettled([
          fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github+json" },
          }),
          fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`, {
            signal: controller.signal,
          }),
        ]);

        if (controller.signal.aborted) return;

        let loadedAny = false;

        if (userRes.status === "fulfilled" && userRes.value.ok) {
          const json = (await userRes.value.json()) as GitHubUserResponse;
          setUserData(json);
          loadedAny = true;
        }

        if (contribRes.status === "fulfilled" && contribRes.value.ok) {
          const json = (await contribRes.value.json()) as ContributionsApiResponse;
          const days = Array.isArray(json.contributions) ? json.contributions : [];
          const totalFromMap =
            typeof json.total?.lastYear === "number"
              ? json.total.lastYear
              : days.reduce((sum, d) => sum + (d.count || 0), 0);
          const { activeStreak, longestStreak } = computeStreaks(days);

          setContribData({
            total: totalFromMap,
            weeks: groupByWeeks(days),
            activeStreak,
            longestStreak,
          });
          loadedAny = true;
        }

        setStatus(loadedAny ? "ready" : "error");
      } catch {
        if (!controller.signal.aborted) {
          setStatus("error");
        }
      }
    }

    loadGitHubData();
    return () => controller.abort();
  }, [username, reloadTick]);

  const handleRetry = () => {
    setStatus("loading");
    setReloadTick((t) => t + 1);
  };

  const stats = [
    {
      label: "KONTRIBUSI TAHUNAN",
      value: contribData ? contribData.total.toLocaleString("id-ID") : status === "loading" ? "..." : "—",
      sub: undefined,
      icon: GitCommit,
    },
    {
      label: "STREAK AKTIF",
      value: contribData ? `${contribData.activeStreak} Hari` : status === "loading" ? "..." : "—",
      sub:
        contribData && contribData.longestStreak > 0
          ? `Terpanjang: ${contribData.longestStreak} Hari`
          : undefined,
      icon: Flame,
    },
    {
      label: "REPOSITORI PUBLIK",
      value:
        userData?.public_repos !== undefined
          ? String(userData.public_repos)
          : status === "loading"
            ? "..."
            : "—",
      sub: undefined,
      icon: GitPullRequest,
    },
    {
      label: "PENGIKUT / IKUTI",
      value:
        userData?.followers !== undefined
          ? `${userData.followers} / ${userData.following ?? 0}`
          : status === "loading"
            ? "..."
            : "—",
      sub: undefined,
      icon: Users,
    },
  ];

  const getCellColor = (level: number) => {
    switch (level) {
      case 4:
        return "bg-blue-500";
      case 3:
        return "bg-blue-600/80";
      case 2:
        return "bg-blue-700/60";
      case 1:
        return "bg-blue-900/45 dark:bg-blue-900/50";
      default:
        return "bg-zinc-200 dark:bg-zinc-800/50";
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
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[var(--border)] bg-[var(--surface-alt)]">
              <img
                src={userData?.avatar_url || personalInfo.avatar}
                alt={`GitHub avatar @${username}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-base text-[var(--text-primary)]">
                  @{username}
                </span>
                <span className="px-2 py-0.5 rounded-full font-mono-code text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  LIVE SYNC
                </span>
              </div>
              <span className="font-mono-code text-xs text-[var(--text-muted)]">
                github.com/{username}
              </span>
            </div>
          </div>

          <a
            href={`https://github.com/${username}`}
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
              {st.sub && (
                <div className="font-mono-code text-[10px] text-[var(--text-muted)] mt-1">
                  {st.sub}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Heatmap Grid */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono-code text-xs text-[var(--text-muted)]">
            <span>PETA KONTRIBUSI (52 MINGGU TERAKHIR)</span>
            <div className="flex items-center gap-1 text-[10px]">
              <span>Kurang</span>
              <span className="w-2.5 h-2.5 rounded-xs bg-zinc-200 dark:bg-zinc-800/50 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-blue-900/45 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-blue-700/60 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-blue-600/80 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-xs bg-blue-500 inline-block"></span>
              <span>Banyak</span>
            </div>
          </div>

          {status === "loading" && !contribData ? (
            <div className="overflow-x-auto pb-2">
              <div className="inline-flex gap-1">
                {Array.from({ length: 52 }, (_, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }, (_, dIdx) => (
                      <div
                        key={dIdx}
                        className="w-3 h-3 rounded-xs bg-zinc-200/70 dark:bg-zinc-800/50 animate-pulse"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : contribData && contribData.weeks.length > 0 ? (
            <div className="overflow-x-auto pb-2">
              <div className="inline-flex gap-1">
                {contribData.weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1">
                    {week.map((day, dIdx) =>
                      day ? (
                        <div
                          key={day.date}
                          title={`${formatDateLabel(day.date)}: ${day.count} kontribusi`}
                          className={`w-3 h-3 rounded-xs ${getCellColor(day.level)} transition-transform hover:scale-125`}
                        />
                      ) : (
                        <div key={`empty-${wIdx}-${dIdx}`} className="w-3 h-3 rounded-xs opacity-0" />
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-muted)] flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono-code text-xs text-[var(--text-secondary)]">
                Gagal memuat peta kontribusi GitHub untuk @{username}. Periksa koneksi internet Anda.
              </p>
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] font-mono-code text-xs text-[var(--text-primary)] transition-colors"
              >
                <RefreshCw size={12} />
                <span>MUAT ULANG</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
