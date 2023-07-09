import { type Dispatch, useCallback } from "react";
import { Check, X } from "lucide-react";

import { Button } from "~/components/shadcn-ui/button";
import { Input } from "~/components/shadcn-ui/input";
import { type TodoWithUser } from "../Todo.type";
import { type MoreAction } from "./TodoItem";

type TodoItemEditProps = {
  todoWithUser: TodoWithUser;
  moreReducerDispatch: Dispatch<MoreAction>;
  editRef: React.RefObject<HTMLInputElement>;
};

export const TodoItemEdit = ({
  todoWithUser,
  moreReducerDispatch,
  editRef,
}: TodoItemEditProps) => {
  const handleEditCompleted = useCallback(() => {
    todoWithUser.content = editRef.current?.value ?? todoWithUser.content;
    moreReducerDispatch({ type: "edit", state: false });
    // TODO: Change the todo in the db
  }, [editRef, moreReducerDispatch, todoWithUser]);

  const handleEditCancelled = useCallback(() => {
    moreReducerDispatch({ type: "edit", state: false });
  }, [moreReducerDispatch]);

  return (
    <div className="flex w-full items-center justify-between px-6 py-2 md:w-2/3 lg:w-2/3 xl:w-1/2">
      <Input ref={editRef} />
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
