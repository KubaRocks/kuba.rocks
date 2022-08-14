import React from "react";
import { useRouter } from "next/router";
import { LogoStyled, SymbolStyled, TitleStyled } from "./styles";

export const Logo = () => {
  const router = useRouter();

  return (
    <LogoStyled onClick={() => router.push("/")}>
      <SymbolStyled>K</SymbolStyled>
      <TitleStyled>
        <strong>Kuba</strong>.rocks
      </TitleStyled>
    </LogoStyled>
  );
};
