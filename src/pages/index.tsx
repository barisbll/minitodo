import { useSession } from "next-auth/react";
import { TodoBar } from "~/components/Todo/TodoBar";
import { TodoList } from "~/components/Todo/TodoList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

const Todo = () => {
  const { status } = useSession();

  // If user isn't logged in
  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center pt-40">
        <div className="flex flex-col items-center justify-center">
          <h2 className="animate-text-fade-in-up scroll-m-20 text-4xl font-extralight tracking-wider transition-colors first:mt-0  md:text-5xl 2xl:text-6xl">
            Welcome to #minitodo
          </h2>
          <p className="animate-text-fade-in-up-1-delay scroll-m-20 pt-6 text-xl font-extralight tracking-wider opacity-0 transition-colors first:mt-0  md:text-2xl 2xl:text-3xl">
            The most minimalistic todo app.{" "}
            <span className="font-normal">Ever.</span>
          </p>
          <div className="flex w-full items-center justify-center gap-8 pt-8">
            <Button
              asChild
              className="w-[9.375rem] animate-text-fade-in-up-2-delay opacity-0 2xl:w-[10rem]  2xl:text-lg"
            >
              <Link href="/auth">Login</Link>
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  className="w-[9.375rem] animate-text-fade-in-up-3-delay opacity-0 2xl:w-[10rem]  2xl:text-lg"
                >
                  Just wonder 👀
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit">
                <p className="text-sm">Coming out soon!</p>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    );
  }

  const {
    isLoading,
    data: todoItems,
    isError,
    error,
  } = api.todo.findAll.useQuery();

  if (isError) {
    console.error("error while fetching todos", error);
    return (
      <div className="flex w-full flex-col items-center px-4">
        <p>Something went wrong while trying to fetch todos :( </p>
      </div>
    );
  }

  if (isLoading) {
    // TODO: Add a good loader
    return (
      <div className="flex w-full flex-col items-center px-4">
        <p>Loading...</p>
      </div>
    );
  }

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

export default Todo;
