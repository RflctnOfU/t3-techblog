import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const commentsRouter = createTRPCRouter({
  createComment: protectedProcedure
    .input(z.object({ id: z.string(), text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const newComment = await ctx.prisma.comment.create({
          data: {
            text: input.text,
            userId: ctx.session.user.id,
            postId: input.id,
            created_at: new Date().toDateString(),
          },
        });
        return newComment;
      } catch (err) {
        return console.log(err);
      }
    }),
  getAllComments: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.comment.findMany({
        where: {
          postId: input.id,
        },
      });
    }),
});
