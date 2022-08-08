import { createRouter } from "./context";
import { z } from "zod";

export const experienceRouter = createRouter().query("getAll", {
  async resolve({ ctx }) {
    return ctx.prisma.experience.findMany({
      orderBy: { startDate: "asc" },
    });
  },
});
