import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, ArrowRight } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={16} />,
  linkedin: <Linkedin size={16} />,
  mail: <Mail size={16} />,
  twitter: <Twitter size={16} />,
};

const socialData = [
  { label: "GitHub", href: siteConfig.links.github, icon: "github" },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${siteConfig.links.email}`, icon: "mail" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Anshul<span className="text-accent">.</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Architect systems. Build products. Lead teams.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {socialData.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={social.label}
              >
                {iconMap[social.icon]}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link
              href="/now"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Currently building AI-powered mobile apps and scaling production infrastructure
              <ArrowRight size={12} />
            </Link>
            <p className="text-xs text-muted-foreground">
              &copy; {year} {siteConfig.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
