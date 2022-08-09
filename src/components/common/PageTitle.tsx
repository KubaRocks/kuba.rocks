import React from "react";
import styled from "styled-components";

const PageTitleStyled = styled.div`
  padding: 6rem;
  background: var(--almostWhiteGrey);
  border-top: 2px solid var(--veryLightGrey);
  border-bottom: 2px solid var(--veryLightGrey);
  margin-bottom: 4rem;
  margin-left: -2rem;
  margin-right: -2rem;
  position: relative;
  @media (max-width: 768px) {
    padding: 4rem;
  }
  h1 {
    font-size: 4.4rem;
  }
  h4 {
    font-weight: 400;
    font-size: 1.4rem;
    color: #aaa;
    position: absolute;
    top: 2rem;
    right: 7rem;
    @media (max-width: 768px) {
      position: unset;
    }
  }
`;

export const PageTitle: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <PageTitleStyled>
    <h1>{title}</h1>
    {subtitle && <h4>{subtitle}</h4>}
  </PageTitleStyled>
);
