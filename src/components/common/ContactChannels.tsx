import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IconContext } from "react-icons";
import React, { ReactElement } from "react";
import styled from "styled-components";

const ListStyled = styled.ul`
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

export const ContactChannels = () => {
  return (
    <IconContext.Provider value={{ className: "icons" }}>
      <ListStyled className="socialLinks">
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
      </ListStyled>
    </IconContext.Provider>
  );
};

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
