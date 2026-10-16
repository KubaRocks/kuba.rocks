"use server";

import { z } from "zod";
import { sendContactEmail } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  mapleSyrup: z.string().max(0, "Bot detected"),
});

export type ContactValues = {
  name: string;
  email: string;
  message: string;
};

export type ContactState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  /** Submitted values, returned on failure so the form can be refilled */
  values?: ContactValues;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
    mapleSyrup: String(formData.get("mapleSyrup") ?? ""),
  };
  const values = { name: raw.name, email: raw.email, message: raw.message };

  const result = contactSchema.safeParse(raw);

  if (!result.success) {
    return {
      fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
      values,
    };
  }

  try {
    await sendContactEmail(result.data);
    return { success: true };
  } catch {
    return { error: "Failed to send message. Please try again.", values };
  }
}
