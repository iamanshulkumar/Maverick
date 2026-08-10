"use client";

import { Code, Smartphone, Brain, Lightbulb, Users, Shield } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { ScrollStagger } from "@/components/shared/scroll-stagger";

const differentiators = [
  {
    icon: <Code size={22} />,
    title: "Full-Stack Engineering",
    description:
      "60+ production projects across the entire stack — from React and Next.js on the frontend to Node.js, Laravel, and PostgreSQL on the backend. I architect systems that handle millions of requests.",
    evidence: "4+ years · TypeScript · React · Node.js · PostgreSQL",
  },
  {
    icon: <Smartphone size={22} />,
    title: "Mobile Expertise",
    description:
      "7+ React Native applications shipped to App Store and Play Store. I build cross-platform mobile apps that perform at 60fps and feel native on both platforms.",
    evidence: "7+ apps · React Native · Expo · 60fps target",
  },
  {
    icon: <Brain size={22} />,
    title: "AI in Production",
    description:
      "I integrate AI where it adds genuine value — not as a gimmick. LangChain RAG systems, OpenAI/Claude APIs, TensorFlow models — all running in production serving real users.",
    evidence: "LangChain · RAG · OpenAI · TensorFlow · Production AI",
  },
  {
    icon: <Lightbulb size={22} />,
    title: "Product Thinking",
    description:
      "I don't write code for its own sake. Every project starts with understanding the problem, the user, and the business outcome. I've built across fintech, real estate, automotive, and AI.",
    evidence: "Fintech · Real Estate · Automotive · AI Products",
  },
  {
    icon: <Users size={22} />,
    title: "Engineering Leadership",
    description:
      "Four promotions in three years — from web developer to leading a 5-person team. I still write code every day because leaders who build earn their team's trust.",
    evidence: "4 promotions · 5-person team · Hands-on daily",
  },
  {
    icon: <Shield size={22} />,
    title: "Security-First Mindset",
    description:
      "Top 1% on TryHackMe. I apply OWASP and penetration testing methodology to every application I build. Security isn't a QA phase — it's a design constraint from day one.",
    evidence: "Top 1% TryHackMe · OWASP · Secure by design",
  },
];

export function WhatMakesMeDifferent() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-accent">
              Why Me
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              The combination is rare.
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto">
              Most engineers specialize in one area. I bring six — and each one reinforces the others.
            </p>
          </div>
        </ScrollReveal>

        <ScrollStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item) => (
            <div
              key={item.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/20 hover:shadow-glow"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-accent/20 bg-accent/5 text-accent">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
              <p className="mt-4 text-xs text-accent/70 font-medium">
                {item.evidence}
              </p>
            </div>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
