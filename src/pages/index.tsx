import React from "react";
import type { GetStaticProps, NextPage } from "next";
import styled from "styled-components";
import { Hero } from "@app/components/home/Hero";
import { Testimonials } from "@app/components/home/Testimonials";
import { ClientsCarousel } from "@app/components/home/ClientsCarousel";
import { FunFacts } from "@app/components/home/FunFacts";
import { Technologies } from "@app/components/home/Technologies";
import { useFunFacts } from "@app/hooks/useFunFacts";
import { createSSGHelpers } from "@trpc/react/ssg";
import superjson from "superjson";
import { appRouter } from "@app/server/router";
import { createContext } from "@app/server/router/context";
import { trpc } from "@app/utils/trpc";
import { DAY_IN_SECONDS } from "@app/utils/dateHelpers";

const HomePageStyled = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto 6rem;
`;

const Home: NextPage = () => {
  const { yearsOfExperience } = useFunFacts();
  const { data: testimonials } = trpc.useQuery(["testimonials.getAll"]);
  const { data: clients } = trpc.useQuery(["clients.getAll"]);

  // just to make TypeScript happy, as this will never happen due to static pre-render
  if (!testimonials || !clients) return null;

  return (
    <HomePageStyled>
      <Hero
        title="Kuba Florczuk"
        subtitle="Full-Stack Developer, Team Leader"
        content={`I'm a Full-Stack Developer and Team Leader based in Warsaw,
          Poland, with ${yearsOfExperience} years of commercial experience in Web
          Development and Team Management. Also a husband and father of one
          sweet two-year-old girl. Huge fan of basketball and comics.`}
      />
      <Technologies />
      <Testimonials testimonials={testimonials} />
      <ClientsCarousel clients={clients} />
      <FunFacts />
    </HomePageStyled>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });

  await ssg.fetchQuery("testimonials.getAll");
  await ssg.fetchQuery("clients.getAll");

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: DAY_IN_SECONDS,
  };
};
