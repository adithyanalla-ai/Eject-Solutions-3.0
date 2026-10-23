import { getOne, slugs } from "@/lib/content";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Eject Solutions service";
export const generateStaticParams = () => slugs("services").map((slug) => ({ slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = getOne("services", (await params).slug);
  return renderOg(s?.title ?? "Eject Solutions", "Service · Hyderabad");
}
