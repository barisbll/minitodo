import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/shadcn-ui/tabs";
import { Input } from "~/components/shadcn-ui/input";
import { Button } from "~/components/shadcn-ui/button";

const TodoItems = [
  {
    id: 1,
    content: "Buy milk",
    completed: false,
    author: "John",
    authorId: 1,
  },
  {
    id: 2,
    content: "Buy books",
    completed: false,
    author: "John",
    authorId: 1,
  },
  {
    id: 3,
    content: "Make a tRPC app",
    completed: true,
    author: "John",
    authorId: 1,
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

const TodoList = () => {
  return (
    <div className="flex w-full flex-col items-center">
      {TodoItems.map((item) => (
        <div
          key={item.id}
          className="flex w-full items-center justify-between px-6 py-2 md:w-2/3 lg:w-1/2"
        >
          <div className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>{item.content}</span>
          </div>
          <span className="text-sm text-gray-400">{item.author}</span>
        </div>
      ))}
    </div>
  );
};

export const Todo = () => {
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
