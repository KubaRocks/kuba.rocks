import Link from "next/link";
import React from "react";
import styled from "styled-components";

const LogoStyled = styled.div`
  justify-self: start;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 44px 1fr;
  justify-items: center;
  align-items: center;
  cursor: pointer;
`;

const SymbolStyled = styled.div`
  width: 44px;
  height: 44px;
  border: 1rem solid white;
  border-radius: 50%;
  background-color: var(--astral);
  font-weight: 800;
  font-size: 28px;
  line-height: 44px;
  color: white;
  text-align: center;
`;

const TitleStyled = styled.h1`
  font-weight: normal;
  font-size: 2rem;
  strong {
    font-weight: 600;
  }
`;

export const Logo = () => {
  return (
    <LogoStyled>
      <Link href="/">
        <a>
          <SymbolStyled>K</SymbolStyled>
          <TitleStyled>
            <strong>Kuba</strong>.rocks
          </TitleStyled>
        </a>
      </Link>
    </LogoStyled>
  );
};
