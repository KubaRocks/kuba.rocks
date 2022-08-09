import React, { PropsWithChildren } from "react";
import Head from "next/head";
import { Header } from "@app/components/common/Header";
import styled from "styled-components";
import { GlobalStyles } from "@app/styles/GlobalStyles";
import { Typography } from "@app/styles/Typography";
import { Footer } from "@app/components/common/Footer";

const ContentStyled = styled.div`
  margin: 0 auto;
  padding: 0 2rem 6rem;
  display: grid;
`;

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>kuba.rocks - full-stack developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Full-Stack Developer - PHP, TypeScript, symfony, React"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyles />
      <Typography />
      <Header />
      <ContentStyled>{children}</ContentStyled>
      <Footer />
    </>
  );
};
