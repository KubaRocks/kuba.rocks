import styled from "styled-components";

export const HeaderStyled = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 4rem;
  @media (max-width: 375px) {
    padding: 2rem;
  }
  @media (max-width: 475px) {
    grid-template-columns: 1fr;
  }
`;
