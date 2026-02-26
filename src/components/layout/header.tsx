import Link from "next/link";
import { Nav } from "./nav";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[var(--width-content)] items-center justify-between px-6 py-5">
        <Link href="/" className="text-xl">
          <span className="font-bold">kuba</span>
          <span className="font-light text-accent">.rocks</span>
        </Link>
        <Nav />
        <MobileNav />
      </div>
    </header>
  );
}
