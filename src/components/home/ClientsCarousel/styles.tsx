import styled, { keyframes } from "styled-components";

export const ClientsSection = styled.section`
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

export const ClientsStyled = styled.div`
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

export const marquee = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

export const ClientsList = styled.ul`
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

export const ClientStyled = styled.li`
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
