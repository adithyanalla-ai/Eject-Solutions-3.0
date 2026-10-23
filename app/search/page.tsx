import type { Metadata } from "next";
import { Suspense } from "react";
import SearchClient from "./SearchClient";

export const metadata: Metadata = { title: "Search | Eject Solutions", robots: { index: false, follow: true } };

export default function SearchPage() {
  return (
    <div className="container-page py-14">
      <h1 className="text-4xl">Search</h1>
      <Suspense fallback={<p className="mt-6 text-muted">Loading search…</p>}>
        <SearchClient />
      </Suspense>
    </div>
  );
}
