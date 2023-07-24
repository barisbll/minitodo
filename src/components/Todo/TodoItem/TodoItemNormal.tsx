import { useState, type Dispatch, useCallback, useEffect } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { cn } from "~/lib/utils";

import { TodoMore } from "../TodoMore";
import { type TodoWithUser } from "../Todo.type";
import { type MoreAction, type MoreState } from "./TodoItem.type";
import { api } from "~/utils/api";
import { useToast } from "~/components/ui/use-toast";

type TodoItemNormalProps = {
  todoWithUser: TodoWithUser;
  moreState: MoreState;
  moreReducerDispatch: Dispatch<MoreAction>;
};

export const TodoItemNormal = ({
  moreReducerDispatch,
  moreState,
  todoWithUser,
}: TodoItemNormalProps) => {
  const [checked, setChecked] = useState(todoWithUser.done);
  const [debouncing, setDebouncing] = useState(false);
  const utils = api.useContext();
  const { toast } = useToast();

  const updateTodoDone = api.todo.updateDone.useMutation({
    onMutate: async ({ id }) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await utils.todo.findAll.cancel();

      // Snapshot the previous value
      const previousTodos = utils.todo.findAll.getData();

      // Optimistically update to the new value
      utils.todo.findAll.setData(
        undefined,
        (oldQueryData: TodoWithUser[] | undefined) => {
          if (!oldQueryData) {
            return [];
          }

          return oldQueryData.map((todo) => {
            if (todo.id === id) {
              return {
                ...todo,
                done: !todo.done,
              };
            }

            return todo;
          });
        }
      );

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onError: (err, _newTodo, context) => {
      // Rollback to the previous value if mutation fails
      utils.todo.findAll.setData(undefined, context?.previousTodos);

      toast({
        variant: "destructive",
        title: "Error while updating todo",
        description:
          "There was an error while updating todo. Please try again later.",
      });
    },
    onSettled: () => {
      void utils.todo.findAll.invalidate();
    },
  });

  useEffect(() => {
    if (debouncing) {
      const timeout = setTimeout(() => {
        updateTodoDone.mutate({ id: todoWithUser.id });
        setDebouncing(false);
      }, 200);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [debouncing, todoWithUser.id, updateTodoDone]);

  const handleCheckboxChange = useCallback(() => {
    setDebouncing(true);
    setChecked((prev) => !prev);
  }, []);

  return (
    <div className="flex w-full items-center justify-between px-6 py-2 md:w-2/3 lg:w-2/3 xl:w-1/2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={todoWithUser.id}
          checked={checked}
          onClick={handleCheckboxChange}
        />
        <label
          htmlFor={todoWithUser.id}
          className={cn({ "line-through": checked, "cursor-pointer": true })}
        >
          {todoWithUser.content}
        </label>
      </div>
      <TodoMore
        todoWithUser={todoWithUser}
        moreState={moreState}
        moreReducerDispatch={moreReducerDispatch}
      />
    </div>
  );
};
