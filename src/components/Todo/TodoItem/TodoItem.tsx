import { type Reducer, useState, useReducer, useEffect, useRef } from "react";

import { useToast } from "~/components/shadcn-ui/use-toast";
import { type TodoWithUser } from "../Todo.type";
import { TodoItemEdit } from "./TodoItemEdit";
import { TodoItemNormal } from "./TodoItemNormal";

const initialState = {
  isEditing: false,
  isDeleting: false,
  isCopying: false,
};

export type MoreState = typeof initialState;
export type MoreAction = {
  type: "edit" | "delete" | "copy";
  state: boolean;
};

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

  useEffect(() => {
    switch (true) {
      case moreState.isEditing:
        if (editRef.current) {
          editRef.current.value = todoWithUser.content;
          editRef.current.focus();
        }
        break;
      case moreState.isDeleting:
        console.log("Deleting");
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
    />
  );
};
