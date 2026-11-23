import {
  Mail,
  Film,
  Sparkles,
  Palette,
  Sliders,
  Layers,
  Wrench,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "../components/Icons";

export const personalInfo = {
  name: "AHFADH AMIRUDIN",
  shortName: "AHFADH",
  role: "Video Editor / Motion Graphics",
  tagline: "Saya menciptakan karya visual yang dinamis melalui video editing, motion graphics, dan visual storytelling yang berkarakter.",
  bio: "Video Editor & Motion Graphics Artist dengan fokus pada pacing sinematik, animasi 2D/3D, kinetic typography, dan color grading yang presisi.",
  avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ahfadh&backgroundColor=3b82f6",
  status: "Tersedia untuk Bekerja",
  resumeUrl: "#",
  email: "ijonk333@gmail.com",
  location: "Jakarta, Indonesia",
  githubUsername: "izavyx",
};

export const socialLinks = [
  { name: "Instagram", url: "https://www.instagram.com/necessaryy._/", icon: InstagramIcon, handle: "@necessaryy._" },
  { name: "GitHub", url: "https://github.com/izavyx", icon: GithubIcon, handle: "@izavyx" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/ahfadh-amirudin-5b978b424/", icon: LinkedinIcon, handle: "in/ahfadh-amirudin" },
  { name: "Email", url: "mailto:ijonk333@gmail.com", icon: Mail, handle: "ijonk333@gmail.com" },
];

export const navItems = [
  { label: "PROYEK", href: "#projects" },
  { label: "PENGALAMAN", href: "#experience" },
  { label: "TENTANG", href: "#about" },
  { label: "TOOLS", href: "#stack" },
  { label: "KONTAK", href: "#contact" },
];

export interface Skill {
  name: string;
  level?: number;
}

export interface SkillCategory {
  title: string;
  code: string;
  icon: typeof Film;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Video Editing",
    code: "01",
    icon: Film,
    skills: [
      { name: "Adobe Premiere Pro" },
      { name: "DaVinci Resolve" },
      { name: "CapCut Pro" },
      { name: "Final Cut Pro" },
      { name: "Storytelling & Pacing" },
    ],
  },
  {
    title: "Motion Graphics & Animasi",
    code: "02",
    icon: Sparkles,
    skills: [
      { name: "Adobe After Effects" },
      { name: "Kinetic Typography" },
      { name: "Logo & Brand Motion" },
      { name: "2D/3D Keyframing" },
      { name: "Blender" },
    ],
  },
  {
    title: "Color Grading & VFX",
    code: "03",
    icon: Palette,
    skills: [
      { name: "Color Correction" },
      { name: "LUT & Look Design" },
      { name: "Rotoscoping & Masking" },
      { name: "Compositing" },
      { name: "Motion Tracking" },
    ],
  },
  {
    title: "Audio & Sound Design",
    code: "04",
    icon: Sliders,
    skills: [
      { name: "Adobe Audition" },
      { name: "Sound Effects (SFX)" },
      { name: "Beat Syncing" },
      { name: "Audio Mixing" },
    ],
  },
  {
    title: "Desain & Aset Visual",
    code: "05",
    icon: Layers,
    skills: [
      { name: "Adobe Photoshop" },
      { name: "Adobe Illustrator" },
      { name: "Figma" },
      { name: "Typography Layout" },
    ],
  },
  {
    title: "Workflow & Delivery",
    code: "06",
    icon: Wrench,
    skills: [
      { name: "Adobe Media Encoder" },
      { name: "Frame.io" },
      { name: "Reels / TikTok / Shorts" },
      { name: "YouTube & Commercial" },
    ],
  },
];

export interface Project {
  id: string;
  number: string;
  title: string;
  version?: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  instagramUrl: string;
  embedUrl: string;
  featured: boolean;
  details: {
    concept: string;
    execution: string;
    workflow: string;
    highlights: string[];
  };
}

export const projects: Project[] = [
  {
    id: "reel-da_gpvqzb89",
    number: "01",
    title: "Motion Graphics & Visual Edit #01",
    version: "9:16 REEL",
    category: "MOTION GRAPHICS / VIDEO EDIT",
    description:
      "Karya video editing & motion graphics dengan ritme transisi cepat, sinkronisasi audio yang presisi, serta komposisi grafis dinamis untuk format vertical reel.",
    image: "/thumbnails/reel-01.jpg",
    tags: ["After Effects", "Premiere Pro", "Motion Graphics", "Sound Sync"],
    instagramUrl: "https://www.instagram.com/reel/Da_gPVQzB89/?utm_source=ig_web_copy_link&bqrl=MzRlODBiNWFlZA==&avpt=MzRlODBiNWFlZA==",
    embedUrl: "https://www.instagram.com/reel/Da_gPVQzB89/embed/",
    featured: true,
    details: {
      concept:
        "Menyajikan visual storytelling berdurasi singkat dengan hook kuat di 3 detik pertama agar audiens langsung tertarik mengikuti alur video hingga akhir.",
      execution:
        "Mengombinasikan speed ramping, keyframe motion graphics yang mulus, serta penekanan visual pada ketukan musik utama.",
      workflow:
        "Assembly cut & beat-syncing di Adobe Premiere Pro, dilanjutkan dengan motion compositing di Adobe After Effects dan finishing color look.",
      highlights: [
        "Dynamic speed ramping & seamless transition cuts",
        "Custom kinetic typography & motion overlays",
        "Tight audio beat-syncing & punchy SFX layering",
      ],
    },
  },
  {
    id: "reel-dcdnxeptpjr",
    number: "02",
    title: "Motion Graphics & Visual Edit #02",
    version: "9:16 REEL",
    category: "VIDEO EDITING / STORYTELLING",
    description:
      "Eksplorasi visual storytelling dan motion design dengan perpaduan tipografi kinetik, masking presisi, serta atmosfer warna yang konsisten.",
    image: "/thumbnails/reel-02.jpg",
    tags: ["Premiere Pro", "After Effects", "Color Grading", "Kinetic Type"],
    instagramUrl: "https://www.instagram.com/reel/DcDNXEPTpjR/?utm_source=ig_web_copy_link&knvt=MzRlODBiNWFlZA==&avpt=MzRlODBiNWFlZA==",
    embedUrl: "https://www.instagram.com/reel/DcDNXEPTpjR/embed/",
    featured: true,
    details: {
      concept:
        "Membangun alur cerita visual yang padat dan ekspresif dalam rasio vertikal 9:16 tanpa mengurangi keterbacaan elemen grafis.",
      execution:
        "Menggunakan kurva animasi custom (graph editor), rotoscoping bersih, serta penyesuaian tone warna untuk memperkuat mood.",
      workflow:
        "Rough cut & pacing di Premiere Pro, animasi layer grafis di After Effects, serta color grading untuk konsistensi tiap adegan.",
      highlights: [
        "Smooth graph-editor easing & motion blur",
        "Layered sound design untuk transisi antar-scene",
        "Color-graded look yang konsisten untuk mobile display",
      ],
    },
  },
  {
    id: "reel-dya4nuxtfyu",
    number: "03",
    title: "Motion Graphics & Visual Edit #03",
    version: "9:16 REEL",
    category: "MOTION DESIGN / COMPOSITING",
    description:
      "Proyek motion graphics dengan penekanan pada compositing berlapis, animasi elemen UI/grafis, dan transisi antar-scene yang halus.",
    image: "/thumbnails/reel-03.jpg",
    tags: ["After Effects", "Compositing", "Motion Tracking", "VFX"],
    instagramUrl: "https://www.instagram.com/reel/DYa4NUXTfYU/?utm_source=ig_web_copy_link&dmpr=MzRlODBiNWFlZA==&avpt=MzRlODBiNWFlZA==",
    embedUrl: "https://www.instagram.com/reel/DYa4NUXTfYU/embed/",
    featured: true,
    details: {
      concept:
        "Menghadirkan detail visual bergerak yang terasa hidup dengan menyatukan elemen grafis 2D/3D ke dalam komposisi video.",
      execution:
        "Penerapan motion tracking, depth layering, dan glow/light blend agar elemen motion menyatu alami dengan footage.",
      workflow:
        "Pre-comp terstruktur di After Effects, tracking kamera/objek, compositing efek visual, dan final mastering H.264 high-bitrate.",
      highlights: [
        "Multi-layer motion compositing & depth separation",
        "Clean motion tracking & graphic integration",
        "High-contrast lighting & glow styling",
      ],
    },
  },
  {
    id: "reel-devhlm1gkvw",
    number: "04",
    title: "Motion Graphics & Visual Edit #04",
    version: "9:16 REEL",
    category: "COLOR GRADING / REEL EDIT",
    description:
      "Karya editing video dengan fokus pada rhythm cutting, look development sinematik, dan keseimbangan visual antara footage serta tipografi.",
    image: "/thumbnails/reel-04.jpg",
    tags: ["DaVinci Resolve", "Premiere Pro", "Color Grading", "SFX"],
    instagramUrl: "https://www.instagram.com/reel/DeVhlM1gkVw/?utm_source=ig_web_copy_link&lqvp=MzRlODBiNWFlZA==&avpt=MzRlODBiNWFlZA==",
    embedUrl: "https://www.instagram.com/reel/DeVhlM1gkVw/embed/",
    featured: false,
    details: {
      concept:
        "Memaksimalkan kekuatan atmosfer visual dan ketepatan timing cut sehingga setiap transisi terasa natural namun tetap enerjik.",
      execution:
        "Penyelarasan exposure & color balance antar-klip, penambahan elemen grafis minimalis, serta mixing audio yang jernih.",
      workflow:
        "Editing timeline & pacing di Premiere Pro, color management di DaVinci Resolve, dan final audio polish.",
      highlights: [
        "Precision rhythm cutting & pacing control",
        "Balanced filmic color tone & skin-tone protection",
        "Minimalist motion titles & crisp export profile",
      ],
    },
  },
  {
    id: "reel-dx-xeeptuil",
    number: "05",
    title: "Motion Graphics & Visual Edit #05",
    version: "9:16 REEL",
    category: "KINETIC TYPE / VISUAL EDIT",
    description:
      "Kombinasi tipografi kinetik, efek visual dinamis, dan editing berenergi tinggi yang dirancang khusus untuk engagement optimal di Instagram Reels.",
    image: "/thumbnails/reel-05.jpg",
    tags: ["After Effects", "Kinetic Type", "Premiere Pro", "Beat Sync"],
    instagramUrl: "https://www.instagram.com/reel/DX-xeEpTuIl/?utm_source=ig_web_copy_link&bqrl=MzRlODBiNWFlZA==&avpt=MzRlODBiNWFlZA==",
    embedUrl: "https://www.instagram.com/reel/DX-xeEpTuIl/embed/",
    featured: false,
    details: {
      concept:
        "Menciptakan visual reel dengan energi tinggi yang memadukan teks bergerak, transisi cepat, dan aksen visual yang berkesinambungan.",
      execution:
        "Sinkronisasi frame-by-frame dengan tempo musik, variasi skala tipografi, dan aksen tekstur film untuk karakter visual yang khas.",
      workflow:
        "Layout & animasi teks di After Effects, penyusunan pacing akhir serta sound effects di Premiere Pro.",
      highlights: [
        "Frame-accurate kinetic typography & rhythm sync",
        "Custom transition presets & motion blur polish",
        "Optimized vertical framing (9:16) for Instagram Reels",
      ],
    },
  },
];

export interface TimelineItem {
  id: string;
  type: "work" | "education";
  number: string;
  title: string;
  organization: string;
  location?: string;
  period: string;
  duration?: string;
  description: string;
  highlights?: string[];
  tags?: string[];
  icon: typeof Briefcase;
}

export const experienceTimeline: TimelineItem[] = [
  {
    id: "freelance-video-editor",
    type: "work",
    number: "01",
    title: "Freelance Video Editor & Motion Graphics",
    organization: "Independent · 30+ Commissions Completed",
    location: "Jakarta, Indonesia",
    period: "2023 – Sekarang",
    duration: "30+ Commissions",
    description:
      "Berpengalaman sebagai freelance video editor & motion graphics sejak 2023 dengan lebih dari 30 commission yang telah diselesaikan untuk berbagai kebutuhan konten digital, reels, dan visual storytelling.",
    highlights: [
      "Menyelesaikan 30+ commission video editing & motion graphics sejak 2023",
      "Memproduksi konten short-form dinamis untuk Instagram Reels, TikTok, & Shorts",
      "Mengerjakan kinetic typography, compositing, speed ramping, & audio beat-sync",
      "Mengelola color grading, revisi klien, dan delivery tepat waktu dengan kualitas tinggi",
    ],
    tags: ["After Effects", "Premiere Pro", "DaVinci Resolve", "Motion Graphics", "30+ Commissions"],
    icon: Briefcase,
  },
];

export const journeyTimeline = [
  {
    number: "01",
    title: "Mulai Freelance (2023)",
    description:
      "Memulai perjalanan profesional sebagai freelance video editor, membangun fondasi storytelling, pacing cutting, dan sinkronisasi audio.",
  },
  {
    number: "02",
    title: "Ekspansi Motion Graphics",
    description:
      "Mendalami Adobe After Effects, kinetic typography, compositing berlapis, serta look development untuk memperkuat karakter visual video.",
  },
  {
    number: "03",
    title: "30+ Commission Selesai",
    description:
      "Dipercaya menangani lebih dari 30 proyek commission video editing dan motion graphics bagi berbagai kreator dan klien dari Jakarta.",
  },
];

export const educationTimeline: TimelineItem[] = [
  {
    id: "univ",
    type: "education",
    number: "01",
    title: "S1 Informatika",
    organization: "Universitas Gunadarma",
    period: "2026 - Sekarang",
    description: "Fokus pada Software Engineering, Struktur Data & Algoritma, Arsitektur Web, dan Pemodelan Database.",
    icon: GraduationCap,
  },
  {
    id: "sma",
    type: "education",
    number: "02",
    title: "SMA Prestasi Prima (IPA)",
    organization: "Sekolah Menengah Atas Berbasis IT",
    period: "2023 – 2026",
    description:
      "Sekolah SMA berbasis IT dengan peminatan Ilmu Pengetahuan Alam (IPA) yang memadukan kurikulum sains dan penguasaan teknologi digital kreatif.",
    icon: GraduationCap,
  },
];

export const terminalCommands: Record<string, string> = {
  help: `Available commands:
  help        - Show this help message
  projects    - List all projects
  skills      - Show editing & motion tools
  experience  - Show work experience
  instagram   - Open Instagram profile
  github      - Open GitHub profile
  contact     - Show contact info
  whoami      - About me
  clear       - Clear terminal`,
  whoami: `Ahfadh Amirudin
Video Editor / Motion Graphics
Based in Jakarta, Indonesia
Instagram: @necessaryy._
Currently available for new opportunities.`,
  projects: `Featured Instagram Reels (@necessaryy._):
  1. Motion Graphics & Visual Edit #01 - After Effects, Premiere Pro
  2. Motion Graphics & Visual Edit #02 - Kinetic Type, Color Grading
  3. Motion Graphics & Visual Edit #03 - Compositing, Motion Tracking
  4. Motion Graphics & Visual Edit #04 - DaVinci Resolve, Rhythm Cut
  5. Motion Graphics & Visual Edit #05 - Kinetic Type, Beat Sync`,
  skills: `Tools & Expertise:
  Video Editing   : Adobe Premiere Pro, DaVinci Resolve, CapCut Pro
  Motion Graphics : Adobe After Effects, Blender, Kinetic Typography
  Color & VFX     : Color Correction, Compositing, Motion Tracking
  Audio & Design  : Adobe Audition, Photoshop, Illustrator, Figma`,
  experience: `Work Experience:
  Freelance Video Editor & Motion Graphics
  Independent (30+ Commissions Completed)
  2023 - Sekarang · Jakarta, Indonesia
  → Video Editing, Motion Graphics & Short-Form Reels
  → Adobe After Effects + Premiere Pro + DaVinci Resolve`,
  contact: `Contact Information:
  Instagram : instagram.com/necessaryy._
  Email     : ijonk333@gmail.com
  GitHub    : github.com/izavyx
  LinkedIn  : linkedin.com/in/ahfadh-amirudin-5b978b424
  Location  : Jakarta, Indonesia`,
  instagram: `Opening Instagram profile...
  → https://www.instagram.com/necessaryy._/`,
  github: `Opening GitHub profile...
  → https://github.com/izavyx`,
};

export const footerInfo = {
  copyright: `\u00a9 2026 Ahfadh Amirudin. Semua hak dilindungi undang-undang.`,
  builtWith: "Dibuat dengan React 18, Vite & Tailwind CSS",
  updated: "DIPERBARUI — 19 November 2026",
};
