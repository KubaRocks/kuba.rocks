import React from "react";
import { Navigation } from "@app/components/common/Navigation";
import { Logo } from "@app/components/common/Logo";

export const Header = () => {
  return (
    <header>
      <Logo />
      <Navigation />
    </header>
  );
};
