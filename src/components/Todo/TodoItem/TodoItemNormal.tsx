import { useState, type Dispatch, useCallback } from "react";
import { Checkbox } from "~/components/shadcn-ui/checkbox";
import { cn } from "~/lib/utils";

import { TodoMore } from "../TodoMore";
import { type TodoWithUser } from "../Todo.type";
import { type MoreAction, type MoreState } from "./TodoItem";

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

  const handleCheckboxChange = useCallback(() => {
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
