import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2, Copy, Check, ArrowUpRight } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { personalInfo, socialLinks } from "../data/portfolio";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3500);
  };

  return (
    <SectionWrapper
      id="contact"
      sectionNumber="09"
      title="KONTAK"
      subtitle="MARI MEMBANGUN SESUATU YANG BERMANFAAT"
    >
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
            <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-2">
              Kirim Pesan
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6">
              Punya tawaran proyek, peluang magang/kerja, atau sekadar ingin berdiskusi? Silakan isi formulir di bawah.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-1">
                  Pesan Berhasil Terkirim!
                </h4>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-sm">
                  Terima kasih telah menghubungi saya. Saya akan merespons pesan Anda secepatnya melalui email.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono-code text-xs text-[var(--text-secondary)] mb-1.5 uppercase">
                      Nama Anda *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono-code text-xs text-[var(--text-secondary)] mb-1.5 uppercase">
                      Email Anda *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono-code text-xs text-[var(--text-secondary)] mb-1.5 uppercase">
                    Subjek (Opsional)
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Diskusi Proyek Web / Kolaborasi"
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono-code text-xs text-[var(--text-secondary)] mb-1.5 uppercase">
                    Pesan *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Jelaskan kebutuhan proyek atau detail pesan Anda..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-alt)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] font-mono-code text-xs font-semibold tracking-wider uppercase hover:opacity-95 transition-opacity"
                >
                  <span>KIRIM PESAN</span>
                  <Send size={13} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Direct Channels */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email One-click Copy Card */}
          <div className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
            <div className="font-mono-code text-xs text-[var(--accent)] font-semibold uppercase mb-2">
              // EMAIL LANGSUNG
            </div>
            <div className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-alt)] mb-3">
              <div className="flex items-center gap-2 overflow-hidden">
                <Mail size={16} className="text-[var(--accent)] flex-shrink-0" />
                <span className="font-mono-code text-xs text-[var(--text-primary)] truncate">
                  {personalInfo.email}
                </span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                title="Salin Email"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Biasanya merespons dalam kurun waktu kurang dari 24 jam kerja.
            </p>
          </div>

          {/* Location & Timezone Card */}
          <div className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
            <div className="font-mono-code text-xs text-[var(--accent)] font-semibold uppercase mb-2">
              // LOKASI & ZONA WAKTU
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--text-primary)]">
              <MapPin size={18} className="text-[var(--accent)]" />
              <span>Bogor, Jawa Barat, Indonesia · UTC+7 (WIB)</span>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
            <div className="font-mono-code text-xs text-[var(--accent)] font-semibold uppercase mb-4">
              // JARINGAN PROFESIONAL
            </div>
            <div className="space-y-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-alt)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)] transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <s.icon size={16} className="text-[var(--accent)]" />
                    <span className="font-mono-code text-xs font-medium text-[var(--text-primary)]">
                      {s.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-mono-code text-xs text-[var(--text-muted)]">
                    <span>{s.handle}</span>
                    <ArrowUpRight size={13} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
