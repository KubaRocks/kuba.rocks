import Image from "next/image";
import { getClients } from "@/lib/data";
import { SectionHead } from "@/components/ui/section-head";

export function Sponsors() {
  const clients = getClients();

  return (
    <section aria-labelledby="teams-title" className="py-[clamp(64px,8vw,110px)]">
      <div className="wrap">
        <SectionHead
          id="teams-title"
          quarter="OT"
          quarterLabel="EXTRA"
          title="Teams & sponsors"
          intro="Brands and companies I've built for, played for, or both."
        />
        <ul className="grid grid-cols-3 border-l border-t border-line sm:grid-cols-5 xl:grid-cols-7">
          {clients.map((client) => (
            <li
              key={client.name}
              className="group grid h-[clamp(66px,6.4vw,92px)] place-items-center border-b border-r border-line p-2.5 transition-colors odd:bg-deep/45 hover:bg-orange/14 sm:p-3.5"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={112}
                height={48}
                className="logo-chalk h-auto max-h-[42%] w-auto max-w-[78%]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
