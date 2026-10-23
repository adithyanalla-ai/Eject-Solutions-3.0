import { getOne, slugs } from "@/lib/content";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Eject Solutions news";
export const generateStaticParams = () => slugs("news").map((slug) => ({ slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getOne("news", (await params).slug);
  return renderOg(p?.title ?? "Eject Solutions", `News · ${p?.category ?? "Update"}`);
}
