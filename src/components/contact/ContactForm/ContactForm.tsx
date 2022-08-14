import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SectionTitle } from "@app/components/common/SectionTitle";
import { ContactFormData, ContactFormSchema } from "@app/types/contact.schema";
import { trpc } from "@app/utils/trpc";
import { Button, ContactFormStyled, ContainerStyled, Error } from "./styles";

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
