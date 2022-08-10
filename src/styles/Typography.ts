import { createGlobalStyle } from "styled-components";

const PoppinsWoff = "/assets/fonts/Poppins-Regular.woff2";
const PoppinsWoff2 = "/assets/fonts/Poppins-Regular.woff";
const PoppinsLightWoff = "/assets/fonts/Poppins-Light.woff2";
const PoppinsLightWoff2 = "/assets/fonts/Poppins-Light.woff";
const PoppinsItalicWoff = "/assets/fonts/Poppins-Italic.woff";
const PoppinsItalicWoff2 = "/assets/fonts/Poppins-Italic.woff2";
const PoppinsSemiBoldWoff = "/assets/fonts/Poppins-SemiBold.woff";
const PoppinsSemiBoldWoff2 = "/assets/fonts/Poppins-SemiBold.woff2";
const PoppinsSemiBoldItalicWoff = "/assets/fonts/Poppins-SemiBoldItalic.woff";
const PoppinsSemiBoldItalicWoff2 = "/assets/fonts/Poppins-SemiBoldItalic.woff2";
const PoppinsBoldWoff = "/assets/fonts/Poppins-Bold.woff";
const PoppinsBoldWoff2 = "/assets/fonts/Poppins-Bold.woff2";
const PoppinsBoldItalicWoff = "/assets/fonts/Poppins-BoldItalic.woff";
const PoppinsBoldItalicWoff2 = "/assets/fonts/Poppins-BoldItalic.woff2";
const PoppinsExtraBoldWoff = "/assets/fonts/Poppins-ExtraBold.woff";
const PoppinsExtraBoldWoff2 = "/assets/fonts/Poppins-ExtraBold.woff2";
const PoppinsExtraBoldItalicWoff = "/assets/fonts/Poppins-ExtraBoldItalic.woff";
const PoppinsExtraBoldItalicWoff2 =
  "/assets/fonts/Poppins-ExtraBoldItalic.woff2";

export const Typography = createGlobalStyle`
  @font-face {
    font-family: 'Poppins';
    src: url(/assets/fonts/Poppins-Regular.woff2) format('woff2'),
    url(/assets/fonts/Poppins-Regular.woff2) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Poppins';
    src: url(/assets/fonts/Poppins-Italic.woff2) format('woff2'),
    url(/assets/fonts/Poppins-Italic.woff) format('woff');
    font-weight: normal;
    font-style: italic;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'Poppins';
    src: url(/assets/fonts/Poppins-SemiBold.woff2) format('woff2'),
    url(/assets/fonts/Poppins-SemiBold.woff) format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Poppins';
    src: url(/assets/fonts/Poppins-BoldItalic.woff2) format('woff2'),
    url(/assets/fonts/Poppins-BoldItalic.woff) format('woff');
    font-weight: bold;
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: 'Poppins';
    src: url(/assets/fonts/Poppins-SemiBold.woff2) format('woff2'),
    url(/assets/fonts/Poppins-SemiBold.woff) format('woff');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Poppins';
    src: url(/assets/fonts/Poppins-SemiBoldItalic.woff2) format('woff2'),
    url(/assets/fonts/Poppins-SemiBoldItalic.woff) format('woff');
    font-weight: 600;
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: 'Poppins';
    src: url(/assets/fonts/Poppins-ExtraBold.woff2) format('woff2'),
    url(/assets/fonts/Poppins-ExtraBold.woff) format('woff');
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Poppins';
    src: url(/assets/fonts/Poppins-ExtraBoldItalic.woff2) format('woff2'),
    url(/assets/fonts/Poppins-ExtraBoldItalic.woff) format('woff');
    font-weight: 800;
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: 'Poppins';
    src: url(/assets/fonts/Poppins-Light.woff2) format('woff2'),
    url(/assets/fonts/Poppins-Light.woff) format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }
  html {
    font-family: "Poppins", Helvetica, sans-serif;
    font-weight: 400;
    color: var(--black);
  }
  
  p, li {
    font-size: 1.4rem;
  }
  
  h1,h2,h3,h4,h5,h6 {
    font-family: "Poppins", Helvetica, sans-serif;
    font-weight: 600;
    margin: 0;
  }
  
  a {
    color: var(--astral);
    text-decoration: none;
  }
  
  .center {
    text-align: center;
  }
  
  .tilt {
    transform: rotate(-2deg);
  }
`;
