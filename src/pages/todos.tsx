import { TodoBar } from "~/components/Todo/TodoBar";
import { TodoList } from "~/components/Todo/TodoList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { LoadingSpinner } from "~/components/LoadingSpinner";

const Todos = () => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      void router.push("/auth");
    },
  });
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

  if (isLoading || status === "loading") {
    return (
      <div className="absolute inset-1/2 ml-[0rem] mt-[-5rem] w-fit translate-x-[-50%] translate-y-[-50%]">
        <LoadingSpinner classNames="h-16 w-16" />
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
        <TodoList todoItems={todoItems ?? []} listMode="all" />
      </TabsContent>
      <TabsContent value="active" className="flex flex-col justify-center">
        <TodoBar />
        <TodoList todoItems={todoItems ?? []} listMode="active" />
      </TabsContent>
      <TabsContent value="completed" className="flex flex-col justify-center">
        <TodoBar />
        <TodoList todoItems={todoItems ?? []} listMode="completed" />
      </TabsContent>
    </Tabs>
  );
};

export default Todos;
