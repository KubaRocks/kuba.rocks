import { IconContext } from "react-icons";
import { AiOutlineGithub } from "react-icons/ai";
import { BiCoffeeTogo } from "react-icons/bi";
import { BsAward, BsWatch } from "react-icons/bs";
import { useFunFacts } from "@app/hooks/useFunFacts";
import { SectionTitle } from "@app/components/common/SectionTitle";
import { FunFact, FunFactsList, FunFactsSection } from "./styles";

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
