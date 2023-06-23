import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/shadcn-ui/tabs";
import { Input } from "~/components/shadcn-ui/input";
import { Button } from "~/components/shadcn-ui/button";
import { Checkbox } from "~/components/shadcn-ui/checkbox";
import { cn } from "~/lib/utils";
import React, { useState } from "react";
import { More } from "~/components/More";
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

const TodoItems: TodoWithUser[] = [
  {
    id: "1",
    content: "Buy milk",
    done: false,
    author: {
      name: "John Doe",
      id: "1",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: "1",
  },
  {
    id: "2",
    content: "Write good code",
    done: false,
    author: {
      name: "Sally Barker",
      id: "2",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: "2",
  },
  {
    id: "3",
    content: "Make A Good Web App",
    done: true,
    author: {
      name: "Yanis Wang",
      id: "1",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: "3",
  },
];

const TodoBar = () => {
  return (
    <div className="flex flex-grow items-center space-x-2 self-center px-6 pt-2 md:w-2/3 md:flex-grow-0 lg:w-1/2">
      <Input placeholder="Enter your task!" />
      <Button type="submit">Add</Button>
    </div>
  );
};

const TodoItem = (props: TodoWithUser) => {
  const [checked, setChecked] = useState(props.done);

  const handleCheckboxChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div
      key={props.id}
      className="flex w-full items-center justify-between px-6 py-2 md:w-2/3 lg:w-1/2"
    >
      <div className="flex items-center space-x-2">
        <Checkbox
          id={props.id}
          checked={checked}
          onClick={handleCheckboxChange}
        />
        <label htmlFor={props.id} className={cn({ "line-through": checked })}>
          {props.content}
        </label>
      </div>
      <More {...props} />
    </div>
  );
};

const TodoList = () => {
  return (
    <div className="flex w-full flex-col items-center">
      {TodoItems.map((item) => (
        <TodoItem {...item} key={item.id} />
      ))}
    </div>
  );
};

export const TodoSection = () => {
  return (
    <Tabs defaultValue="all" className="flex w-full flex-col">
      <TabsList className="w-fit self-center">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="flex flex-col justify-center">
        <TodoBar />
        <TodoList />
      </TabsContent>
      <TabsContent value="active" className="flex justify-center">
        <TodoBar />
      </TabsContent>
      <TabsContent value="completed" className="flex justify-center">
        <TodoBar />
      </TabsContent>
    </Tabs>
  );
};
