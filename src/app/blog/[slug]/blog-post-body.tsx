import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="mt-6 mb-2 text-lg font-semibold tracking-tight" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed text-muted-foreground" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 space-y-2 list-decimal list-inside" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-muted-foreground" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-accent underline underline-offset-2 hover:text-accent-light" target="_blank" rel="noopener noreferrer" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="my-6 border-l-2 border-accent pl-4 italic text-muted-foreground" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="mb-6 overflow-x-auto rounded-xl border border-border bg-card p-4 font-mono text-sm" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="mb-6 overflow-x-auto"><table className="w-full border-collapse text-sm" {...props} /></div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="border border-border bg-card px-3 py-2 text-left font-medium" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-border px-3 py-2 text-muted-foreground" {...props} />
  ),
  hr: () => <hr className="my-8 border-border" />,
};

export function BlogPostBody({ source }: { source: string }) {
  return (
    <div className="prose prose-invert max-w-none [&_*]:!border-border">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
