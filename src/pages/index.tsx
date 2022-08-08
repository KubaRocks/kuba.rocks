import type { NextPage } from "next";
import { Hero } from "@app/components/home/Hero";
import { TestimonialsList } from "@app/components/home/TestimonialsList";
import { ClientsCarousel } from "@app/components/home/ClientsCarousel";

const Home: NextPage = () => {
  return (
    <>
      <div>
        <Hero />
        <h2>What I use</h2>

        <TestimonialsList />
        <ClientsCarousel />

        <h2>Fun Facts</h2>
      </div>
    </>
  );
};

export default Home;
