import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Link from "next/link";
import type { ComponentProps } from "react";

const A = ({ href = "", ...rest }: ComponentProps<"a">) =>
  href.startsWith("/") || href.startsWith("#") ? (
    <Link href={href} {...(rest as object)} />
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest} />
  );

const Table = (p: ComponentProps<"table">) => (
  <div className="table-wrap"><table {...p} /></div>
);

const Callout = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <aside className="panel my-8 border-l-4 !border-l-primary p-5">
    {title && <p className="font-display font-semibold mb-1">{title}</p>}
    <div className="[&>p]:my-2">{children}</div>
  </aside>
);

export default function Mdx({ source }: { source: string }) {
  return (
    <div className="prose-eject">
      <MDXRemote
        source={source}
        components={{ a: A, table: Table, Callout }}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
      />
    </div>
  );
}
