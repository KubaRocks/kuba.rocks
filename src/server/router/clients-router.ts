import { createRouter } from "./context";
import { z } from "zod";

export const clientsRouter = createRouter().query("getAll", {
  async resolve({ ctx }) {
    return ctx.prisma.client.findMany({
      where: { hidden: false },
    });
  },
});
