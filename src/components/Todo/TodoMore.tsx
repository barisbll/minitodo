import { Trash, Pencil, MoreHorizontal, Copy } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { type Dispatch, useCallback } from "react";
import { useToast } from "~/components/ui/use-toast";

import { type TodoWithUser } from "./Todo.type";
import { type MoreState, type MoreAction } from "./TodoItem/TodoItem";
import { api } from "~/utils/api";

type TodoMoreProps = {
  todoWithUser: TodoWithUser;
  moreState: MoreState;
  moreReducerDispatch: Dispatch<MoreAction>;
};

export function TodoMore(props: TodoMoreProps) {
  const utils = api.useContext();
  const { toast } = useToast();

  const deleteTodo = api.todo.delete.useMutation({
    onMutate: async ({ id }) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await utils.todo.findAll.cancel();

      // Snapshot the previous value
      const previousTodos = utils.todo.findAll.getData();

      // Optimistically update to the new value
      utils.todo.findAll.setData(
        undefined,
        (oldQueryData: TodoWithUser[] | undefined) =>
          (oldQueryData ?? []).filter((todo) => todo.id !== id)
      );

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onSuccess: () => {
      props.moreReducerDispatch({ type: "delete", state: false });
    },
    onError: (_err, _data, context) => {
      // Rollback to the previous value if mutation fails
      utils.todo.findAll.setData(undefined, context?.previousTodos);
      toast({
        variant: "destructive",
        title: "Error while deleting a todo",
        description:
          "There was an error while deleting todo. Please try again later.",
      });
    },
    onSettled: () => {
      void utils.todo.findAll.invalidate();
    },
  });

  const handleDelete = useCallback(() => {
    deleteTodo.mutate({ id: props.todoWithUser.id });
  }, [props.todoWithUser.id, deleteTodo]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[4rem]">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={useCallback(() => {
              props.moreReducerDispatch({ type: "edit", state: true });
            }, [props])}
          >
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={useCallback(() => {
              props.moreReducerDispatch({ type: "copy", state: true });
            }, [props])}
          >
            <Copy className="mr-2 h-4 w-4" />
            <span>Copy</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
