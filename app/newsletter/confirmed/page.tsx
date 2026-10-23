import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Status from "./Status";

export const metadata: Metadata = { title: "Newsletter confirmation", robots: { index: false, follow: false } };

export default function Confirmed() {
  return (
    <div className="container-page py-24 text-center">
      <Suspense fallback={<h1 className="text-4xl">Confirming…</h1>}>
        <Status />
      </Suspense>
      <Link href="/" className="btn btn-primary mt-8">Back to home</Link>
    </div>
  );
}
