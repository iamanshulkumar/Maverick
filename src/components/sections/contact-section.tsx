"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";

export function ContactSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-accent">
              Contact
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Let&apos;s work together.
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Have a project in mind? Let&apos;s build something great.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact">
                <Button size="lg">
                  <Mail size={16} className="mr-2" /> Get in Touch
                </Button>
              </Link>
              <a href={siteConfig.links.resume} download>
                <Button variant="outline" size="lg">
                  Download Resume <ArrowRight size={16} className="ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
