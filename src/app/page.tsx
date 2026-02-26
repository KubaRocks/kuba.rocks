import { Hero } from "@/components/home/hero";
import { Technologies } from "@/components/home/technologies";
import { Testimonials } from "@/components/home/testimonials";
import { Clients } from "@/components/home/clients";
import { FunFacts } from "@/components/home/fun-facts";

export default function Home() {
  return (
    <main>
      <Hero />
      <Technologies />
      <Testimonials />
      <Clients />
      <FunFacts />
    </main>
  );
}
