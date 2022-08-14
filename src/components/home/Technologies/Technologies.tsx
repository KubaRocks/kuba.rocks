import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import {
  SiJavascript,
  SiNextdotjs,
  SiPhp,
  SiReact,
  SiSymfony,
  SiTypescript,
} from "react-icons/si";
import { IconContext } from "react-icons";
import { SectionTitle } from "@app/components/common/SectionTitle";
import { TechnologiesStyles } from "./styles";

export const Technologies = () => (
  <section>
    <SectionTitle>What I Use</SectionTitle>
    <TechnologiesStyles>
      <IconContext.Provider value={{ className: "icons" }}>
        <Technology title="PHP" icon={<SiPhp />}>
          My first weapon of choice when I seek for backend technology. PHP over
          the years become really neat tool to use with strict typing, good
          overall performance and great supporting community.
        </Technology>
        <Technology title="Symfony" icon={<SiSymfony />}>
          PHP&apos;s best side kick! Symfony become a really great and mature
          tool, with reliable release schedule and constant improvements.
        </Technology>
        <Technology title="JavaScript" icon={<SiJavascript />}>
          JavaScript used to be PHP&apos;s girlfriend, although things got
          complicated... JS started going to{" "}
          <abbr title="Single Page Application">SPA</abbr>s, meeting other
          people and now they barely talk to each other (except using APIs)...
          I&apos;m in this awkward position of knowing them for years, so I
          still hang out with them, but separately ;)
        </Technology>
        <Technology title="React" icon={<SiReact />}>
          If PHP has a side kick, JavaScript needs one too. On top of all the
          laughs that whenever you turn there will be new JavaScript framework
          created, React become really mature and fun library to use.
        </Technology>
        <Technology title="TypeScript" icon={<SiTypescript />}>
          TypeScript is JavaScript with syntax for types. TypeScript is a
          strongly typed programming language that builds on JavaScript, giving
          you better tooling at any scale.
        </Technology>
        <Technology title="NEXT.js" icon={<SiNextdotjs />}>
          The React Framework for Production - Next.js gives you the best
          developer experience with all the features you need for production:
          hybrid static & server rendering, TypeScript support, smart bundling,
          route pre-fetching, and more. No config needed.
        </Technology>
      </IconContext.Provider>
    </TechnologiesStyles>
  </section>
);

const TechnologyStyled = styled.div`
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 2rem;
  @media (max-width: 375px) {
    grid-template-columns: 5rem 1fr;
  }
  .icon {
    color: var(--astral);
    align-self: center;
  }
  h4 {
    font-size: 1.8rem;
  }
  p {
    line-height: 2rem;
    color: var(--grey);
    margin-top: 0.7rem;
  }
`;

const Technology: React.FC<{
  title: string;
  children: ReactNode;
  icon: ReactElement;
}> = ({ title, children, icon }) => (
  <TechnologyStyled>
    <div className="icon">{icon}</div>
    <div className="content">
      <h4>{title}</h4>
      <p>{children}</p>
    </div>
  </TechnologyStyled>
);
