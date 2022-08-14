import clouds from "public/assets/me/look-into-clouds.png";
import rock from "public/assets/me/rock.png";
import styled from "styled-components";
import { Button } from "@app/components/common/Button";
import Image from "next/dist/client/future/image";
import { useState } from "react";
import Link from "next/link";

const HeroStyled = styled.section`
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 4rem;
  justify-items: center;
  align-items: center;
  padding: 6rem 12rem;
  margin-bottom: 4rem;

  @media (max-width: 1024px) {
    padding: 3rem 6rem;
  }

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 475px) {
    padding: 1.5rem 3rem;
  }

  h1 {
    font-size: 4.8rem;
    margin: 1rem 0 3rem 0;
    @media (max-width: 630px) {
      font-size: 4rem;
    }
    @media (max-width: 375px) {
      font-size: 3.5rem;
      margin: 1rem 0;
    }
  }

  h4 {
    color: var(--lightGrey);
    font-weight: 300;
    font-size: 1.6rem;
    @media (max-width: 375px) {
      font-size: 1.2rem;
    }
  }

  p {
    color: var(--grey);
    line-height: 2.5rem;
  }

  .hide {
    display: none;
  }
`;

const PortraitStyled = styled.div`
  width: 360px;
  height: 360px;
  border: 1.8rem solid white;
  border-radius: 50%;
  overflow: hidden;
  --cast: 2px;
  box-shadow: var(--cast) var(--cast) 15px rgba(0, 0, 0, 0.2);

  @media (max-width: 680px) {
    width: 250px;
    height: 250px;
    border-width: 1rem;
  }
`;

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
            priority
            className={!hover ? undefined : "hide"}
          />
        )}

        <Image
          src={rock}
          alt="Kuba Florczuk"
          width={360}
          height={360}
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
