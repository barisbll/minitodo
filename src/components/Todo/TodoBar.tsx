import { Button } from "../shadcn-ui/button";
import { Input } from "../shadcn-ui/input";
import { api } from "~/utils/api";
import { useCallback, useState } from "react";

export const TodoBar = () => {
  const [todo, setTodo] = useState("");
  // TODO: Later add logic to adding todo by invalidating the get todos query
  const addTodo = api.todo.create.useMutation({
    onSuccess: () => {
      setTodo("");
      console.log("Added todo");
    },
    onError: (error) => {
      // TODO: Add error toast
      console.log(error);
    },
  });

  const handleInputOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTodo(event.target.value);
    },
    []
  );

  const handleAddTodo = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      addTodo.mutate({
        content: todo,
      });
    },
    [addTodo, todo]
  );

  return (
    <div className="flex w-full items-center space-x-2 self-center px-6 pt-2  md:w-2/3 md:flex-grow-0 lg:w-2/3 xl:w-1/2">
      <Input
        placeholder="Enter your task!"
        value={todo}
        onChange={handleInputOnChange}
      />
      <Button type="submit" onClick={handleAddTodo}>
        Add
      </Button>
    </div>
  );
};
