import React, { PropsWithChildren } from "react";
import { Header } from "@app/components/common/Header";
import { SEO } from "@app/components/common/SEO";
import { GoogleAnalytics } from "@app/components/common/GoogleAnalytics";
import { Footer } from "@app/components/common/Footer";
import { ContentStyled } from "./styles";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <GoogleAnalytics />
      <SEO />
      <Header />
      <ContentStyled>{children}</ContentStyled>
      <Footer />
    </>
  );
};
