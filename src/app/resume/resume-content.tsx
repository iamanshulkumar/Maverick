"use client";

import { motion } from "framer-motion";
import { Download, ExternalLink, Briefcase, GraduationCap, Award, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";
import { getExperience } from "@/lib/data";
import { siteConfig } from "@/lib/constants";

const certificates = [
  { name: "TryHackMe - Advent of Cyber 3", file: "/images/Certificates/Advent%20of%20cyber%203.png", type: "image" },
  { name: "TryHackMe - Advent of Cyber 4", file: "/images/Certificates/Advent%20of%20cyber%204.png", type: "image" },
  { name: "Ethical Hacking Essentials (EHE) - CodeRed", file: "/images/Certificates/EHE%20-%20CodeRed.webp", type: "image" },
  { name: "TryHackMe Certificate", file: "/images/Certificates/THM-IDUEV9BMGA.webp", type: "image" },
  { name: "Rise Certificate", file: "/images/Certificates/Anshul%20Kumar%20Meena-Rise-certificate_page-0001.webp", type: "image" },
  { name: "Burp Suite", file: "/images/Certificates/Burp%20Suite_pages-to-jpg-0001.webp", type: "image" },
  { name: "Cybrary Orientation", file: "/images/Certificates/cybrary-cert-cybrary-orientation_page-0001.webp", type: "image" },
  { name: "Cybrary - Introduction to IT and Cybersecurity", file: "/images/Certificates/cybrary-cert-introduction-to-it-and-cybersecurity_page-0001.webp", type: "image" },
  { name: "Pen Testing - Certificate of Achievement", file: "/images/Certificates/Pen%20Testing_Certificate%20of%20Achievement_page-0001.webp", type: "image" },
];

export function ResumeContent() {
  const experience = getExperience();

  return (
    <>
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-bold tracking-tight">Resume</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Download my resume or view my experience below.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <a href={siteConfig.links.resume} download>
                <Button size="lg">
                  <Download size={16} className="mr-2" /> Download PDF
                </Button>
              </a>
              <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  <ExternalLink size={16} className="mr-2" /> LinkedIn
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatedSection>
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-8 text-2xl font-semibold flex items-center gap-2">
            <Briefcase size={20} className="text-accent" /> Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div
                key={`${exp.company}-${exp.role}`}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-semibold">{exp.role}</h3>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                  </div>
                  <span className="text-xs text-accent">{exp.duration}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {exp.responsibilities.map((r, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 border-t border-border pt-3">
                  <span className="text-xs font-medium text-accent">Achievements</span>
                  <ul className="mt-2 space-y-1">
                    {exp.achievements.map((a, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-8 text-2xl font-semibold flex items-center gap-2">
            <GraduationCap size={20} className="text-accent" /> Education
          </h2>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold">Bachelor of Computer Applications</h3>
            <p className="text-sm text-muted-foreground">University of Rajasthan</p>
            <p className="text-xs text-accent mt-1">Graduated</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-8 text-2xl font-semibold flex items-center gap-2">
            <Award size={20} className="text-accent" /> Certifications
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {certificates.map((cert) => (
              <a
                key={cert.file}
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-accent/30 hover:shadow-glow"
              >
                {cert.type === "image" ? (
                  <div className="mb-3 overflow-hidden rounded-lg border border-border/50">
                    <img
                      src={cert.file}
                      alt={cert.name}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="mb-3 flex aspect-[16/10] w-full items-center justify-center rounded-lg border border-border/50 bg-gradient-to-br from-accent/5 to-accent-cyan/5">
                    <FileText size={28} className="text-muted-foreground/60" />
                  </div>
                )}
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">{cert.name}</p>
                  <ExternalLink size={14} className="shrink-0 text-muted-foreground/60 transition-colors group-hover:text-accent" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
