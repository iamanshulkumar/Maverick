import { SectionTitle } from "@/components/shared/section-title";
import { BlogCard } from "@/components/shared/blog-card";
import type { BlogPost } from "@/types";

export function BlogContent({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          label="Blog"
          title="Articles & Insights"
          description="Writing about AI, engineering, security, and leadership."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
