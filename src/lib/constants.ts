import type { NavLink, SocialLink } from "@/types";

export const siteConfig = {
  name: "Anshul Kumar Meena",
  title: "Engineer · Product Builder · Technical Leader",
  description:
    "I architect systems, build products, and lead teams. Senior Full Stack Engineer with 4+ years delivering production software across fintech, real estate, and AI.",
  url: "https://anshulmeena.dev",
  ogImage: "/images/og/default.jpg",
  links: {
    github: "https://github.com/anshulmeena",
    linkedin: "https://linkedin.com/in/anshulmeena",
    email: "anshul@example.com",
    resume: "/resume/anshul-meena-resume.pdf",
  },
};

export const navLinks: NavLink[] = [
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/anshulmeena", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/anshulmeena", icon: "linkedin" },
  { label: "Email", href: "mailto:anshul@example.com", icon: "mail" },
  { label: "Twitter", href: "https://twitter.com/anshulmeena", icon: "twitter" },
];
