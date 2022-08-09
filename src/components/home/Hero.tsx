import clouds from "public/assets/me/look-into-clouds.png";
import Image from "next/dist/client/future/image";
import styled from "styled-components";
import { Button } from "@app/components/common/Button";
import { useRouter } from "next/router";
import { useFunFacts } from "@app/useFunFacts";

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

export const Hero = () => {
  const router = useRouter();
  const { yearsOfExperience } = useFunFacts();

  return (
    <HeroStyled>
      <PortraitStyled>
        <Image src={clouds} alt="Kuba Florczuk" width={360} height={360} />
        {/*<Image src={rock} alt="Kuba Florczuk" width={360} height={360} />*/}
      </PortraitStyled>

      <div>
        <h4>Full-Stack Developer, Team Leader</h4>
        <h1>Kuba Florczuk</h1>

        <p>
          I&apos;m a Full-Stack Developer and Team Leader based in Warsaw,
          Poland, with {yearsOfExperience} years of commercial experience in Web
          Development and Team Management. Also a husband and father of one
          sweet two-year-old girl. Huge fan of basketball and comics.
        </p>

        <p>
          <Button href="#" download>
            Download CV
          </Button>
          <Button
            href="/contact"
            onClick={() => router.push("/contact")}
            secondary
          >
            Contact
          </Button>
        </p>
      </div>
    </HeroStyled>
  );
};
