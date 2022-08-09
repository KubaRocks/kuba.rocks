import { trpc } from "@app/utils/trpc";
import styled, { keyframes } from "styled-components";
import { SectionTitle } from "@app/components/common/SectionTitle";
import React from "react";

const ClientsSection = styled.section`
  margin: 4rem 0;
  max-width: var(--maxWidth);
  @media (min-width: 550px) {
    width: 100%;
  }
  // temporary fix because it's causing the site to scale while present in lower resolutions...
  @media (max-width: 1280px) {
    display: none;
  }
`;

const ClientsStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8rem;
  margin: 2.5rem 0;
  overflow: hidden;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    width: 2rem;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.1) 0, #fff 100%);
  }
  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    width: 2rem;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.1) 0,
      #fff 100%
    );
  }
`;

const marquee = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const ClientsList = styled.ul`
  display: flex;
  list-style: none;
  margin: 3rem 0 0;
  padding: 0;
  animation: ${marquee} 90s linear infinite;
  gap: 8rem;
  ${ClientsStyled}:hover & {
    animation-play-state: paused;
  }
`;

export const ClientsCarousel = () => {
  const { data, isLoading } = trpc.useQuery(["clients.getAll"]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <ClientsSection>
      <SectionTitle>Clients</SectionTitle>
      <ClientsStyled>
        <ClientsList>
          {data &&
            data.map((client) => (
              <Client key={client.id} logo={client.logo} name={client.name} />
            ))}
        </ClientsList>
        {/* Stupid fix to make it infinite */}
        <ClientsList>
          {data &&
            data.map((client) => (
              <Client key={client.id} logo={client.logo} name={client.name} />
            ))}
        </ClientsList>
      </ClientsStyled>
    </ClientsSection>
  );
};

const ClientStyled = styled.li`
  opacity: 0.5;
  transition: all 0.3s ease-in-out;
  img {
    color: #eee;
    max-width: none;
    height: 25px;
  }
  &:hover {
    opacity: 1;
  }
`;

const Client: React.FC<{ logo: string; name: string }> = ({ logo, name }) => (
  <ClientStyled>
    <img src={logo} alt={name} />
  </ClientStyled>
);
