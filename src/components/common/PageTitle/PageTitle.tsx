import React from "react";
import { PageTitleStyled } from "./styles";

export const PageTitle: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <PageTitleStyled>
    <h1>{title}</h1>
    {subtitle && <h4>{subtitle}</h4>}
  </PageTitleStyled>
);
