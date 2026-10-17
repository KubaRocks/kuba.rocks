import Link from "next/link";
import { JERSEY_NUMBER } from "@/lib/jersey";
import { Nav } from "./nav";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-deep/90 backdrop-blur-md animate-fade">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Kuba Florczuk, home"
          className="flex items-center gap-3 no-underline"
        >
          <span
            aria-hidden="true"
            className="clip-patch grid h-10 w-10 place-items-center bg-orange font-display text-[22px] font-black leading-none text-on-accent"
          >
            {JERSEY_NUMBER}
          </span>
          <span className="hidden font-display text-xl font-extrabold uppercase leading-none tracking-[0.06em] sm:inline">
            Kuba<span className="text-orange">.</span>Rocks
          </span>
        </Link>
        <div className="flex items-center gap-[clamp(10px,3vw,36px)]">
          <Nav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
