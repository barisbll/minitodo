import { z } from "zod";
import { type TodoWithUser } from "~/components/Todo/Todo.type";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";


// const todoItems: TodoWithUser[] = [
//     {
//       id: "1",
//       content: "Buy milk",
//       done: false,
//       author: {
//         name: "John Doe",
//         id: "1",
//       },
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       authorId: "1",
//     },
//     {
//       id: "2",
//       content: "Write good code",
//       done: false,
//       author: {
//         name: "Sally Barker",
//         id: "2",
//       },
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       authorId: "2",
//     },
//     {
//       id: "3",
//       content: "Make A Good Web App",
//       done: true,
//       author: {
//         name: "Yanis Wang",
//         id: "1",
//       },
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       authorId: "3",
//     },
//   ];

type FindAllSuccessResponse = {
    isError: false;
    todos: TodoWithUser[];
}

type FindAllErrorResponse = {
    isError: true;
    error: Error;
}

type FindAllResponse = FindAllSuccessResponse | FindAllErrorResponse;

export const todoRouter = createTRPCRouter({
  findAll: protectedProcedure
    .query( async ({ctx}): Promise<FindAllResponse> => {
        try {
            const todos = await ctx.prisma.todo.findMany({
                include: {
                    author: {
                        select: {
                            name: true,
                            id: true,
                    }
                }
            }
            });
            return {
                isError: false,
                todos
            }
        } catch (error) {
            return {
                isError: true,
                error: error as Error
            }
        }
    }),
    create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation( async ({ctx, input}) => {
        try {
            const todo = await ctx.prisma.todo.create({
                data: {
                    content: input.content,
                    done: false,
                    author: {
                        connect: {
                            id: ctx.session.user.id
                        }
                    }
                }
            });
            return todo;
        } catch (error) {
            return error;
        }
    }),
    update: protectedProcedure
    .input(z.object({ id: z.string(), content: z.string(), done: z.boolean() }))
    .mutation( async ({ctx, input}) => {
        try {
            const todo = await ctx.prisma.todo.update({
                where: {
                    id: input.id
                },
                data: {
                    content: input.content,
                    done: input.done
                }
            });
            return todo;
        } catch (error) {
            return error;
        }
    }
    ),
    delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation( async ({ctx, input}) => {
        try {
            const todo = await ctx.prisma.todo.delete({
                where: {
                    id: input.id
                }
            });
            return todo;
        } catch (error) {
            return error;
        }
    }
    ),
});
