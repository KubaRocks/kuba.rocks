import styled from "styled-components";
import { SectionTitle } from "@app/components/common/SectionTitle";
import { Button as ButtonLink } from "@app/components/common/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ContactFormData, ContactFormSchema } from "@app/types/contact.schema";
import { trpc } from "@app/utils/trpc";

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

  .error {
    border-color: var(--red);
  }

  button {
    width: 18rem;
  }
`;

const Error = styled.p`
  padding: 0 1rem;
  margin: 0;
  color: var(--red);
  font-size: 12px;
`;

const Button = ButtonLink.withComponent("button");

export const ContactForm = () => {
  const { register, handleSubmit, formState, reset } = useForm<ContactFormData>(
    {
      resolver: zodResolver(ContactFormSchema),
    },
  );
  const { errors } = formState;
  const [sending, setSending] = useState(false);
  const { mutate } = trpc.useMutation("contact.send");

  const onSubmit = async (data: ContactFormData) => {
    setSending(true);
    await mutate({ ...data });
    reset();
    setSending(false);
  };

  return (
    <ContainerStyled>
      <SectionTitle>How Can I Help You?</SectionTitle>
      <ContactFormStyled onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={sending}>
          <input
            placeholder="Full Name"
            className={errors.fullName ? "error" : undefined}
            {...register("fullName", { required: true })}
          />
          {errors.fullName && <Error>{errors.fullName.message}</Error>}
          <input
            placeholder="E-Mail"
            type="email"
            className={errors.email ? "error" : undefined}
            {...register("email", { required: true })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
          <input
            placeholder="Subject"
            className={errors.subject ? "error" : undefined}
            {...register("subject", { required: true })}
          />
          {errors.subject && <Error>{errors.subject.message}</Error>}
          <input
            type="mapleSyrup"
            {...register("mapleSyrup")}
            className="mapleSyrup"
          />
        </fieldset>
        <fieldset disabled={sending}>
          <textarea
            placeholder="Message"
            className={errors.message ? "error" : undefined}
            {...register("message", { required: true })}
          />
          {errors.message && <Error>{errors.message.message}</Error>}
        </fieldset>
        <fieldset>
          <Button type="submit" disabled={sending}>
            {!sending && "Send message"}
            {sending && (
              <img
                src="/assets/three-dots-loader.svg"
                alt="loading"
                style={{ width: "50px" }}
              />
            )}
          </Button>
        </fieldset>
      </ContactFormStyled>
    </ContainerStyled>
  );
};
