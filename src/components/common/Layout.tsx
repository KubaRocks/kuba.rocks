import React, { PropsWithChildren } from "react";
import { Header } from "@app/components/common/Header";
import styled from "styled-components";
import { GlobalStyles } from "@app/styles/GlobalStyles";
import { Typography } from "@app/styles/Typography";
import { Footer } from "@app/components/common/Footer";
import { SEO } from "@app/components/common/SEO";

const ContentStyled = styled.div`
  margin: 0 auto;
  padding: 0 2rem 6rem;
  display: grid;
`;

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SEO />
      <GlobalStyles />
      <Typography />
      <Header />
      <ContentStyled>{children}</ContentStyled>
      <Footer />
    </>
  );
};
