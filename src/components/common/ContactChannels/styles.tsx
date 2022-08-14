import styled from "styled-components";

export const ListStyled = styled.ul`
  list-style: none;
  justify-self: start;
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap: 2rem;
  padding: 0 2rem;
  line-height: 2.4rem;

  @media (max-width: 550px) {
    padding: 0;
  }

  .icons {
    font-size: 2rem;
  }
`;
