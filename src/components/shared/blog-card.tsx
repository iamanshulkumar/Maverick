"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-glow"
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatDate(post.date)}</span>
          <span>&middot;</span>
          <Clock size={12} />
          <span>{post.readingTime} min read</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold group-hover:text-accent transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {post.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="accent">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground group-hover:text-accent transition-colors">
          Read more <ArrowUpRight size={12} />
        </div>
      </Link>
    </motion.div>
  );
}
