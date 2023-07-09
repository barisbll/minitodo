import { Trash, Pencil, MoreHorizontal, Copy } from "lucide-react";
import { Button } from "~/components/shadcn-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/shadcn-ui/dropdown-menu";
import { type Dispatch, useCallback } from "react";

import { type TodoWithUser } from "./Todo.type";
import { type MoreState, type MoreAction } from "./TodoItem/TodoItem";

type TodoMoreProps = {
  todoWithUser: TodoWithUser;
  moreState: MoreState;
  moreReducerDispatch: Dispatch<MoreAction>;
};

export function TodoMore(props: TodoMoreProps) {
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
        <DropdownMenuItem>
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
