import Script from "next/script";
import { env } from "@app/env/client.mjs";

export const GoogleAnalytics = () => {
  const gTag = env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

  if (!Boolean(gTag)) {
    return null;
  }

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${gTag}`}
      />

      <Script strategy="lazyOnload" id="google-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gTag}', {
            page_path: window.location.pathname,
            });
        `}
      </Script>
    </>
  );
};
