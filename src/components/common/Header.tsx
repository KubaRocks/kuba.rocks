import React from "react";
import { Navigation } from "@app/components/common/Navigation";
import styled from "styled-components";
import { Logo } from "@app/components/common/Logo";

const HeaderStyled = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 4rem;
  @media (max-width: 375px) {
    padding: 2rem;
  }
  @media (max-width: 475px) {
    grid-template-columns: 1fr;
  }
`;

export const Header = () => {
  return (
    <HeaderStyled>
      <Logo />
      <Navigation />
    </HeaderStyled>
  );
};
