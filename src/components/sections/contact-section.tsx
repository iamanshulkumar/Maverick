"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";

export function ContactSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          label="Contact"
          title="Let's Work Together"
          description="Have a project in mind? Let's build something great."
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-lg text-center"
        >
          <p className="mb-8 text-muted-foreground">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
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
        </motion.div>
      </div>
    </section>
  );
}
