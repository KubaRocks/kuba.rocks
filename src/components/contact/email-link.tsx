"use client";

import { MdEmail } from "react-icons/md";

/**
 * Email link that assembles the address client-side via JavaScript
 * to prevent bot scraping from static HTML.
 */
export function EmailLink() {
  const parts = ["me", "kuba.rocks"];
  const email = parts.join("@");

  return (
    <a
      href={`mailto:${email}`}
      className="group flex items-center gap-4 text-muted transition-colors hover:text-foreground"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors group-hover:border-accent group-hover:text-accent">
        <MdEmail size={18} />
      </span>
      <span className="text-sm">{email}</span>
    </a>
  );
}
