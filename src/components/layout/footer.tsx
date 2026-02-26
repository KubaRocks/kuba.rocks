import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  { href: "https://github.com/KubaRocks", icon: FaGithub, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/kubaflorczuk/",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://www.instagram.com/kuba_rocks/",
    icon: FaInstagram,
    label: "Instagram",
  },
  {
    href: "https://twitter.com/KubaRocks",
    icon: FaXTwitter,
    label: "X (Twitter)",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[var(--width-content)] flex-col items-center gap-4 px-6 py-8 md:flex-row md:justify-between">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} kuba.rocks
        </p>
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-muted hover:text-foreground transition-colors"
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
