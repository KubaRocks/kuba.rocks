import Image from "next/dist/client/future/image";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@app/components/common/Button";
import { HeroStyled, PortraitStyled } from "./styles";

import clouds from "public/assets/me/look-into-clouds.png";
import rock from "public/assets/me/rock.png";

export const Hero: React.FC<{
  title: string;
  subtitle: string;
  content: string;
  displayButtons?: boolean;
  rocksModeOnly?: boolean;
}> = ({
  title,
  subtitle,
  content,
  displayButtons = true,
  rocksModeOnly = false,
}) => {
  const [hover, setHover] = useState(false);
  const resumeUrl = "/assets/me/CV - Kuba Florczuk - 2022 EN.pdf";

  return (
    <HeroStyled>
      <PortraitStyled
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        {!rocksModeOnly && (
          <Image
            src={clouds}
            alt="Kuba Florczuk"
            width={360}
            height={360}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            priority
            className={!hover ? undefined : "hide"}
          />
        )}

        <Image
          src={rock}
          alt="Kuba Florczuk"
          width={360}
          height={360}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          priority
          className={rocksModeOnly || hover ? undefined : "hide"}
        />
      </PortraitStyled>

      <div>
        <h4>{subtitle}</h4>
        <h1>{title}</h1>

        <p>{content}</p>

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
