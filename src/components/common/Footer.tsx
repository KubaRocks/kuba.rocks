import styled from "styled-components";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IconContext } from "react-icons";

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
            <a
              href="https://twitter.com/KubaRocks"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/kuba_rocks/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/kubaflorczuk/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/KubaRocks"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
          </li>
        </ul>
      </IconContext.Provider>
    </nav>
    <div>
      &copy; {new Date().getFullYear()} <span>by Kuba Florczuk</span>
    </div>
  </FooterStyled>
);
