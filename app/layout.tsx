import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Enhancements from "@/components/Enhancements";
import LazyWidgets from "@/components/LazyWidgets";
import WhatsAppFab from "@/components/WhatsAppFab";
import BookFab from "@/components/BookFab";
import ReadingProgress from "@/components/ReadingProgress";
import { SITE_URL, site } from "@/lib/site";

const display = localFont({
  src: "./fonts/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-display",
  weight: "300 700",
  display: "swap",
  preload: true,
});
const mono = localFont({
  src: "./fonts/jetbrains-mono-500.woff2",
  variable: "--font-mono",
  weight: "500",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Eject Solutions: Software, Security & AI in Hyderabad", template: "%s" },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: SITE_URL, types: { "application/rss+xml": `${SITE_URL}/rss.xml` } },
  verification: {
    google: site.gscVerification || undefined,
    other: site.bingVerification ? { "msvalidate.01": site.bingVerification } : undefined,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef2f7" },
    { media: "(prefers-color-scheme: dark)", color: "#090d1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');d.dataset.theme=t==='dark'?'dark':'light'}catch(e){d.dataset.theme='light'}d.classList.add('js')})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-theme="light" suppressHydrationWarning className={`${display.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="backdrop" aria-hidden="true"><span className="orb orb-1" /><span className="orb orb-2" /><span className="orb orb-3" /><span className="grain" /></div>
        <ReadingProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
        <BookFab />
        <Enhancements />
        <LazyWidgets ga4={site.ga4} />
      </body>
    </html>
  );
}
