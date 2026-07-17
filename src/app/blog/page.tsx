import type { Metadata } from "next";
import { BlogContent } from "./blog-content";
import { getBlogSlugs, getBlogPost } from "@/lib/content-loader";
import type { BlogPost } from "@/types";

interface Frontmatter {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: number;
}

function parseFrontmatter(slug: string, raw: string): Frontmatter {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n[\s\S]*$/);
  const fm: Record<string, unknown> = { slug, title: "", date: "", description: "", tags: [], readingTime: 0 };
  if (match) {
    for (const line of match[1].split("\n")) {
      const sep = line.indexOf(":");
      if (sep === -1) continue;
      const key = line.slice(0, sep).trim();
      let value: unknown = line.slice(sep + 1).trim();
      if (key === "tags") {
        try { value = JSON.parse(value as string); } catch { value = []; }
      }
      if (key === "readingTime") value = Number(value);
      fm[key] = value;
    }
  }
  return fm as unknown as Frontmatter;
}

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on AI, React, React Native, Node.js, security, career, and project management.",
};

export default function BlogPage() {
  const slugs = getBlogSlugs();
  const posts: Frontmatter[] = slugs
    .map((slug) => {
      const raw = getBlogPost(slug);
      if (!raw) return null;
      return parseFrontmatter(slug, raw);
    })
    .filter((p): p is Frontmatter => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const blogPosts = posts.map(({ ...rest }) => ({ ...rest, content: "", published: true }));

  return <BlogContent posts={blogPosts} />;
}
