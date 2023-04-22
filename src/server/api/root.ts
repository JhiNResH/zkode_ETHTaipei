import { exampleRouter } from "./routers/example";
import githubRouter from "./routers/github";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  github: githubRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
