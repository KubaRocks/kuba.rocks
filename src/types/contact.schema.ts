import { z } from "zod";

export const ContactFormSchema = z.object({
  fullName: z.string().min(1, { message: "Full Name is required" }),
  email: z.string().email(),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(1, { message: "Message is required" }),
  mapleSyrup: z.string(),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
