"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks({ items, mobile = false }: { items: { href: string; label: string }[]; mobile?: boolean }) {
  const path = usePathname();
  const active = (href: string) => (href === "/" ? path === "/" : path === href || path.startsWith(href + "/"));
  return (
    <ul className={mobile ? "space-y-1" : "flex items-center gap-1"}>
      {items.map((n) => (
        <li key={n.href}>
          <Link
            href={n.href}
            aria-current={active(n.href) ? "page" : undefined}
            className={mobile ? "block rounded-xl px-3 py-3 hover:bg-[#facc15]/25 aria-[current=page]:bg-[#facc15]/40 aria-[current=page]:font-medium" : "nav-link"}
          >
            {n.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
