import Link from "next/link";
import { CourtLines } from "@/components/ui/court-lines";

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-clip px-6 py-20 text-center"
    >
      <CourtLines className="left-1/2 top-1/2 w-[min(900px,140vw)] -translate-x-1/2 -translate-y-1/2" />
      <p className="eyebrow relative animate-rise">Page not found</p>
      <div className="relative mt-4 grid h-[clamp(9rem,30vw,18rem)] place-items-center">
        <span
          aria-hidden="true"
          data-number="404"
          className="jersey animate-jersey text-[clamp(9rem,30vw,18rem)]"
        >
          404
        </span>
        <h1 className="relative animate-slam font-display text-[clamp(4rem,14vw,9rem)] font-black uppercase leading-[0.8] [animation-delay:0.2s]">
          Airball
        </h1>
      </div>
      <p className="relative mt-8 max-w-[30em] animate-rise text-lg text-chalk-muted [animation-delay:0.4s]">
        That shot missed the rim entirely. This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="btn btn-primary relative mt-10 animate-rise [animation-delay:0.5s]"
      >
        <span aria-hidden="true">&larr;</span>
        Back to home court
      </Link>
    </main>
  );
}
