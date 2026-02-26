import Image from "next/image";
import { getClients } from "@/lib/data";

export function Clients() {
  const clients = getClients();

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <div className="mb-12">
          <hr className="divider-ember mb-6" />
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">
            Companies I&apos;ve Worked With
          </h2>
        </div>
        <div className="grid grid-cols-3 items-center gap-8 md:grid-cols-4 lg:grid-cols-6">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
