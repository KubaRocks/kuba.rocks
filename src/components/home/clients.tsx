import Image from "next/image";
import { getClients } from "@/lib/data";

export function Clients() {
  const clients = getClients();

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <h2 className="text-3xl font-bold mb-12">Companies I&apos;ve Worked With</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
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
