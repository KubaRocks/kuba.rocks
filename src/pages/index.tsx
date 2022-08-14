import React from "react";
import type { GetStaticProps, NextPage } from "next";
import styled from "styled-components";
import safeJsonStringify from "safe-json-stringify";
import { Hero } from "@app/components/home/Hero";
import { Testimonials } from "@app/components/home/Testimonials";
import { ClientsCarousel } from "@app/components/home/ClientsCarousel";
import { FunFacts } from "@app/components/home/FunFacts";
import { Technologies } from "@app/components/home/Technologies";
import { prisma } from "@app/server/db/client";
import { useFunFacts } from "@app/hooks/useFunFacts";
import { Client, Testimonial } from ".prisma/client";
import { DAY_IN_SECONDS } from "@app/utils/dateHelpers";

const HomePageStyled = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto 6rem;
`;

const Home: NextPage<{
  testimonials: Testimonial[];
  clients: Client[];
}> = ({ testimonials, clients }) => {
  const { yearsOfExperience } = useFunFacts();
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
  const withoutHidden = { where: { hidden: false } };
  const testimonials = await prisma.testimonial.findMany(withoutHidden);
  const clients = await prisma.client.findMany(withoutHidden);

  return {
    props: {
      testimonials: JSON.parse(safeJsonStringify(testimonials)),
      clients: JSON.parse(safeJsonStringify(clients)),
    },
    revalidate: DAY_IN_SECONDS,
  };
};
