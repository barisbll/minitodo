import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  findAll: protectedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany({
      include: {
        author: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    return todos;
  }),
  create: protectedProcedure
    .input(z.object({ content: z.string().min(1) }))
    .mutation( async ({ ctx, input }) => {
      const todo = await ctx.prisma.todo.create({
        data: {
          content: input.content,
          done: false,
          author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });

      return todo;
    }),
  update: protectedProcedure
    .input(z.object({ id: z.string(), content: z.string()}))
    .mutation(async ({ ctx, input }) => {
        const todo = await ctx.prisma.todo.update({
          where: {
            id: input.id,
          },
          data: {
            content: input.content,
          },
        });

        return todo;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
        await ctx.prisma.todo.delete({
          where: {
            id: input.id,
          },
        });
    }),
});
