import Link from "next/link";
import type { Entry } from "@/lib/content";
import { fmtDate } from "@/lib/content";

export default function PostCard({ post, kind }: { post: Entry; kind: "blog" | "news" }) {
  return (
    <article className="glass glass-hover relative p-6 flex flex-col">
      <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-primary">
        <span>{post.category ?? (kind === "news" ? "News" : "Guide")}</span>
        <span className="text-muted">·</span>
        <time dateTime={post.date} className="text-muted normal-case tracking-normal">{fmtDate(post.date)}</time>
      </div>
      <h3 className="mt-3 text-xl">
        <Link href={`/${kind}/${post.slug}`} className="hover:text-primary after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 text-muted text-[0.95rem] flex-1">{post.description}</p>
      <p className="mt-4 text-sm text-muted">{kind === "blog" ? `${post.minutes} min read` : post.source ? `Source: ${post.source.name}` : ""}</p>
    </article>
  );
}
