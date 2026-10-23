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
      className="fixed bottom-4 left-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#128c4a] text-white shadow-lg hover:brightness-110"
    >
      <Icon name="whatsapp" size={26} />
    </a>
  );
}
