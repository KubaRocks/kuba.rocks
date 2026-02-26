"use server";

import { z } from "zod";
import { sendContactEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  mapleSyrup: z.string().max(0, "Bot detected"),
});

export type ContactState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
    mapleSyrup: formData.get("mapleSyrup") as string,
  };

  const result = contactSchema.safeParse(raw);

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await sendContactEmail(result.data);
    return { success: true };
  } catch {
    return { error: "Failed to send message. Please try again." };
  }
}
