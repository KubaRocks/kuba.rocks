// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { protectedExampleRouter } from "./protected-example-router";
import { testimonialsRouter } from "@app/server/router/testimonials-router";
import { clientsRouter } from "@app/server/router/clients-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("question.", protectedExampleRouter)
  .merge("testimonials.", testimonialsRouter)
  .merge("clients.", clientsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
