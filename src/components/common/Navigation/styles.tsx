import styled from "styled-components";

export const NavStyled = styled.nav<{ open: boolean }>`
  justify-self: end;
  margin: 0;
  padding: 0;
  @media (max-width: 475px) {
    text-align: center;
    justify-self: stretch;
  }
  ul {
    display: grid;
    grid-gap: 3rem;
    grid-template-columns: repeat(4, auto);
    align-items: center;
    justify-items: end;
    text-align: center;
    list-style: none;
    font-size: 1.4rem;
    padding: 0;
    @media (max-width: 475px) {
      grid-template-columns: 1fr;
      text-align: center;
      justify-items: center;
      transition: transform 0.3s ease-in-out;
      position: absolute;
      width: 100%;
      left: 0;
      background-color: white;
      z-index: 10;
      padding-bottom: 2rem;
      box-shadow: -5px 15px 15px rgba(0, 0, 0, 0.2);
      transform: ${({ open }) =>
        open ? "translateX(0)" : "translateX(-100%)"};
    }
  }
  a {
    padding-bottom: 0.5rem;
    color: var(--grey);
    &:hover {
      color: var(--black);
    }
    &.current-page {
      color: var(--black);
      border-bottom: 2px solid var(--astral);
    }
  }
  .hamburger {
    display: none;
    @media (max-width: 475px) {
      display: inline-block;
      float: right;
      margin-top: -4rem;
      cursor: pointer;
    }
  }
`;
