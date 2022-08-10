import { createRouter } from "./context";
import { ContactFormSchema } from "@app/types/contact.schema";
import * as trpc from "@trpc/server";
import { sendContactEmail } from "@app/utils/sendEmail";

export const contactRouter = createRouter().mutation("send", {
  input: ContactFormSchema,
  async resolve({ input }) {
    console.log({ input });

    // check if the honey pot was filled
    if (Boolean(input.mapleSyrup)) {
      console.log("Honeypot catch!");

      throw new trpc.TRPCError({
        code: "BAD_REQUEST",
        message: "Boop beep bop zzzzzsttt... good bye",
      });
    }

    await sendContactEmail(input);

    return {
      message: "[borat-voice]great success![/borat-voice]",
    };
  },
});
