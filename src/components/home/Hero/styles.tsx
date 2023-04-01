import styled from "styled-components";

export const HeroStyled = styled.section`
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 4rem;
  justify-items: center;
  align-items: center;
  padding: 6rem 12rem;
  margin-bottom: 4rem;

  @media (max-width: 1024px) {
    padding: 3rem 6rem;
  }

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 475px) {
    padding: 1.5rem 3rem;
  }

  h1 {
    font-size: 4.8rem;
    margin: 1rem 0 3rem 0;
    @media (max-width: 630px) {
      font-size: 4rem;
    }
    @media (max-width: 375px) {
      font-size: 3.5rem;
      margin: 1rem 0;
    }
  }

  h4 {
    color: var(--lightGrey);
    font-weight: 300;
    font-size: 1.6rem;
    @media (max-width: 375px) {
      font-size: 1.2rem;
    }
  }

  p {
    color: var(--grey);
    line-height: 2.5rem;
  }

  .hide {
    display: none;
  }
`;

export const PortraitStyled = styled.div<{ bg: string; bgHover?: string }>`
  width: 360px;
  height: 360px;
  border: 1.8rem solid white;
  border-radius: 50%;
  overflow: hidden;
  --cast: 2px;
  box-shadow: var(--cast) var(--cast) 15px rgba(0, 0, 0, 0.2);
  background: url(${(props) => props.bg}) no-repeat center center;
  background-size: cover;
  transition: background 0.3s ease-in-out;

  &:hover {
    ${({ bgHover }) =>
      Boolean(bgHover) &&
      `
      background: url(${bgHover}) no-repeat center center;
      background-size: cover;
    `})}
  }

  @media (max-width: 680px) {
    width: 250px;
    height: 250px;
    border-width: 1rem;
  }
`;
