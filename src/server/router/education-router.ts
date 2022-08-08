import { createRouter } from "./context";
import { z } from "zod";
import { Prisma } from "@prisma/client";

export const educationRouter = createRouter().query("getAll", {
  async resolve({ ctx }) {
    return ctx.prisma.education.findMany({
      orderBy: { date: Prisma.SortOrder.desc },
    });
  },
});
