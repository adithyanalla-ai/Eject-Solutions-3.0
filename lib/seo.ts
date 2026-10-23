import type { Metadata } from "next";
import { absoluteUrl, site } from "./site";

const BRAND = " | Eject Solutions";
/** Append the brand when the result still fits Google's ~60 char title budget. */
export const fullTitle = (t: string) => (t.length + BRAND.length <= 60 ? `${t}${BRAND}` : t);

type Opts = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  noindex?: boolean;
  /** Set on routes that have their own opengraph-image.tsx; others fall back to the site default image. */
  ownImage?: boolean;
};

export function buildMetadata(o: Opts): Metadata {
  const title = fullTitle(o.title);
  const url = absoluteUrl(o.path);
  return {
    title: { absolute: title },
    description: o.description,
    alternates: { canonical: url },
    robots: o.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: o.type ?? "website",
      url,
      title,
      description: o.description,
      siteName: site.name,
      locale: "en_IN",
      ...(o.ownImage ? {} : { images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: site.name }] }),
      ...(o.type === "article"
        ? { publishedTime: o.publishedTime, modifiedTime: o.modifiedTime, authors: o.authors, tags: o.tags }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: o.description,
      ...(o.ownImage ? {} : { images: [absoluteUrl("/twitter-image")] }),
    },
  };
}
