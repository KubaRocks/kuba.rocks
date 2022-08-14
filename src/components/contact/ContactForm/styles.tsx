import styled from "styled-components";
import { Button as ButtonLink } from "@app/components/common/Button";

export const ContainerStyled = styled.div`
  grid-column: span 2;
`;

export const ContactFormStyled = styled.form`
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

  .error {
    border-color: var(--red);
  }

  button {
    width: 18rem;
  }
`;

export const Error = styled.p`
  padding: 0 1rem;
  margin: 0;
  color: var(--red);
  font-size: 12px;
`;

export const Button = ButtonLink.withComponent("button");
