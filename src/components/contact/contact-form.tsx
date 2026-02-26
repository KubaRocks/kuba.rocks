"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/contact/action";

const initialState: ContactState = {};

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState);

  if (state.success) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-xl font-semibold mb-2">Message sent!</p>
        <p className="text-muted">I&apos;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      {state.error && (
        <p className="text-red-500 text-sm">{state.error}</p>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:border-accent focus:outline-none"
        />
        {state.fieldErrors?.name && (
          <p className="mt-1 text-sm text-red-500">{state.fieldErrors.name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:border-accent focus:outline-none"
        />
        {state.fieldErrors?.email && (
          <p className="mt-1 text-sm text-red-500">{state.fieldErrors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-3 focus:border-accent focus:outline-none resize-y"
        />
        {state.fieldErrors?.message && (
          <p className="mt-1 text-sm text-red-500">{state.fieldErrors.message[0]}</p>
        )}
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="mapleSyrup"
        tabIndex={-1}
        autoComplete="off"
        className="absolute opacity-0 h-0 w-0 overflow-hidden"
        aria-hidden="true"
      />

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-accent px-8 py-3 text-accent-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
