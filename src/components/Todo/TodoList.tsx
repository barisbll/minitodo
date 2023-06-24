import { type TodoWithUser } from "./Todo.type";
import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todoItems: TodoWithUser[];
};

export const TodoList = ({ todoItems }: TodoListProps) => {
  return (
    <div className="flex w-full flex-col items-center px-4">
      {todoItems.map((item) => (
        <TodoItem {...item} key={item.id} />
      ))}
    </div>
  );
};
