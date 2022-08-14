import React, { PropsWithChildren } from "react";
import { SectionTitleStyles } from "./styles";

export const SectionTitle: React.FC<PropsWithChildren> = ({ children }) => (
  <div>
    <SectionTitleStyles>{children}</SectionTitleStyles>
  </div>
);
