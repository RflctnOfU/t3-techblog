import { createTRPCRouter } from "~/server/api/trpc";
import { postsRouter } from "./routers/posts";
import { commentsRouter } from "./routers/comments";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  posts: postsRouter,
  comments: commentsRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
