import { getOne, slugs } from "@/lib/content";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Eject Solutions industry";
export const generateStaticParams = () => slugs("industries").map((slug) => ({ slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = getOne("industries", (await params).slug);
  return renderOg(s?.title ?? "Eject Solutions", "Industry");
}
