import Image from "next/image";
import { getClients } from "@/lib/data";

export function Clients() {
  const clients = getClients();

  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <div className="mb-12">
          <hr className="divider-accent mb-6" />
          <h2 className="text-3xl font-bold tracking-tight">
            Companies I&apos;ve Worked With
          </h2>
        </div>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="animate-marquee flex w-max items-center gap-24 py-4">
          {/* First set */}
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex h-12 w-28 shrink-0 items-center justify-center opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 dark:invert dark:opacity-60"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={112}
                height={48}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {clients.map((client) => (
            <div
              key={`dup-${client.name}`}
              className="flex h-12 w-28 shrink-0 items-center justify-center opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 dark:invert dark:opacity-60"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={112}
                height={48}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
