"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main">
      <ul className="flex gap-[clamp(14px,3vw,36px)]">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`block border-b-2 py-2 font-cond text-[15px] font-semibold uppercase leading-none tracking-[0.16em] no-underline transition-colors hover:border-orange hover:text-chalk ${
                  active
                    ? "border-orange text-chalk"
                    : "border-transparent text-chalk-muted"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
