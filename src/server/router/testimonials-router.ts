import { createRouter } from "./context";
import { z } from "zod";

export const testimonialsRouter = createRouter().query("getAll", {
  async resolve({ ctx }) {
    return ctx.prisma.testimonial.findMany({
      where: { hidden: false },
    });
  },
});
