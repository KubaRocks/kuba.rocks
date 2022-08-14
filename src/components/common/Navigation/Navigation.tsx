import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { atom, useAtom } from "jotai";
import { Burger } from "@app/components/common/Burger";
import { NavStyled } from "./styles";

const navOpenAtom = atom(false);

export const Navigation = () => {
  const [navOpen, setNavOpen] = useAtom(navOpenAtom);
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <NavStyled open={navOpen}>
      <Burger open={navOpen} setOpen={setNavOpen} />
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
  const [, setNavOpen] = useAtom(navOpenAtom);
  const isCurrentPage = () => href == currentPath;

  return (
    <Link href={href}>
      <a
        className={isCurrentPage() ? "current-page" : undefined}
        onClick={() => setNavOpen(false)}
      >
        {name}
      </a>
    </Link>
  );
};
