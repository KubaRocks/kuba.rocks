import Image from "next/image";
import { getTestimonials } from "@/lib/data";
import { CourtLines } from "@/components/ui/court-lines";
import { SectionHead } from "@/components/ui/section-head";

export function ScoutingReports() {
  const testimonials = getTestimonials();

  return (
    <section
      aria-labelledby="scout-title"
      className="relative overflow-clip bg-deep py-[clamp(64px,8vw,110px)]"
    >
      <CourtLines className="-bottom-[200px] -left-[300px] w-[900px] rotate-90 opacity-70" />
      <div className="wrap relative">
        <SectionHead
          id="scout-title"
          quarter="4th"
          quarterLabel="QTR"
          title="Scouting reports"
          intro="Filed by people who shared a locker room with him."
        />
        <div className="grid grid-cols-1 gap-[clamp(24px,3vw,40px)] md:grid-cols-2">
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              className="report px-[clamp(20px,2.4vw,32px)] pb-7 pt-[26px]"
            >
              <span
                aria-hidden="true"
                className="absolute right-[18px] top-[22px] rotate-[8deg] border-2 border-stamp px-2 py-1.5 font-mono text-[11px] font-bold uppercase leading-none tracking-[0.16em] text-stamp opacity-90 max-sm:hidden"
              >
                Report {String(i + 1).padStart(2, "0")}
              </span>
              <div className="grid grid-cols-[64px_1fr] items-center gap-4 border-b-2 border-paper-ink pb-4">
                <Image
                  src={t.photo}
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 border-2 border-paper-ink object-cover grayscale contrast-[1.05]"
                />
                <p className="font-mono text-xs uppercase leading-[1.6] tracking-[0.06em] text-paper-muted">
                  <b className="block font-display text-[22px] font-extrabold leading-[1.05] tracking-[0.04em] text-paper-ink">
                    {t.name}
                  </b>
                  Scout · {t.title}
                </p>
              </div>
              <p className="mb-2.5 mt-[18px] font-display text-[clamp(24px,2.4vw,30px)] font-black uppercase leading-none text-paper-ink">
                <span className="mb-2 block font-mono text-[11px] font-bold leading-none tracking-[0.18em] text-[#B8460C]">
                  Key note
                </span>
                {t.headline}
              </p>
              <blockquote className="text-base leading-[1.75] text-[#26303F]">
                <p>&ldquo;{t.content}&rdquo;</p>
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
