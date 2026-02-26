import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-bold text-accent">404</h1>
      <p className="mt-4 text-xl text-muted">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-accent px-6 py-3 text-accent-foreground font-medium hover:opacity-90 transition-opacity"
      >
        Go home
      </Link>
    </main>
  );
}
