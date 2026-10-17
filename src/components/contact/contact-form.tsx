"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/contact/action";

const initialState: ContactState = {};

const fields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Your name",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
  },
] as const;

function FieldError({ id, messages }: { id: string; messages?: string[] }) {
  if (!messages?.length) return null;
  return (
    <p id={id} className="mt-2 font-mono text-xs tracking-[0.04em] text-orange">
      {messages[0]}
    </p>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState);

  if (state.success) {
    return (
      <div
        role="status"
        className="report flex flex-col items-start px-[clamp(20px,2.4vw,32px)] pb-8 pt-[26px]"
      >
        <span className="mb-4 rotate-[-4deg] border-2 border-stamp px-2 py-1.5 font-mono text-[11px] font-bold uppercase leading-none tracking-[0.16em] text-stamp">
          Signed
        </span>
        <p className="font-display text-[clamp(32px,4vw,44px)] font-black uppercase leading-none text-paper-ink">
          Message received
        </p>
        <p className="mt-3 text-paper-muted">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      {state.error && (
        <p
          role="alert"
          className="border-l-4 border-orange bg-orange/12 px-4 py-3 text-sm text-chalk"
        >
          {state.error}
        </p>
      )}

      {fields.map((field) => {
        const errors = state.fieldErrors?.[field.name];
        return (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="mb-2 block font-mono text-xs font-bold uppercase tracking-[0.18em] text-orange"
            >
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required
              defaultValue={state.values?.[field.name]}
              placeholder={field.placeholder}
              aria-invalid={errors ? true : undefined}
              aria-describedby={errors ? `${field.name}-error` : undefined}
              className="field"
            />
            <FieldError id={`${field.name}-error`} messages={errors} />
          </div>
        );
      })}

      <div>
        <label
          htmlFor="message"
          className="mb-2 block font-mono text-xs font-bold uppercase tracking-[0.18em] text-orange"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          minLength={10}
          defaultValue={state.values?.message}
          placeholder="Tell me about your project..."
          aria-invalid={state.fieldErrors?.message ? true : undefined}
          aria-describedby={
            state.fieldErrors?.message ? "message-error" : undefined
          }
          className="field resize-y"
        />
        <FieldError id="message-error" messages={state.fieldErrors?.message} />
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

      <button type="submit" disabled={pending} className="btn btn-primary">
        {pending ? "Sending..." : "Send message"}
        {!pending && (
          <span className="arrow" aria-hidden="true">
            &rarr;
          </span>
        )}
      </button>
    </form>
  );
}
