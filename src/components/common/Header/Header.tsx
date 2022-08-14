import { Navigation } from "@app/components/common/Navigation";
import { Logo } from "@app/components/common/Logo";
import { HeaderStyled } from "./styles";

export const Header = () => {
  return (
    <HeaderStyled>
      <Logo />
      <Navigation />
    </HeaderStyled>
  );
};
