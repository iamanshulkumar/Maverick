import { siteConfig } from "@/lib/constants";
import { getBlogSlugs, getBlogPost } from "@/lib/content-loader";

function parseFrontmatter(raw: string): { title: string; date: string; description: string } | null {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n[\s\S]*$/);
  if (!match) return null;
  const fm: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    fm[line.slice(0, sep).trim()] = line.slice(sep + 1).trim();
  }
  return { title: fm.title || "", date: fm.date || "", description: fm.description || "" };
}

export async function GET() {
  const slugs = getBlogSlugs();
  const items = slugs
    .map((slug) => {
      const raw = getBlogPost(slug);
      if (!raw) return "";
      const fm = parseFrontmatter(raw);
      if (!fm) return "";
      return `
    <item>
      <title>${fm.title}</title>
      <description>${fm.description}</description>
      <link>${siteConfig.url}/blog/${slug}</link>
      <pubDate>${new Date(fm.date).toUTCString()}</pubDate>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <description>${siteConfig.description}</description>
    <link>${siteConfig.url}</link>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
