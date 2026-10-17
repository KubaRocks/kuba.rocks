import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactMap } from "@/components/contact/map";
import { EmailLink } from "@/components/contact/email-link";
import { CourtLines } from "@/components/ui/court-lines";
import { SectionHead } from "@/components/ui/section-head";

export const metadata: Metadata = {
  title: "Contact",
};

const socialLinks = [
  { href: "https://github.com/KubaRocks", network: "GitHub", label: "KubaRocks" },
  {
    href: "https://www.linkedin.com/in/kubaflorczuk/",
    network: "LinkedIn",
    label: "kubaflorczuk",
  },
  { href: "https://twitter.com/KubaRocks", network: "Twitter", label: "@KubaRocks" },
];

const rowClass =
  "flex flex-col gap-1 border-b border-line py-4 pl-0 no-underline transition-[padding,box-shadow,color] hover:pl-4 hover:text-chalk hover:shadow-[inset_4px_0_0_var(--color-orange)]";

export default function ContactPage() {
  return (
    <main id="main">
      <section
        aria-labelledby="contact-title"
        className="relative overflow-clip bg-[radial-gradient(1000px_500px_at_80%_0%,color-mix(in_srgb,var(--color-orange)_10%,transparent),transparent_60%)] py-[clamp(48px,7vw,96px)]"
      >
        <CourtLines className="-right-[10%] -top-[60px] w-[min(900px,120vw)]" />
        <div className="wrap relative">
          <p className="eyebrow mb-6 animate-rise">
            Final <span aria-hidden="true">·</span> On the clock
          </p>
          <SectionHead
            as="h1"
            id="contact-title"
            quarter="Final"
            quarterLabel="TRYOUT"
            title="Book a tryout"
            intro="Have a project in mind, a roster spot to fill, or just want to say hello? Drop me a message and I'll get back to you."
          />

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            <ContactForm />

            <div>
              <h2 className="font-display text-[clamp(28px,3vw,38px)] font-black uppercase leading-[0.9] tracking-[0.02em]">
                Other ways to reach me
              </h2>
              <ul className="mt-6 border-t-[3px] border-chalk">
                <li>
                  <EmailLink className={rowClass} />
                </li>
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className={rowClass}
                    >
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-orange">
                        {link.network}
                      </span>
                      <span className="font-cond text-xl font-semibold tracking-[0.04em]">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ContactMap />
    </main>
  );
}
