"use client";

import { useCallback, useState } from "react";

// Kept in parts so the full address never appears in the HTML or the JS bundle
const EMAIL_PARTS = ["me", "kuba.rocks"];

/**
 * Email row that only reveals the address after a click. The server-rendered
 * HTML contains a button, never the address, so scrapers reading the page
 * source (and bots that don't interact) never see it.
 */
export function EmailLink({ className = "" }: { className?: string }) {
  const [revealed, setRevealed] = useState(false);
  // Focus moves to the link once it replaces the button
  const focusOnMount = useCallback((el: HTMLAnchorElement | null) => {
    el?.focus();
  }, []);

  const label = (
    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-orange">
      Email
    </span>
  );

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={() => setRevealed(true)}
        className={`w-full cursor-pointer text-left ${className}`}
      >
        {label}
        <span className="font-cond text-xl font-semibold tracking-[0.04em]">
          Show email address
        </span>
      </button>
    );
  }

  const email = EMAIL_PARTS.join("@");

  return (
    <a href={`mailto:${email}`} ref={focusOnMount} className={className}>
      {label}
      <span className="font-cond text-xl font-semibold tracking-[0.04em]">
        {email}
      </span>
    </a>
  );
}
