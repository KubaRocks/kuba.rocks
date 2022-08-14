import styled from "styled-components";

export const FunFactsSection = styled.section`
  margin: 3rem 0;
`;

export const FunFactsList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  padding: 0;
  margin: 3rem 0;

  @media (max-width: 920px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const FunFact = styled.li`
  border: 2px solid var(--veryLightGrey);
  border-radius: 1rem;
  display: grid;
  grid-template-rows: 3.3rem 5rem 1fr;
  justify-items: center;
  align-items: center;
  text-align: center;
  padding: 2.5rem 1rem 1rem;
  transition: all 0.2s ease-in-out;
  --colorIcon: var(--astral);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 1.2rem 1.7rem rgb(0 0 0 / 12%);
    --colorIcon: var(--astronaut);
  }

  h4 {
    font-size: 1.6rem;
  }

  span {
    font-size: 5rem;
    color: var(--veryLightGrey);
  }

  svg {
    color: var(--colorIcon);
    transition: all 0.2s ease-in-out;
  }
`;
