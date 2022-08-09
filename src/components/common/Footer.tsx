import styled from "styled-components";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IconContext } from "react-icons";
import React, { ReactElement } from "react";

const FooterStyled = styled.footer`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  margin: 6rem 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 0 2rem;
  color: var(--grey);
  font-size: 1.4rem;
  border-top: 2px solid var(--almostWhiteGrey);
  background: #fdfdfd;

  @media (max-width: 375px) {
    padding: 0 1rem;
  }

  nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  ul {
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
  }

  .icons {
    font-size: 2rem;
  }

  div {
    justify-self: end;
  }

  span {
    @media (max-width: 320px) {
      display: none;
    }
  }
`;

export const Footer = () => (
  <FooterStyled>
    <nav>
      <IconContext.Provider value={{ className: "icons" }}>
        <ul>
          <li>
            <FooterLink
              href="https://twitter.com/KubaRocks"
              icon={<FaTwitter />}
            />
          </li>
          <li>
            <FooterLink
              href="https://www.instagram.com/kuba_rocks/"
              icon={<FaInstagram />}
            />
          </li>
          <li>
            <FooterLink
              href="https://www.linkedin.com/in/kubaflorczuk/"
              icon={<FaLinkedin />}
            />
          </li>
          <li>
            <FooterLink
              href={"https://github.com/KubaRocks"}
              icon={<FaGithub />}
            />
          </li>
        </ul>
      </IconContext.Provider>
    </nav>
    <div>
      &copy; {new Date().getFullYear()} <span>by Kuba Florczuk</span>
    </div>
  </FooterStyled>
);

const FooterLink: React.FC<{ href: string; icon: ReactElement }> = ({
  href,
  icon,
}) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {icon}
    </a>
  );
};
