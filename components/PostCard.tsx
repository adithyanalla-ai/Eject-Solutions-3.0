import Link from "next/link";
import type { Entry } from "@/lib/content";
import { fmtDate } from "@/lib/content";
import { CoverScene } from "./illustrations/scenes";

export default function PostCard({ post, kind }: { post: Entry; kind: "blog" | "news" }) {
  const updated = post.updated && post.updated !== post.date ? post.updated : null;
  return (
    <article className="panel lift flex flex-col p-6">
      <div className="lazy-art mb-4 overflow-hidden rounded-xl" style={{ containIntrinsicSize: "auto 150px" }}>
        <CoverScene category={post.category} className="h-auto w-full" />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="chip">{post.category ?? (kind === "news" ? "News" : "Guide")}</span>
        <span className="text-xs text-muted">{kind === "blog" ? `${post.minutes} min read` : "Short read"}</span>
      </div>
      <h3 className="mt-3 text-xl">
        <Link href={`/${kind}/${post.slug}`} className="after:absolute after:inset-0 after:rounded-2xl hover:text-primary">{post.title}</Link>
      </h3>
      <p className="mt-2 flex-1 text-[0.95rem] text-muted">{post.description}</p>
      <p className="mt-4 text-xs text-muted">
        <time dateTime={post.date}>{fmtDate(post.date)}</time>
        {updated && <> · Updated <time dateTime={updated}>{fmtDate(updated)}</time></>}
        {kind === "news" && post.source ? <> · Source: {post.source.name}</> : null}
      </p>
    </article>
  );
}
