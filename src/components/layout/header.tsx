import Link from "next/link";
import { Nav } from "./nav";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="relative border-b border-border">
      <div className="mx-auto flex max-w-[var(--width-content)] items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          kuba<span className="text-accent">.rocks</span>
        </Link>
        <Nav />
        <MobileNav />
      </div>
    </header>
  );
}
