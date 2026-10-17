import Link from "next/link";

export function DraftCta() {
  return (
    <section
      aria-labelledby="draft-title"
      className="relative overflow-clip bg-navy bg-[radial-gradient(700px_400px_at_50%_50%,color-mix(in_srgb,var(--color-orange)_16%,transparent),transparent_70%)] py-[clamp(64px,8vw,110px)] text-center before:absolute before:inset-x-0 before:top-1/2 before:border-t-2 before:border-chalk/9"
    >
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="court left-1/2 top-1/2 w-[min(760px,150vw)] -translate-x-1/2 -translate-y-1/2 stroke-chalk/11 [stroke-width:0.6]"
      >
        <circle cx="100" cy="100" r="98" />
        <circle cx="100" cy="100" r="34" />
      </svg>
      <div className="wrap relative">
        <p className="inline-flex font-mono text-xs font-bold uppercase leading-none tracking-[0.2em]">
          <span className="border border-amber bg-amber px-3.5 py-[9px] text-navy">
            Final
          </span>
          <span className="border border-line px-3.5 py-[9px]">On the clock</span>
        </p>
        <h2
          id="draft-title"
          className="mt-[26px] font-display text-[23vw] font-black uppercase leading-[0.8] sm:text-[clamp(4rem,13vw,11rem)]"
        >
          Book a <span className="block text-orange">tryout</span>
        </h2>
        <p className="mx-auto mt-[26px] max-w-[36em] text-lg text-chalk-muted">
          Got a roster spot, a product that needs shipping, or a team that needs
          a lead? Send me the details and I&apos;ll get back to you.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <Link href="/contact" className="btn btn-primary px-[34px] py-5 text-[20px]">
            Draft Kuba <span className="arrow" aria-hidden="true">&rarr;</span>
          </Link>
          <Link href="/resume" className="btn">
            Read the full log
          </Link>
        </div>
      </div>
    </section>
  );
}
