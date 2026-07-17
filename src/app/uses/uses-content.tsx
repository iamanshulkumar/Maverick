"use client";

import { motion } from "framer-motion";
import { Code2, Bot, Laptop } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";

const categories = [
  {
    icon: <Laptop size={20} />,
    title: "Hardware",
    items: [
      { label: "Laptop", value: "MacBook Pro M3 Pro 16-inch" },
      { label: "Monitor", value: "Dell U2723QE 4K 27-inch" },
      { label: "Keyboard", value: "Keychron Q1 Pro" },
      { label: "Mouse", value: "Logitech MX Master 3S" },
      { label: "Desk", value: "Uplift Standing Desk" },
      { label: "Chair", value: "Herman Miller Embody" },
    ],
  },
  {
    icon: <Code2 size={20} />,
    title: "Editor & Terminal",
    items: [
      { label: "Editor", value: "VS Code with Cursor" },
      { label: "Theme", value: "One Dark Pro" },
      { label: "Terminal", value: "Warp + PowerShell" },
      { label: "Font", value: "JetBrains Mono Nerd Font" },
    ],
  },
  {
    icon: <Bot size={20} />,
    title: "AI Tools",
    items: [
      { label: "Claude", value: "Daily coding & architecture" },
      { label: "ChatGPT", value: "Research & brainstorming" },
      { label: "DeepSeek", value: "Code review & optimization" },
      { label: "Cursor", value: "AI-first code editor" },
      { label: "GitHub Copilot", value: "Inline completions" },
      { label: "OpenAI API", value: "Building AI features" },
    ],
  },
  {
    icon: <Code2 size={20} />,
    title: "VS Code Extensions",
    items: [
      { label: "GitLens", value: "Git supercharged" },
      { label: "ES7+ React/RN snippets", value: "Snippets" },
      { label: "Tailwind CSS IntelliSense", value: "Tailwind support" },
      { label: "Prettier", value: "Code formatting" },
      { label: "Error Lens", value: "Inline errors" },
      { label: "Thunder Client", value: "API testing" },
    ],
  },
];

export function UsesContent() {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-accent">Uses</span>
          <h1 className="text-4xl font-bold tracking-tight">My Setup</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Hardware, software, and tools I use daily to build software.
          </p>
        </motion.div>

        <div className="mt-16 space-y-10">
          {categories.map((cat, i) => (
            <AnimatedSection key={cat.title} delay={i * 0.1}>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-accent">{cat.icon}</span>
                  <h2 className="text-xl font-semibold">{cat.title}</h2>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {cat.items.map((item) => (
                    <div key={item.label} className="flex flex-col">
                      <span className="text-xs font-medium text-accent uppercase tracking-wider">{item.label}</span>
                      <span className="text-sm text-muted-foreground mt-0.5">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
