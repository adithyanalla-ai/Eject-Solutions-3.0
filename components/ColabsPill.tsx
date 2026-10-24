import { site } from "@/lib/site";

/** Floating raised pill. [[CONFIRM]] destination via NEXT_PUBLIC_COLABS_URL. */
export default function ColabsPill() {
  const external = /^https?:/.test(site.colabs);
  return (
    <a
      href={site.colabs}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      data-track="cta_click"
      data-track-label="fab-colabs"
      className="btn btn-ghost fixed bottom-4 left-4 z-30 !px-5 tracking-[0.12em] shadow-xl"
    >
      OPEN COLABS <span aria-hidden="true">↗</span>
    </a>
  );
}
