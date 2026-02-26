import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactMap } from "@/components/contact/map";
import { EmailLink } from "@/components/contact/email-link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Contact",
};

const socialLinks = [
  { href: "https://github.com/KubaRocks", icon: FaGithub, label: "KubaRocks" },
  {
    href: "https://www.linkedin.com/in/kubaflorczuk/",
    icon: FaLinkedin,
    label: "kubaflorczuk",
  },
  {
    href: "https://twitter.com/KubaRocks",
    icon: FaXTwitter,
    label: "@KubaRocks",
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* Full-width map — same config as previous site */}
      <ContactMap />

      <div className="py-20 md:py-32">
        <div className="mx-auto max-w-[var(--width-content)] px-6">
          <div className="mb-16 max-w-2xl">
            <hr className="divider-accent mb-6" />
            <h1 className="font-display text-5xl tracking-tight md:text-6xl">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Have a project in mind or want to say hello? Drop me a message and
              I&apos;ll get back to you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <ContactForm />

            <div className="space-y-10">
              <h2 className="text-2xl font-bold tracking-tight">
                Other ways to reach me
              </h2>
              <div className="space-y-5">
                {/* Email assembled client-side to prevent bot scraping */}
                <EmailLink />

                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 text-muted transition-colors hover:text-foreground"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors group-hover:border-accent group-hover:text-accent">
                      <link.icon size={18} />
                    </span>
                    <span className="text-sm">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
