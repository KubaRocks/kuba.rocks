import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Burger } from "@app/components/common/Burger";

const NavStyled = styled.nav<{ open: boolean }>`
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

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <NavStyled open={open}>
      <Burger open={open} setOpen={setOpen} />
      <ul>
        <li>
          <NavigationLink href="/" name="Home" currentPath={currentPath} />
        </li>
        <li>
          <NavigationLink
            href="/resume"
            name="Resume"
            currentPath={currentPath}
          />
        </li>
        <li>
          <NavigationLink
            href="/contact"
            name="Contact"
            currentPath={currentPath}
          />
        </li>
      </ul>
    </NavStyled>
  );
};

const NavigationLink: React.FC<{
  href: string;
  name: string;
  currentPath: string;
}> = ({ href, name, currentPath }) => {
  const isCurrentPage = () => href == currentPath;

  return (
    <Link href={href}>
      <a className={isCurrentPage() ? "current-page" : undefined}>{name}</a>
    </Link>
  );
};
