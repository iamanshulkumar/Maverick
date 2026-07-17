"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
  readingTime: number;
}

interface BlogPostContentProps {
  post: PostData;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} /> Back to blog
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {post.readingTime} min read
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="accent">{tag}</Badge>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 prose prose-invert max-w-none"
        >
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-muted-foreground">
              Full article content coming soon. Stay tuned.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              In the meantime, check out my{" "}
              <Link href="/projects" className="text-accent hover:underline">
                projects
              </Link>{" "}
              or{" "}
              <Link href="/contact" className="text-accent hover:underline">
                get in touch
              </Link>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
