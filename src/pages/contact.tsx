import { NextPage } from "next";
import styled from "styled-components";
import { PageTitle } from "@app/components/common/PageTitle";
import { Map } from "@app/components/contact/Map";
import { ContactDetails } from "@app/components/contact/ContactDetails";
import { ContactForm } from "@app/components/contact/ContactForm";

const ContactPageStyled = styled.section`
  section {
    max-width: var(--maxWidth);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 4rem;

    @media (max-width: 725px) {
      grid-template-columns: 1fr;
    }
  }
`;

const ContactPage: NextPage = () => {
  return (
    <ContactPageStyled>
      <PageTitle title="Contact" subtitle="Get in Touch" />
      <Map />
      <section>
        <ContactDetails />
        <ContactForm />
      </section>
    </ContactPageStyled>
  );
};

export default ContactPage;
