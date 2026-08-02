"use client";

import { motion } from "framer-motion";
import { BookOpen, Star, Calendar, Users, BookMarked } from "lucide-react";
import { Counter } from "@/components/reading/counter";
import type { ReadingStats } from "@/types";

interface ReadingHeroProps {
  stats: ReadingStats;
}

const statCards = [
  { key: "books", icon: BookOpen, label: "Books Read", suffix: "" },
  { key: "years", icon: Calendar, label: "Years Reading", suffix: "" },
  { key: "genres", icon: BookMarked, label: "Genres", suffix: "" },
  { key: "authorsRevisited", icon: Users, label: "Authors Revisited", suffix: "" },
] as const;

export function ReadingHero({ stats }: ReadingHeroProps) {
  return (
    <section className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-accent">
          Reading Journal
        </span>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          A decade of books, <span className="text-accent">page by page</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          The stories and ideas that shaped how I think, build, and see the world.
        </p>
      </motion.div>

      <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="rounded-xl border border-border bg-card p-5"
            >
              <Icon className="mb-3 h-5 w-5 text-accent" />
              <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
                <Counter value={stats[card.key]} />
                {card.suffix}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{card.label}</p>
            </motion.div>
          );
        })}
      </div>

      {stats.currentRead && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto mt-6 flex max-w-xl items-center justify-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-5 py-2.5"
        >
          <Star className="h-4 w-4 fill-accent text-accent" />
          <p className="text-sm text-muted-foreground">
            Currently reading{" "}
            <span className="font-medium text-foreground">{stats.currentRead}</span>
          </p>
        </motion.div>
      )}
    </section>
  );
}
