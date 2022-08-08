import type { NextPage } from "next";
import { Hero } from "@app/components/home/Hero";
import { TestimonialsList } from "@app/components/home/TestimonialsList";
import { ClientsCarousel } from "@app/components/home/ClientsCarousel";
import styled from "styled-components";

const HomePageStyled = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto 6rem;
`;

const Home: NextPage = () => {
  return (
    <HomePageStyled>
      <div>
        <Hero />
        <h2>What I use</h2>

        <TestimonialsList />
        <ClientsCarousel />

        <h2>Fun Facts</h2>
      </div>
    </HomePageStyled>
  );
};

export default Home;
