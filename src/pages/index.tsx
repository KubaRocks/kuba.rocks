import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "@app/utils/trpc";
import { Hero } from "@app/components/home/Hero";
import { TestimonialsList } from "@app/components/home/TestimonialsList";

const Home: NextPage = () => {
  const { data, isLoading, error } = trpc.useQuery(["question.getSession"]);
  console.log({ data, isLoading, error });
  return (
    <>
      <Head>
        <title>kuba.rocks - full-stack developer</title>
        <meta
          name="description"
          content="Full-Stack Developer - PHP, TypeScript, symfony, React"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Hero />
        <h2>What I use</h2>

        <h2>Testimonials</h2>
        <TestimonialsList />

        <h2>Clients</h2>

        <h2>Fun Facts</h2>
      </div>
    </>
  );
};

export default Home;
