import React from "react";
import { BurgerStyled } from "./styles";

export const Burger: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => (
  <BurgerStyled open={open} onClick={() => setOpen(!open)}>
    <span />
    <span />
  </BurgerStyled>
);
