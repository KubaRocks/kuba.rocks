import React, { PropsWithChildren } from "react";
import Head from "next/head";

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
      <main>{children}</main>
      <footer></footer>
    </>
  );
};
