import { getOne, slugs } from "@/lib/content";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Eject Solutions guide";
export const generateStaticParams = () => slugs("blog").map((slug) => ({ slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getOne("blog", (await params).slug);
  return renderOg(p?.title ?? "Eject Solutions", `Guide · ${p?.category ?? "Insights"}`, p?.category ?? undefined);
}
