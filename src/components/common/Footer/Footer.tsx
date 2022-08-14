import { ContactChannels } from "@app/components/common/ContactChannels";
import { FooterStyled } from "./styles";

export const Footer = () => (
  <FooterStyled>
    <nav>
      <ContactChannels />
    </nav>
    <div>
      &copy; {new Date().getFullYear()} <span>by Kuba Florczuk</span>
    </div>
  </FooterStyled>
);
