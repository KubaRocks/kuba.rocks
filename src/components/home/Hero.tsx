import clouds from "public/assets/me/look-into-clouds.png";
import rock from "public/assets/me/rock.png";
import Image from "next/dist/client/future/image";

export const Hero = () => {
  return (
    <section>
      <Image src={clouds} alt="Kuba Florczuk" />
      <Image src={rock} alt="Kuba Florczuk" />

      <h4>Full-Stack Developer, Team Leader</h4>
      <h1>Kuba Florczuk</h1>

      <p>
        I'm a Full-Stack Developer and Team Leader based in Warsaw, Poland, with
        18 years of commercial experience in Web Development and Team
        Management. Also a husband and father of one sweet two-year-old girl.
        Huge fan of basketball and comics.
      </p>
    </section>
  );
};
