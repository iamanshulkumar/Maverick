"use client";

import { Code, Smartphone, Brain, Lightbulb, Users, Shield, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ScrollStagger } from "@/components/shared/scroll-stagger";

const differentiators = [
  {
    icon: <Code size={20} />,
    title: "Full-Stack Engineering",
    description:
      "60+ production projects across the entire stack — from React and Next.js on the frontend to Node.js, Laravel, and PostgreSQL on the backend. I architect systems that handle millions of requests.",
    link: "/projects",
  },
  {
    icon: <Smartphone size={20} />,
    title: "Mobile Expertise",
    description:
      "7+ React Native applications shipped to App Store and Play Store. I build cross-platform mobile apps that perform at 60fps and feel native on both platforms.",
    link: "/projects",
  },
  {
    icon: <Brain size={20} />,
    title: "AI in Production",
    description:
      "I integrate AI where it adds genuine value — not as a gimmick. LangChain RAG systems, OpenAI/Claude APIs, TensorFlow models — all running in production serving real users.",
    link: "/projects",
  },
  {
    icon: <Lightbulb size={20} />,
    title: "Product Thinking",
    description:
      "I don't write code for its own sake. Every project starts with understanding the problem, the user, and the business outcome. I've built across fintech, real estate, automotive, and AI.",
    link: "/about",
  },
  {
    icon: <Users size={20} />,
    title: "Engineering Leadership",
    description:
      "Four promotions in three years — from web developer to leading a 5-person team. I still write code every day because leaders who build earn their team's trust.",
    link: "/about",
  },
  {
    icon: <Shield size={20} />,
    title: "Security-First Mindset",
    description:
      "Top 1% on TryHackMe. I apply OWASP and penetration testing methodology to every application I build. Security isn't a QA phase — it's a design constraint from day one.",
    link: "/about",
  },
];

export function WhatMakesMeDifferent() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal>
          <div className="mb-12">
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-accent">
              Why Me
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              The combination is rare.
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-2xl">
              Most engineers specialize in one area. I bring six — and each one reinforces the others.
            </p>
          </div>
        </ScrollReveal>

        <ScrollStagger className="space-y-4">
          {differentiators.map((item) => (
            <a
              key={item.title}
              href={item.link}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/20 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/5 text-accent">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-sm font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex sm:items-center sm:gap-1">
                Learn more <ArrowRight size={14} />
              </div>
            </a>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
