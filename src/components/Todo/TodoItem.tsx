import { Checkbox } from "~/components/shadcn-ui/checkbox";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { More } from "./TodoMore";
import { type TodoWithUser } from "./Todo.type";

export const TodoItem = (todoWithUser: TodoWithUser) => {
  const [checked, setChecked] = useState(todoWithUser.done);

  const handleCheckboxChange = () => {
    setChecked((prev) => !prev);
  };

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
          className={cn({ "line-through": checked })}
        >
          {todoWithUser.content}
        </label>
      </div>
      <More {...todoWithUser} />
    </div>
  );
};
