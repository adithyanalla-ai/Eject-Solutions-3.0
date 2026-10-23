import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Eject Solutions: software, cybersecurity and AI from Hyderabad";

export default function Image() {
  return renderOg("Build it. Secure it. Automate it.", "Hyderabad · Software · Security · AI");
}
