import { JERSEY_NUMBER } from "@/lib/jersey";

const socialLinks = [
  { href: "https://github.com/KubaRocks", label: "GitHub" },
  { href: "https://www.linkedin.com/in/kubaflorczuk/", label: "LinkedIn" },
  { href: "https://www.instagram.com/kuba_rocks/", label: "Instagram" },
  { href: "https://twitter.com/KubaRocks", label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-orange bg-deep py-9">
      <div className="wrap flex flex-wrap items-center justify-between gap-5">
        <div>
          <p className="font-display text-lg font-extrabold uppercase leading-none tracking-[0.16em]">
            Kuba Florczuk · No. {JERSEY_NUMBER}
          </p>
          <p className="mt-2.5 font-mono text-xs uppercase tracking-[0.14em] text-amber">
            &copy; {new Date().getFullYear()} kuba.rocks
          </p>
        </div>
        <ul aria-label="Social profiles" className="flex flex-wrap gap-2">
          {socialLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="me noopener noreferrer"
                className="block border border-line px-3.5 py-2.5 font-cond text-sm font-semibold uppercase leading-none tracking-[0.14em] text-chalk-muted no-underline transition-colors hover:border-orange hover:bg-orange/12 hover:text-chalk"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
