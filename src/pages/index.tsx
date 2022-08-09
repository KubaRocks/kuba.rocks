import type { NextPage } from "next";
import { Hero } from "@app/components/home/Hero";
import { TestimonialsList } from "@app/components/home/TestimonialsList";
import { ClientsCarousel } from "@app/components/home/ClientsCarousel";
import styled from "styled-components";
import { FunFacts } from "@app/components/home/FunFacts";
import { Technologies } from "@app/components/home/Technologies";

const HomePageStyled = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto 6rem;
`;

const Home: NextPage = () => {
  return (
    <HomePageStyled>
      <Hero />
      <Technologies />
      <TestimonialsList />
      <ClientsCarousel />
      <FunFacts />
    </HomePageStyled>
  );
};

export default Home;
