"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";
import { siteConfig } from "@/lib/constants";

const repos = [
  {
    name: "ai-stock-analyser",
    description:
      "A production AI trading dashboard demonstrating real-time LSTM inference, WebSocket data pipelines, and React D3.js visualization at sub-100ms latency.",
    demonstrates: "Real-time ML inference · WebSocket architecture · Data visualization",
    url: "https://github.com/anshulmeena/ai-stock-analyser",
  },
  {
    name: "react-native-boilerplate",
    description:
      "A production-ready React Native starter with authentication flows, API integration patterns, AI module scaffolding, and CI/CD pipelines pre-configured.",
    demonstrates: "Mobile architecture · Auth patterns · CI/CD · AI integration",
    url: "https://github.com/anshulmeena/react-native-boilerplate",
  },
  {
    name: "wealth-walk",
    description:
      "Full-stack fintech application with microservices backend, TensorFlow forecasting models, and React Native frontend — processing 1M+ financial transactions.",
    demonstrates: "Microservices · ML in production · Secure fintech architecture",
    url: "https://github.com/anshulmeena/wealth-walk",
  },
];

export function FeaturedEngineering() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          label="Engineering Work"
          title="Featured Repositories"
          description="Selected open-source work that demonstrates specific engineering decisions and architecture patterns."
        />
        <div className="space-y-4">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group block rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-glow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg border border-accent/20 bg-accent/5 text-accent shrink-0">
                    <Code2 size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium group-hover:text-accent transition-colors">
                        {repo.name}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {repo.description}
                    </p>
                    <p className="mt-3 text-xs text-accent/70 font-medium">
                      {repo.demonstrates}
                    </p>
                  </div>
                </div>
                <ExternalLink
                  size={14}
                  className="mt-1.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                />
              </div>
            </motion.a>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            View all on GitHub <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
