import { z } from "zod";
import { type TodoWithUser } from "~/components/Todo/Todo.type";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

type FindAllSuccessResponse = {
  isError: false;
  content: TodoWithUser[];
};

type FindAllErrorResponse = {
  isError: true;
  content: Error;
};

type FindAllResponse = FindAllSuccessResponse | FindAllErrorResponse;

export const todoRouter = createTRPCRouter({
  findAll: protectedProcedure.query(
    async ({ ctx }): Promise<FindAllResponse> => {
      try {
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
        return {
          isError: false,
          content: todos,
        };
      } catch (error) {
        return {
          isError: true,
          content: error as Error,
        };
      }
    }
  ),
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ ctx, input }) => {
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
    .input(z.object({ id: z.string(), content: z.string(), done: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const todo = await ctx.prisma.todo.update({
          where: {
            id: input.id,
          },
          data: {
            content: input.content,
            done: input.done,
          },
        });

        return todo;
      } catch (error) {
        throw error;
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const todo = await ctx.prisma.todo.delete({
          where: {
            id: input.id,
          },
        });
        return todo;
      } catch (error) {
        return error;
      }
    }),
});
