"use client";
export default function CookieSettings({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return (
    <button type="button" className="hover:text-primary underline-offset-4 hover:underline" onClick={() => window.dispatchEvent(new Event("open-consent"))}>
      Cookie settings
    </button>
  );
}
