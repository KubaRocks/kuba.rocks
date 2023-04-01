import React from "react";
import Link from "next/link";
import { Button } from "@app/components/common/Button";
import { HeroStyled, PortraitStyled } from "./styles";

import clouds from "public/assets/me/look-into-clouds.png";
import rock from "public/assets/me/rock.png";

export const Hero: React.FC<{
  title: string;
  subtitle: string;
  children: React.ReactNode;
  displayButtons?: boolean;
  rocksModeOnly?: boolean;
}> = ({
  title,
  subtitle,
  children,
  displayButtons = true,
  rocksModeOnly = false,
}) => {
  const resumeUrl = "/assets/me/CV - Kuba Florczuk - 2023 EN.pdf";

  return (
    <HeroStyled>
      {rocksModeOnly ? (
        <PortraitStyled bg={rock.src} />
      ) : (
        <PortraitStyled bg={clouds.src} bgHover={rock.src} />
      )}

      <div>
        <h4>{subtitle}</h4>
        <h1>{title}</h1>

        {children}

        {displayButtons && (
          <p>
            <Button href={resumeUrl} download>
              Download CV
            </Button>
            <Link href="/contact">
              <Button secondary>Contact</Button>
            </Link>
          </p>
        )}
      </div>
    </HeroStyled>
  );
};
