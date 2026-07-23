import type { NavLink, SocialLink } from "@/types";

export const siteConfig = {
  name: "Anshul Kumar Meena",
  title: "Senior Full Stack Engineer · React Native · Node.js",
  description:
    "Senior Full Stack Engineer specializing in React Native, React, Node.js, and real-time systems. Builds production-grade mobile apps, web platforms, and backend services.",
  url: "https://anshulmeena.dev",
  ogImage: "/images/og/default.jpg",
  links: {
    github: "https://github.com/iamanshulkumar",
    linkedin: "https://linkedin.com/in/itisanshulkumar",
    email: "anshulkm17@gmail.com",
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
  { label: "GitHub", href: "https://github.com/iamanshulkumar", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/itisanshulkumar", icon: "linkedin" },
  { label: "Email", href: "mailto:anshulkm17@gmail.com", icon: "mail" },
  { label: "Twitter", href: "https://twitter.com/anshulmeena", icon: "twitter" },
];
