import { Prisma } from "@prisma/client";

const todoInclude = Prisma.validator<Prisma.TodoInclude>()({
    author: {
      select: {
        name: true,
        id: true,
      },
    },
  });
  
  export type TodoWithUser = Prisma.TodoGetPayload<{
    include: typeof todoInclude;
  }>;