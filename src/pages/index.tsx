import type { GetStaticProps, NextPage } from "next";
import { Hero } from "@app/components/home/Hero";
import { TestimonialsList } from "@app/components/home/TestimonialsList";
import { ClientsCarousel } from "@app/components/home/ClientsCarousel";
import styled from "styled-components";
import { FunFacts } from "@app/components/home/FunFacts";
import { Technologies } from "@app/components/home/Technologies";
import React from "react";
import { prisma } from "@app/server/db/client";
import safeJsonStringify from "safe-json-stringify";
import { Client, Testimonial } from ".prisma/client";

const HomePageStyled = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto 6rem;
`;

const Home: NextPage<{
  testimonials: Testimonial[];
  clients: Client[];
}> = ({ testimonials, clients }) => {
  return (
    <HomePageStyled>
      <Hero />
      <Technologies />
      <TestimonialsList testimonials={testimonials} />
      <ClientsCarousel clients={clients} />
      <FunFacts />
    </HomePageStyled>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const withoutHidden = { where: { hidden: false } };
  const testimonials = prisma.testimonial.findMany(withoutHidden);
  const clients = prisma.client.findMany(withoutHidden);
  const DAY_IN_SECONDS = 60 * 60 * 24;

  return {
    props: {
      testimonials: JSON.parse(safeJsonStringify(testimonials)),
      clients: JSON.parse(safeJsonStringify(clients)),
    },
    revalidate: DAY_IN_SECONDS,
  };
};
