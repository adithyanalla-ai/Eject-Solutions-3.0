"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

export default function BookFab() {
  if (usePathname() === "/contact") return null;
  return (
    <Link
      href="/contact"
      className="btn btn-primary fixed bottom-4 right-4 z-30 shadow-xl"
      data-track="cta_click"
      data-track-label="fab-book"
    >
      <span className="hidden sm:inline">Book a consultation</span>
      <span className="sm:hidden">Book a call</span>
      <Icon name="arrow" size={18} />
    </Link>
  );
}
