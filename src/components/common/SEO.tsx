import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import logo from "public/assets/logo.png";

export const SEO = () => {
  const { asPath } = useRouter();

  const seo = {
    title: "kuba.rocks - full-stack developer",
    description: "Full-Stack Developer - PHP, TypeScript, symfony, React",
    logo,
  };

  return (
    <Head>
      <title>{seo.title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
        key="viewport"
      />
      <meta charSet="utf-8" />
      <meta name="description" content={seo.description} key="description" />
      {/* Fav Icons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" type="image/ico" href="/favicon.ico" />
      <link
        rel="alternate icon"
        type="image/x-icon"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="alternate icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        type="image/png"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link rel="manifest" href="/favicons/site.webmanifest" />

      {/* Open Graph */}
      <meta property="og:url" content={asPath} />
      <meta property="og:image" content={logo.src} key="ogimage" />
      <meta property="og:title" content={seo.title} key="ogtitle" />
      <meta property="og:site_name" content={seo.title} key="ogsitename" />
      <meta property="og:description" content={seo.description} key="ogdesc" />
    </Head>
  );
};
