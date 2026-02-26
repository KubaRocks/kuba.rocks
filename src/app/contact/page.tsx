import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export const metadata: Metadata = {
  title: "Contact",
};

const contactLinks = [
  { href: "mailto:hello@kuba.rocks", icon: MdEmail, label: "hello@kuba.rocks" },
  { href: "https://github.com/KubaRocks", icon: FaGithub, label: "KubaRocks" },
  { href: "https://www.linkedin.com/in/kubaflorczuk/", icon: FaLinkedin, label: "kubaflorczuk" },
  { href: "https://twitter.com/KubaRocks", icon: FaXTwitter, label: "@KubaRocks" },
];

export default function ContactPage() {
  return (
    <main className="py-16 md:py-24">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-xl text-muted mb-16 max-w-2xl">
          Have a project in mind or want to say hello? Drop me a message.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ContactForm />

          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Other ways to reach me</h2>
            <div className="space-y-4">
              {contactLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted hover:text-foreground transition-colors"
                >
                  <link.icon size={20} />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
