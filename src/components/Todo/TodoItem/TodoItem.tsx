import { type Reducer, useReducer, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useToast } from "~/components/shadcn-ui/use-toast";
import { type TodoWithUser } from "../Todo.type";
import { TodoItemEdit } from "./TodoItemEdit";
import { TodoItemNormal } from "./TodoItemNormal";
import {
  type TodoUpdate,
  type MoreAction,
  type MoreState,
  initialState,
} from "./TodoItem.type";

const moreReducer = (state: MoreState, action: MoreAction) => {
  switch (action.type) {
    case "edit":
      return { ...state, isEditing: action.state };
    case "delete":
      return { ...state, isDeleting: action.state };
    case "copy":
      return { ...state, isCopying: action.state };
    default:
      return state;
  }
};
const handleCopy = async (text: string) => {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    // legacy method used as a fallback method
    return document.execCommand("copy", true, text);
  }
};

export const TodoItem = (todoWithUser: TodoWithUser) => {
  const [moreState, moreReducerDispatch] = useReducer<
    Reducer<MoreState, MoreAction>
  >(moreReducer, initialState);

  const { toast } = useToast();
  const editRef = useRef<HTMLInputElement>(null);
  const utils = api.useContext();
  const { data: session } = useSession();

  const updateTodo = api.todo.update.useMutation({
    onMutate: async ({ id, content }: TodoUpdate) => {
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

          // The rest of the todo items (not updated one)
          const restOfTodos: TodoWithUser[] = oldQueryData.filter(
            (todoItem: TodoWithUser) => todoItem.id != id
          );

          // The updated todo item's index
          const updatedTodoIndex: number = oldQueryData.findIndex(
            (todoItem: TodoWithUser) => todoItem.id == id
          );

          // Newly updated todo item
          const newlyUpdatedTodo = {
            author: {
              name: session?.user?.name ?? "",
              id: session?.user?.id ?? "",
            },
            content,
            createdAt: new Date(),
            updatedAt: new Date(),
            id,
            authorId: session?.user?.id ?? "",
          } as TodoWithUser;

          // add updated todo item to the rest of the todo items (with old index)
          restOfTodos.splice(updatedTodoIndex, 0, newlyUpdatedTodo);

          return restOfTodos;
        }
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
        title: "Error while updating todo",
        description: zodErrMessage
          ? zodErrMessage
          : "There was an error while updating todo. Please try again.",
      });
    },
    onSettled: () => {
      void utils.todo.findAll.invalidate();
    },
  });

  useEffect(() => {
    switch (true) {
      case moreState.isEditing:
        if (!editRef.current) {
          return;
        }

        editRef.current.value = todoWithUser.content;
        editRef.current.focus();

        break;
      case moreState.isDeleting:
        // Delete handled in TodoMore.tsx
        break;
      case moreState.isCopying:
        void handleCopy(todoWithUser.content)
          .then(() => {
            toast({
              title: "Success 👏",
              description: `Copied to clipboard "${todoWithUser.content}"`,
            });
          })
          .catch(() => {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem while copying the text.",
            });
          })
          .finally(() => {
            moreReducerDispatch({ type: "copy", state: false });
          });
        break;
    }
  }, [moreState, toast, todoWithUser.content]);

  return !moreState.isEditing ? (
    <TodoItemNormal
      moreReducerDispatch={moreReducerDispatch}
      moreState={moreState}
      todoWithUser={todoWithUser}
    />
  ) : (
    <TodoItemEdit
      editRef={editRef}
      moreReducerDispatch={moreReducerDispatch}
      todoWithUser={todoWithUser}
      updateTodo={
        updateTodo as unknown as { mutate: (content: TodoUpdate) => void }
      }
    />
  );
};
