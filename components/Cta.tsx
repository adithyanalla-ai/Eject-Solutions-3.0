import Link from "next/link";
import Icon from "./Icon";
import { whatsappHref } from "@/lib/site";

export default function Cta({ title = "Have a build, a risk or a hiring problem to solve?", text = "Tell us what you are working on. You will hear back from an engineer or consultant, not a sales script.", source = "cta-block" }: { title?: string; text?: string; source?: string }) {
  return (
    <section aria-labelledby="cta-h" className="section">
      <div className="container-page">
        <div className="glass relative overflow-hidden p-8 sm:p-12 text-center">
          <div className="hero-glow absolute inset-0 -z-10" aria-hidden="true" />
          <h2 id="cta-h" className="text-3xl sm:text-4xl max-w-2xl mx-auto">{title}</h2>
          <p className="mt-4 text-muted max-w-xl mx-auto">{text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-primary" data-track="cta_click" data-track-label={`${source}-book`}>
              Book a consultation <Icon name="arrow" size={18} />
            </Link>
            <a href={whatsappHref()} className="btn btn-ghost" target="_blank" rel="noopener noreferrer" data-track="cta_click" data-track-label={`${source}-whatsapp`}>
              <Icon name="whatsapp" size={18} /> WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
