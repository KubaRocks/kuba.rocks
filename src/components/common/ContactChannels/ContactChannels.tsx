import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IconContext } from "react-icons";
import React, { ReactElement } from "react";
import { ListStyled } from "./styles";

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
