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
        className="p-2"
        aria-label="Toggle menu"
      >
        <span className="block w-6 h-0.5 bg-foreground mb-1.5" />
        <span className="block w-6 h-0.5 bg-foreground mb-1.5" />
        <span className="block w-6 h-0.5 bg-foreground" />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
