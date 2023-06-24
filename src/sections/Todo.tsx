import { type TodoWithUser } from "~/components/Todo/Todo.type";
import { TodoBar } from "~/components/Todo/TodoBar";
import { TodoList } from "~/components/Todo/TodoList";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/shadcn-ui/tabs";

const todoItems: TodoWithUser[] = [
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
        <TodoList todoItems={todoItems} listMode="all" />
      </TabsContent>
      <TabsContent value="active" className="flex flex-col justify-center">
        <TodoBar />
        <TodoList todoItems={todoItems} listMode="active" />
      </TabsContent>
      <TabsContent value="completed" className="flex flex-col justify-center">
        <TodoBar />
        <TodoList todoItems={todoItems} listMode="completed" />
      </TabsContent>
    </Tabs>
  );
};
