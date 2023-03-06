import React, { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import {
  SiJavascript,
  SiNextdotjs,
  SiReact,
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
        <Technology title="TypeScript" icon={<SiTypescript />}>
          TypeScript is JavaScript with syntax for types. TypeScript is a
          strongly typed programming language that builds on JavaScript, giving
          you better tooling at any scale.
        </Technology>
        <Technology title="React" icon={<SiReact />}>
          React is a free and open-source front-end JavaScript library for
          building user interfaces based on components. It is maintained by Meta
          and a community of individual developers and companies. React can be
          used as a base in the development of single-page, mobile, or
          server-rendered applications with frameworks like Next.js.
        </Technology>
        <Technology title="JavaScript" icon={<SiJavascript />}>
          JavaScript used to be PHP&apos;s best friend, although things got
          complicated... JS started going to{" "}
          <abbr title="Single Page Application">SPA</abbr>s, meeting other
          people and now they barely talk to each other (except using APIs)...
          I&apos;m in this awkward position of knowing them for years, so I
          still hang out with them, but separately ;)
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
