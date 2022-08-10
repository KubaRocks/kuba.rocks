import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --red: #b73225;
    --blue: #004E7C;
    --brown: #591C0B;
    
    --grey: #666666;
    --lightGrey: #919191;
    --veryLightGrey: #D5D5D5;
    --almostWhiteGrey: #F5F5F5;
    --black: #333333;
    
    --oxfordBlue: #364553;
    --astronaut: #264B6E;
    --hoki: #6885A1;
    --astral: #386EA1;
    --cornflower: #9AC5ED;
    --maxWidth: 1280px;
  }
  html {
    font-size: 10px;
  }
  body {
    font-size: 2rem;
    position: relative;
    min-height: 100vh;
    color: var(--black);
  }
  .gatsby-image-wrapper img[src*=base64\\,] {
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
  }
  hr {
    border: 0;
    height: 8px;
    background-color: var(--astronaut);
  }
  img {
    max-width: 100%;
  }
  
  a {
    transition: all 0.3s ease-in-out;
    &:hover {
      color: var(--oxfordBlue);
    }
  }
`;

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};
