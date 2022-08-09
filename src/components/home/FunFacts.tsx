import styled from "styled-components";
import { SectionTitle } from "@app/components/common/SectionTitle";
import { AiOutlineGithub } from "react-icons/ai";
import { BiCoffeeTogo } from "react-icons/bi";
import { BsAward, BsWatch } from "react-icons/bs";
import { useFunFacts } from "@app/useFunFacts";
import { IconContext } from "react-icons";

const FunFactsSection = styled.section`
  margin: 3rem 0;
`;

const FunFactsList = styled.ul`
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

const FunFact = styled.li`
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

export const FunFacts = () => {
  const { yearsOfExperience, workingHours, coffeeConsumed, gitHubRepos } =
    useFunFacts();

  return (
    <FunFactsSection>
      <SectionTitle>Fun Facts</SectionTitle>
      <IconContext.Provider value={{ size: "3.3rem" }}>
        <FunFactsList>
          <FunFact>
            <BsAward size="3.3rem" />
            <h4>Years of Experience</h4>
            <span>{yearsOfExperience}</span>
          </FunFact>
          <FunFact>
            <BsWatch />
            <h4>Working Hours</h4>
            <span>{workingHours}</span>
          </FunFact>
          <FunFact>
            <AiOutlineGithub />
            <h4>Repositories</h4>
            <span>{gitHubRepos}</span>
          </FunFact>
          <FunFact>
            <BiCoffeeTogo />
            <h4>Coffee Consumed</h4>
            <span>{coffeeConsumed}</span>
          </FunFact>
        </FunFactsList>
      </IconContext.Provider>
    </FunFactsSection>
  );
};
