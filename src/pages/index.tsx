import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "@app/utils/trpc";
import { Hero } from "@app/components/home/Hero";
import { TestimonialsList } from "@app/components/home/TestimonialsList";
import { ClientsCarousel } from "@app/components/home/ClientsCarousel";

const Home: NextPage = () => {
  const { data, isLoading, error } = trpc.useQuery(["question.getSession"]);
  console.log({ data, isLoading, error });
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
