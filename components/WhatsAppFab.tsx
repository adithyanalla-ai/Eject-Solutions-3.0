import Icon from "./Icon";
import { whatsappHref } from "@/lib/site";

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Eject Solutions on WhatsApp"
      data-track="cta_click"
      data-track-label="whatsapp-fab"
      className="fixed bottom-4 left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#0a0a0a] text-[#facc15] ring-1 ring-[#facc15]/70 shadow-[0_8px_20px_rgba(10,10,10,.35),inset_0_1px_0_rgba(255,255,255,.2)] hover:brightness-110 active:translate-y-px"
    >
      <Icon name="whatsapp" size={26} />
    </a>
  );
}
