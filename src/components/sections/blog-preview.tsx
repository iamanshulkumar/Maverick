import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";
import { BlogCard } from "@/components/shared/blog-card";
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

export function BlogPreview() {
  const slugs = getBlogSlugs();
  const posts: BlogPost[] = slugs
    .map((slug) => {
      const raw = getBlogPost(slug);
      if (!raw) return null;
      const fm = parseFrontmatter(slug, raw);
      return { ...fm, content: "", published: true };
    })
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          label="Blog"
          title="Latest Writing"
          description="Thoughts on engineering, AI, and leadership."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            Read all articles <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
