import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { getBlogSlugs, getBlogPost } from "@/lib/content-loader";
import { BlogPostBody } from "./blog-post-body";
import { siteConfig } from "@/lib/constants";

interface Frontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: number;
}

function parseFrontmatter(raw: string): { frontmatter: Frontmatter; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return {
      frontmatter: { title: "", date: "", description: "", tags: [], readingTime: 0 },
      content: raw,
    };
  }
  const fm: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    let value: unknown = line.slice(sep + 1).trim();
    if (value === "true" || value === "false") value = value === "true";
    if (key === "tags") {
      try { value = JSON.parse(value as string); } catch { value = []; }
    }
    if (key === "readingTime") value = Number(value);
    fm[key] = value;
  }
  return {
    frontmatter: fm as unknown as Frontmatter,
    content: match[2],
  };
}

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const raw = getBlogPost(slug);
  if (!raw) return {};
  const { frontmatter } = parseFrontmatter(raw);
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: `${frontmatter.title} — ${siteConfig.name}`,
      description: frontmatter.description,
    },
  };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const raw = getBlogPost(slug);
  if (!raw) notFound();

  const { frontmatter, content } = parseFrontmatter(raw);

  return (
    <article className="pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} /> Back to blog
        </Link>

        <header>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {formatDate(frontmatter.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {frontmatter.readingTime} min read
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{frontmatter.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{frontmatter.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag: string) => (
              <Badge key={tag} variant="accent">{tag}</Badge>
            ))}
          </div>
        </header>

        <div className="mt-12">
          <BlogPostBody source={content} />
        </div>
      </div>
    </article>
  );
}
