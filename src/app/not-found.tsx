import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        Page not found
      </p>
      <h1 className="mt-4 font-display text-[10rem] leading-none tracking-tighter text-foreground/10 md:text-[14rem]">
        404
      </h1>
      <p className="mt-2 text-lg text-muted">
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="group mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/25"
      >
        <span className="transition-transform group-hover:-translate-x-0.5">
          &larr;
        </span>
        Go home
      </Link>
    </main>
  );
}
