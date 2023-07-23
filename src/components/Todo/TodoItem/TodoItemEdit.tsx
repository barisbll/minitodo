import { type Dispatch, useCallback, useState } from "react";
import { Check, X } from "lucide-react";

import { Button } from "~/components/shadcn-ui/button";
import { Input } from "~/components/shadcn-ui/input";
import { type TodoWithUser } from "../Todo.type";
import { type MoreAction, type TodoUpdate } from "./TodoItem.type";

type TodoItemEditProps = {
  todoWithUser: TodoWithUser;
  moreReducerDispatch: Dispatch<MoreAction>;
  editRef: React.RefObject<HTMLInputElement>;
  updateTodo: { mutate: (content: TodoUpdate) => void };
};

export const TodoItemEdit = ({
  todoWithUser,
  moreReducerDispatch,
  editRef,
  updateTodo,
}: TodoItemEditProps) => {
  const [todoUpdateState, setTodoUpdateState] = useState(todoWithUser);

  const handleEditCompleted = useCallback(() => {
    updateTodo.mutate({
      id: todoUpdateState.id,
      content: todoUpdateState.content,
    });
    moreReducerDispatch({ type: "edit", state: false });
  }, [
    moreReducerDispatch,
    todoUpdateState.content,
    todoUpdateState.id,
    updateTodo,
  ]);

  const handleEditCancelled = useCallback(() => {
    moreReducerDispatch({ type: "edit", state: false });
  }, [moreReducerDispatch]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleEditCompleted();
      }

      if (e.key === "Escape") {
        handleEditCancelled();
      }
    },
    [handleEditCancelled, handleEditCompleted]
  );

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTodoUpdateState((prev) => ({
        ...prev,
        content: e.target.value,
      }));
    },
    []
  );

  return (
    <div className="flex w-full items-center justify-between px-6 py-2 md:w-2/3 lg:w-2/3 xl:w-1/2">
      <Input
        ref={editRef}
        value={todoUpdateState.content}
        onKeyDown={handleKeyDown}
        onChange={handleOnChange}
      />
      <div className="flex">
        <Button
          variant="ghost"
          size="sm"
          className="inline px-2 hover:scale-110 hover:bg-transparent"
          onClick={handleEditCompleted}
        >
          <Check className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="inline px-2 hover:scale-110 hover:bg-transparent"
          onClick={handleEditCancelled}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
