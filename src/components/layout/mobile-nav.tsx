"use client";

import { useState } from "react";
import Link from "next/link";
import { navItems } from "./nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full border-b border-border bg-background/95 backdrop-blur-xl">
          <div className="mx-auto max-w-[var(--width-content)] px-6 py-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-lg font-medium text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
