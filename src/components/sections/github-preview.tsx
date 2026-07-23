"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";
import { siteConfig } from "@/lib/constants";

const repos = [
  {
    name: "ai-stock-analyser",
    description:
      "A React + D3.js dashboard that displays real-time LSTM inference results from a Python backend. Uses WebSocket for streaming predictions and Redis for caching historical data.",
    demonstrates: "D3.js visualization · WebSocket streaming · Python ML backend",
    url: "https://github.com/iamanshulkumar/ai-stock-analyser",
  },
  {
    name: "react-native-boilerplate",
    description:
      "React Native (Expo) starter template with pre-configured authentication, API integration layer, navigation structure, and reusable component patterns.",
    demonstrates: "Expo · Auth flows · API architecture · Component patterns",
    url: "https://github.com/iamanshulkumar/react-native-boilerplate",
  },
  {
    name: "wealth-walk",
    description:
      "React Native fintech application with real-time market data, broker-agnostic portfolio tracking, and AI signal display. Backend runs on Node.js with WebSocket-based live updates.",
    demonstrates: "React Native · WebSocket · Broker API integration · Real-time data",
    url: "https://github.com/iamanshulkumar/wealth-walk",
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
