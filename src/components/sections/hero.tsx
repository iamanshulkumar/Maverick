"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative flex min-h-[100vh] items-center px-4 pt-16 md:pt-2 lg:pt-2">
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="flex flex-col-reverse items-center gap-10 md:flex-row md:items-center md:justify-between">
          {/* Left: Text content */}
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="mb-6 inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent">
                Senior Full Stack Engineer &middot; React Native &middot; Node.js
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-5xl lg:text-6xl"
            >
              I build production
              <br />
              software.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg md:mx-0"
            >
              Senior Full Stack Engineer with 4+ years building production iOS, Android,
              and web applications. Experience across fintech, real estate, and AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start"
            >
              <Link href="/projects">
                <Button size="lg">
                  View Case Studies <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <a href={siteConfig.links.resume} download>
                <Button variant="outline" size="lg">
                  Download Resume <Download size={16} className="ml-2" />
                </Button>
              </a>
              <div className="flex items-center gap-2">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border p-2.5 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-border p-2.5 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right: Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0"
          >
            <div className="relative">
              <img
                src="/images/anshul.jpeg"
                alt="Anshul Kumar Meena"
                className="relative h-52 w-52 rounded-full object-cover ring-2 ring-border ring-offset-4 ring-offset-background sm:h-64 sm:w-64 lg:h-72 lg:w-72"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
