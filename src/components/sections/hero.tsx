"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4 pt-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-accent-cyan/5 blur-[100px]" />
        <div
          className="absolute inset-0 animate-gradient opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(6,182,212,0.08) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mb-6 inline-block rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent-light">
            Senior Full Stack Engineer &middot; React Native &middot; Node.js
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          I build production software.
          <br />
          Mobile apps. Web platforms.
          <br />
          <span className="bg-gradient-to-r from-accent to-accent-cyan bg-clip-text text-transparent">
            Real-time systems.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          Senior Full Stack Engineer with 4+ years building production iOS, Android,
          and web applications. Experience across fintech, real estate, and AI.
          Specializes in React Native, React, Node.js, and real-time systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-xs text-muted-foreground"
        >
          Senior Full Stack Engineer · Currently at Yuvmedia
        </motion.p>
      </div>
    </section>
  );
}
