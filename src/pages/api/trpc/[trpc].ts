// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "@app/server/router";
import { createContext } from "@app/server/router/context";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
