import styled from "styled-components";
import { SectionTitle } from "@app/components/common/SectionTitle";
import { useContactForm } from "@app/hooks/useContactForm";
import { Button as ButtonLink } from "@app/components/common/Button";

const ContainerStyled = styled.div`
  grid-column: span 2;
`;

const ContactFormStyled = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    textarea {
      height: 20rem;
    }
  }

  fieldset {
    border: none;
    display: grid;
    gap: 1rem;
  }

  .mapleSyrup {
    display: none;
  }

  input,
  textarea {
    border: 2px solid var(--veryLightGrey);
    border-radius: 0.5rem;
    font-size: 1.4rem;
    padding: 1rem 2.5rem 1rem 1.2rem;
    transition: all 0.3s ease-in-out;
    &:focus {
      border-color: var(--astronaut);
    }
    font-family: inherit;
  }

  button {
    width: 18rem;
  }
`;

export const ContactForm = () => {
  const { submitContactForm, loading, values, updateValue } = useContactForm({
    fullName: "",
    email: "",
    subject: "",
    message: "",
    mapleSyrup: "",
  });

  const Button = ButtonLink.withComponent("button");

  return (
    <ContainerStyled>
      <SectionTitle>How Can I Help You?</SectionTitle>
      <ContactFormStyled onSubmit={submitContactForm}>
        <fieldset disabled={loading}>
          <input
            placeholder="Full Name"
            type="text"
            name="fullName"
            id="fullName"
            value={values.fullName}
            onChange={updateValue}
          />
          <input
            placeholder="E-Mail"
            type="text"
            name="email"
            id="email"
            value={values.email}
            onChange={updateValue}
          />
          <input
            placeholder="Subject"
            type="text"
            name="subject"
            id="subject"
            value={values.subject}
            onChange={updateValue}
          />
          <input
            type="mapleSyrup"
            name="mapleSyrup"
            id="mapleSyrup"
            value={values.mapleSyrup}
            onChange={updateValue}
            className="mapleSyrup"
          />
        </fieldset>
        <fieldset disabled={loading}>
          <textarea
            placeholder="Message"
            name="message"
            id="message"
            value={values.message}
            onChange={updateValue}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <Button type="submit" disabled={loading}>
            <span aria-live="assertive" aria-atomic="true">
              {loading ? "Sending message..." : ""}
            </span>
            {loading ? "" : "Send message"}
          </Button>
        </fieldset>
      </ContactFormStyled>
    </ContainerStyled>
  );
};
