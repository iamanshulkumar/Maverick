"use client";

import { motion } from "framer-motion";
import { Book, Lightbulb, TrendingUp, Sparkles, Brain } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";

const sections = [
  {
    icon: <TrendingUp size={20} />,
    title: "Current Focus",
    items: [
      "Leading a 5-member engineering team at Yuvmedia",
      "Building AI-powered mobile applications with React Native",
      "Implementing RAG systems for enterprise clients",
      "Scaling production infrastructure for 50K+ users",
    ],
  },
  {
    icon: <Brain size={20} />,
    title: "Currently Learning",
    items: [
      "Advanced LangChain patterns for production",
      "System design for distributed systems",
      "SwiftUI for native iOS development",
      "Kubernetes for container orchestration",
    ],
  },
  {
    icon: <Book size={20} />,
    title: "Reading",
    items: [
      "Designing Data-Intensive Applications by Martin Kleppmann",
      "The Staff Engineer's Path by Tanya Reilly",
      "An Elegant Puzzle by Will Larson",
      "System Design Interview by Alex Xu",
    ],
  },
  {
    icon: <Sparkles size={20} />,
    title: "Side Projects",
    items: [
      "Building an open-source AI chatbot SDK",
      "Developing a developer productivity VS Code extension",
      "Writing a technical blog series on AI engineering",
      "Contributing to React Native community libraries",
    ],
  },
  {
    icon: <Lightbulb size={20} />,
    title: "Experiments",
    items: [
      "Edge computing with WebAssembly",
      "AI-powered code review automation",
      "Real-time collaborative editing with CRDTs",
      "Cross-platform performance benchmarking",
    ],
  },
];

export function NowContent() {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-accent">Now</span>
          <h1 className="text-4xl font-bold tracking-tight">What I&apos;m Doing Now</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Updated July 2026. Inspired by the /now page movement.
          </p>
        </motion.div>

        <div className="mt-16 space-y-8">
          {sections.map((section, i) => (
            <AnimatedSection key={section.title} delay={i * 0.1}>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-accent">{section.icon}</span>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
