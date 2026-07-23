"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/shared/section-title";
import { AnimatedSection } from "@/components/shared/animated-section";
import { getTimeline } from "@/lib/data";
import { ArrowDown } from "lucide-react";

export function AboutContent() {
  const timeline = getTimeline();

  return (
    <>
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              label="About"
              title="Engineer. Leader. Builder."
              description="My journey from writing my first line of code to leading engineering teams."
            />
          </motion.div>
        </div>
      </section>

      <AnimatedSection className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-xl border border-border bg-card p-8">
            <h2 className="text-2xl font-semibold">My Philosophy</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                I believe software is a tool for solving real human problems. Every line of code
                I write is in service of making something work better, faster, or more
                intuitively for the people using it.
              </p>
              <p>
                My career has been a rapid progression from writing basic websites to architecting
                full-stack mobile applications spanning fintech, fantasy sports, real estate,
                and automotive. Along the way,
                I&apos;ve learned that the best engineering decisions are made with empathy — for
                users, for teammates, and for future maintainers.
              </p>
              <p>
                Today, as a Senior Full Stack Engineer, I focus on creating environments where great
                engineering can happen. I still write code every day because I believe leaders
                who build earn the trust of their teams.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-12 text-center text-2xl font-semibold">The Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-accent via-accent-cyan to-transparent hidden md:block" />
            <div className="space-y-12">
              {timeline.map((event, i) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className={`relative flex flex-col items-center md:flex-row ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="hidden md:block md:w-1/2" />
                  <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent bg-background">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </div>
                  <div className="mt-4 text-center md:mt-0 md:w-1/2 md:text-left md:px-8">
                    <span className="text-xs font-medium text-accent">{event.year}</span>
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-xl border border-border bg-gradient-to-br from-accent/5 to-accent-cyan/5 p-8 text-center">
            <h2 className="text-2xl font-semibold">Currently</h2>
            <p className="mt-4 text-muted-foreground">
              Leading a 5-member engineering team at Yuvmedia while building AI-powered
              mobile applications. Always exploring the intersection of AI and product
              development.
            </p>
            <div className="mt-6">
              <span className="inline-flex animate-bounce rounded-full bg-accent/10 p-2">
                <ArrowDown size={16} className="text-accent" />
              </span>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
