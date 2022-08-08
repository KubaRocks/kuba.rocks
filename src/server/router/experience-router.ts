import { createRouter } from "./context";
import { z } from "zod";
import { Prisma } from "@prisma/client";

export const experienceRouter = createRouter().query("getAll", {
  async resolve({ ctx }) {
    return ctx.prisma.experience.findMany({
      orderBy: { startDate: Prisma.SortOrder.desc },
    });
  },
});
