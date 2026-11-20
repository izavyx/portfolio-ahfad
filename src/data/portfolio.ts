import {
  Mail,
  Code2,
  Database,
  Cloud,
  Wrench,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "../components/Icons";

export const personalInfo = {
  name: "AHFAD AMIRUDIN",
  shortName: "AHFAD",
  role: "Web Developer / Software Engineer",
  tagline: "Saya mengembangkan aplikasi web yang responsif, terstruktur, dan berkinerja tinggi dari antarmuka hingga backend.",
  bio: "Passionate developer dengan keahlian dalam membangun aplikasi web modern. Saya fokus pada pengembangan React, TypeScript, dan arsitektur cloud-native yang scalable.",
  avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ahfad&backgroundColor=3b82f6",
  status: "Tersedia untuk Bekerja",
  resumeUrl: "#",
  email: "ighifarii05@gmail.com",
  location: "Bogor / Jakarta, Indonesia",
  githubUsername: "IGhifari",
};

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/IGhifari", icon: GithubIcon, handle: "@IGhifari" },
  { name: "LinkedIn", url: "https://linkedin.com/in/ighifari", icon: LinkedinIcon, handle: "in/ighifari" },
  { name: "Instagram", url: "https://instagram.com/ghfrriii", icon: InstagramIcon, handle: "@ghfrriii" },
  { name: "Email", url: "mailto:ighifarii05@gmail.com", icon: Mail, handle: "ighifarii05@gmail.com" },
];

export const navItems = [
  { label: "PROYEK", href: "#projects" },
  { label: "PENGALAMAN", href: "#experience" },
  { label: "TENTANG", href: "#about" },
  { label: "TEKNOLOGI", href: "#stack" },
  { label: "KONTAK", href: "#contact" },
];

export interface Skill {
  name: string;
  level?: number;
}

export interface SkillCategory {
  title: string;
  code: string;
  icon: typeof Code2;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Bahasa Pemrograman",
    code: "01",
    icon: Code2,
    skills: [
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "PHP" },
      { name: "Python" },
      { name: "HTML5 & CSS3" },
    ],
  },
  {
    title: "Pengembangan Frontend",
    code: "02",
    icon: Code2,
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Vite" },
      { name: "Framer Motion" },
    ],
  },
  {
    title: "Pengembangan Backend",
    code: "03",
    icon: Database,
    skills: [
      { name: "Node.js" },
      { name: "Express" },
      { name: "Laravel" },
      { name: "Zod" },
      { name: "REST API" },
    ],
  },
  {
    title: "Basis Data & ORM",
    code: "04",
    icon: Database,
    skills: [
      { name: "PostgreSQL" },
      { name: "Prisma ORM" },
      { name: "MySQL" },
      { name: "Supabase" },
      { name: "Redis" },
    ],
  },
  {
    title: "Integrasi AI & LLM",
    code: "05",
    icon: Cloud,
    skills: [
      { name: "Gemini API" },
      { name: "Prompt Grounding" },
      { name: "BullMQ Job Queues" },
    ],
  },
  {
    title: "DevOps & Deployment",
    code: "06",
    icon: Cloud,
    skills: [
      { name: "Vercel" },
      { name: "Cloudflare Pages" },
      { name: "GitHub Actions" },
      { name: "Docker" },
      { name: "npm" },
    ],
  },
  {
    title: "Developer Tools",
    code: "07",
    icon: Wrench,
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Postman" },
      { name: "Bruno" },
      { name: "TablePlus" },
      { name: "Vitest" },
      { name: "VS Code" },
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
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "internship-journal",
    number: "05",
    title: "Internship Journal Siswa",
    version: "v1.0",
    category: "MANAJEMEN / APLIKASI WEB",
    description: "Sistem manajemen jurnal magang untuk siswa dengan fitur tracking kegiatan harian, laporan, dan evaluasi mentor.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    tags: ["React", "Laravel", "MySQL", "Tailwind CSS"],
    githubUrl: "https://github.com",
    caseStudyUrl: "#",
    featured: true,
  },
  {
    id: "studyflow",
    number: "06",
    title: "StudyFlow",
    version: "v1.0",
    category: "EDUTECH / FULL-STACK & AI",
    description: "Platform pembelajaran full-stack dengan integrasi AI untuk personalisasi pengalaman belajar dan tracking progress.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    tags: ["Next.js 15", "TypeScript", "Express.js", "Prisma", "PostgreSQL", "Redis", "BullMQ", "Gemini AI", "Zod"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "class-website",
    number: "03",
    title: "Class 1IA08 Website",
    category: "WEB / PORTAL",
    description: "Portal website kelas dengan fitur informasi, galeri, dan integrasi database real-time.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    tags: ["React", "Vite", "Tailwind", "Supabase", "Framer Motion"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "ecovoyage",
    number: "04",
    title: "Game EcoVoyage - Pulau Harapan",
    category: "GAME / EDUKASI",
    description: "Game edukasi berbasis web tentang pelestarian lingkungan dengan gameplay interaktif.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop",
    tags: ["HTML5", "JavaScript", "CSS3"],
    liveUrl: "https://example.com",
    featured: false,
  },
  {
    id: "a-day-at-home",
    number: "02",
    title: "A Day At Home",
    category: "GAME / EDUKASI KHUSUS",
    description: "Game edukasi untuk anak-anak tunarungu dengan pendekatan visual interaktif dan bahasa isyarat.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
    tags: ["React", "Tailwind CSS"],
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    id: "portfolio-website",
    number: "01",
    title: "Portfolio Website",
    category: "WEB / PERSONAL",
    description: "Website portfolio modern dengan desain editorial gelap, animasi halus, dan pengalaman pengguna yang interaktif.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
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
    id: "internship",
    type: "work",
    number: "01",
    title: "Frontend Developer Intern",
    organization: "PT. AMA Salam Indonesia (Ama Salam Foundation)",
    location: "Bogor, Jawa Barat, Indonesia",
    period: "Oktober 2025 – Februari 2026",
    duration: "5 Bulan",
    description: "Mengembangkan sistem manajemen proyek dan antarmuka web responsif.",
    highlights: [
      "Membangun Project Management System dari nol",
      "Mengembangkan UI modular dengan React & Tailwind CSS",
      "Optimasi performa web menggunakan Lighthouse / Web Vitals",
      "Integrasi workflow kanban untuk manajemen tugas tim",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Lighthouse / Web Vitals"],
    icon: Briefcase,
  },
];

export const journeyTimeline = [
  {
    number: "01",
    title: "Fondasi Awal",
    description: "Pendidikan kejuruan rekayasa perangkat lunak di SMKN 1 Cibinong. Mempelajari dasar-dasar HTML, CSS, JavaScript, PHP, dan Git.",
  },
  {
    number: "02",
    title: "Transisi Full-Stack",
    description: "Membangun single page application dengan React, Tailwind, Express, Prisma, dan JWT authentication.",
  },
  {
    number: "03",
    title: "Pengembangan Sistem & Produk",
    description: "Mengembangkan sistem produksi: platform AksesKita, PMS di PT. AMA Salam, dan solusi e-commerce.",
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
    id: "smk",
    type: "education",
    number: "02",
    title: "Rekayasa Perangkat Lunak (RPL)",
    organization: "SMKN 1 Cibinong",
    period: "2023 – 2026",
    description: "Pendidikan kejuruan dalam pengembangan perangkat lunak, membangun fondasi kuat dalam pemrograman dan pengembangan web.",
    icon: GraduationCap,
  },
];

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  period: string;
  skills?: string[];
}

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    title: "Frontend Developer Internship",
    issuer: "PT. AMA Salam Indonesia",
    period: "Okt 2025 – Feb 2026",
    skills: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "cert-2",
    title: "National Game Creation Competition",
    issuer: "Clevio",
    period: "Jan – Feb 2025",
    skills: ["Game Development", "HTML5", "JavaScript"],
  },
  {
    id: "cert-3",
    title: "Basic Data Science Training",
    issuer: "Digitalent Kominfo",
    period: "2024",
    skills: ["Python", "Data Analysis"],
  },
  {
    id: "cert-4",
    title: "Basic Web Development Training",
    issuer: "Islamic Development Network",
    period: "2023",
    skills: ["HTML", "CSS", "JavaScript"],
  },
];

export const terminalCommands: Record<string, string> = {
  help: `Available commands:
  help        - Show this help message
  projects    - List all projects
  skills      - Show tech stack
  experience  - Show work experience
  github      - Open GitHub profile
  contact     - Show contact info
  whoami      - About me
  clear       - Clear terminal`,
  whoami: `Ahfad Amirudin
Web Developer / Software Engineer
Based in Bogor / Jakarta, Indonesia
Currently available for new opportunities.`,
  projects: `Featured Projects:
  1. Internship Journal Siswa - React, Laravel, MySQL
  2. StudyFlow - Next.js 15, Prisma, Gemini AI
  3. Class 1IA08 Website - React, Supabase
  4. EcoVoyage - HTML5 Game
  5. A Day At Home - Educational Game
  6. Portfolio Website - React, Framer Motion`,
  skills: `Tech Stack:
  Frontend  : React, Next.js, TypeScript, Tailwind CSS
  Backend   : Node.js, Express, Laravel, Prisma
  Database  : PostgreSQL, MySQL, Supabase, Redis
  DevOps    : Vercel, Docker, GitHub Actions
  Tools     : Git, VS Code, Postman, Figma`,
  experience: `Work Experience:
  Frontend Developer Intern
  PT. AMA Salam Indonesia
  Oktober 2025 - Februari 2026 (5 Months)
  → Built Project Management System
  → React + TypeScript + Tailwind CSS`,
  contact: `Contact Information:
  Email    : ighifarii05@gmail.com
  GitHub   : github.com/IGhifari
  LinkedIn : linkedin.com/in/ighifari
  Location : Bogor / Jakarta, Indonesia`,
  github: `Opening GitHub profile...
  → https://github.com/IGhifari`,
};

export const footerInfo = {
  copyright: `\u00a9 2026 Ahfad Amirudin. Semua hak dilindungi undang-undang.`,
  builtWith: "Dibuat dengan React 18, Vite & Tailwind CSS",
  updated: "DIPERBARUI — 19 November 2026",
};
