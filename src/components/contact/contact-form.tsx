"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/contact/action";

const initialState: ContactState = {};

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState);

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="font-display text-2xl">Message sent!</p>
        <p className="mt-2 text-muted">I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      {state.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
          {state.error}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          placeholder="Your name"
        />
        {state.fieldErrors?.name && (
          <p className="mt-1.5 text-xs text-red-500">
            {state.fieldErrors.name[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          placeholder="you@example.com"
        />
        {state.fieldErrors?.email && (
          <p className="mt-1.5 text-xs text-red-500">
            {state.fieldErrors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full resize-y rounded-lg border border-border bg-transparent px-4 py-3 text-foreground transition-colors placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          placeholder="Tell me about your project..."
        />
        {state.fieldErrors?.message && (
          <p className="mt-1.5 text-xs text-red-500">
            {state.fieldErrors.message[0]}
          </p>
        )}
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="mapleSyrup"
        tabIndex={-1}
        autoComplete="off"
        className="absolute h-0 w-0 overflow-hidden opacity-0"
        aria-hidden="true"
      />

      <button
        type="submit"
        disabled={pending}
        className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/25 disabled:opacity-50"
      >
        {pending ? "Sending..." : "Send Message"}
        {!pending && (
          <span className="transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        )}
      </button>
    </form>
  );
}
