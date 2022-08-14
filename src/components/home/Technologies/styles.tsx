import styled from "styled-components";

export const TechnologiesStyles = styled.div`
  margin: 3rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
  .icons {
    font-size: 6rem;
    @media (max-width: 375px) {
      font-size: 5rem;
    }
  }
`;
