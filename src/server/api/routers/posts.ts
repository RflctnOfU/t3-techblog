import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getPosts: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      include: {
        user: true,
      },
    });
  }),
  getSinglePost: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      try {
        const singlePost = await ctx.prisma.post.findUnique({
          where: {
            id,
          },
          select: {
            id: true,
            text: true,
            title: true,
          },
        });
        return singlePost;
      } catch (error) {
        return console.log(error);
      }
    }),
  createPost: protectedProcedure
    .input(z.object({ title: z.string().min(3), text: z.string().min(10) }))
    .mutation(async ({ ctx, input }) => {
      try {
        const newPost = await ctx.prisma.post.create({
          data: {
            title: input.title,
            text: input.text,
            userId: ctx.session.user.id,
            created_at: new Date().toDateString(),
          },
        });
        return newPost;
      } catch (err) {
        return console.log(err);
      }
    }),
  editPost: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(3).optional(),
        text: z.string().min(10).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.post.update({
          data: {
            title: input.title,
            text: input.title,
          },
          where: {
            id: input.id,
          },
        });
      } catch (err) {}
    }),
  deletePost: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.post.delete({
          where: {
            id: input.id,
          },
        });
      } catch (err) {
        return console.log(err);
      }
    }),
});
