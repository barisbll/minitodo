import { useCallback, useState } from "react";
import { Button } from "../shadcn-ui/button";
import { Input } from "../shadcn-ui/input";
import { api } from "~/utils/api";
import { useToast } from "~/components/shadcn-ui/use-toast";
import { type TodoWithUser } from "./Todo.type";
import { useSession } from "next-auth/react";

export const TodoBar = () => {
  const [todo, setTodo] = useState("");
  const { toast } = useToast();
  const { data: session } = useSession();
  const utils = api.useContext();
  const addTodo = api.todo.create.useMutation({
    onMutate: async ({ content }) => {
      setTodo("");
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await utils.todo.findAll.cancel();

      // Snapshot the previous value
      const previousTodos = utils.todo.findAll.getData();

      // Optimistically update to the new value
      utils.todo.findAll.setData(
        undefined,
        (oldQueryData: TodoWithUser[] | undefined) =>
          [
            ...(oldQueryData ?? []),
            {
              author: {
                name: session?.user?.name,
                id: session?.user?.id,
              },
              content,
              done: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ] as TodoWithUser[]
      );

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onError: (err, _newTodo, context) => {
      // Rollback to the previous value if mutation fails
      utils.todo.findAll.setData(undefined, context?.previousTodos);

      // Show error message
      const zodErrMessage =
        err.shape?.data.zodError?.fieldErrors.content?.at(0);
      toast({
        variant: "destructive",
        title: "Error while creating todo",
        description: zodErrMessage
          ? zodErrMessage
          : "There was an error while saving todo. Please try again later.",
      });
    },
    onSettled: () => {
      void utils.todo.findAll.invalidate();
    },
  });

  const handleInputOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTodo(event.target.value);
    },
    []
  );

  const handleAddTodo = useCallback(() => {
    addTodo.mutate({
      content: todo,
    });
  }, [addTodo, todo]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleAddTodo();
      }
    },
    [handleAddTodo]
  );

  return (
    <div className="flex w-full items-center space-x-2 self-center px-6 pt-2  md:w-2/3 md:flex-grow-0 lg:w-2/3 xl:w-1/2">
      <Input
        placeholder="Enter your task!"
        value={todo}
        onChange={handleInputOnChange}
        onKeyDown={handleKeyDown}
      />
      <Button type="submit" onClick={handleAddTodo}>
        Add
      </Button>
    </div>
  );
};
