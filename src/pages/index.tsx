import type { GetStaticProps, NextPage } from "next";
import { Hero } from "@app/components/home/Hero";
import { TestimonialsList } from "@app/components/home/TestimonialsList";
import { ClientsCarousel } from "@app/components/home/ClientsCarousel";
import styled from "styled-components";
import { FunFacts } from "@app/components/home/FunFacts";
import { Technologies } from "@app/components/home/Technologies";
import React from "react";
import { AsyncReturnType } from "type-fest";

const HomePageStyled = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto 6rem;
`;

const getTestimonials = async () => {
  return prisma.testimonial.findMany({
    where: { hidden: false },
  });
};

const getClients = async () => {
  return prisma.client.findMany({
    where: { hidden: false },
  });
};

const Home: NextPage<{
  testimonials: AsyncReturnType<typeof getTestimonials>;
  clients: AsyncReturnType<typeof getClients>;
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
  const testimonials = (await getTestimonials()).map((testimonial) => ({
    ...testimonial,
    createdAt: testimonial.createdAt.toString(),
  }));
  const clients = (await getClients()).map((client) => ({
    ...client,
    createdAt: client.createdAt.toString(),
  }));
  const DAY_IN_SECONDS = 60 * 60 * 24;

  return {
    props: {
      testimonials,
      clients,
    },
    revalidate: DAY_IN_SECONDS,
  };
};
