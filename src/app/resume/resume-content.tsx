"use client";

import { motion } from "framer-motion";
import { Download, ExternalLink, Briefcase, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";
import { getExperience } from "@/lib/data";
import { siteConfig } from "@/lib/constants";

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
            {experience.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${exp.role}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
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
              </motion.div>
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
            {[
              "TryHackMe - Top 1%",
              "OpenAI API Developer",
              "Meta React Native Certificate",
              "AWS Cloud Practitioner",
            ].map((cert, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-medium">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
