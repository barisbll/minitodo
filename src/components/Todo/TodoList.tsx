import { type TodoWithUser } from "./Todo.type";
import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todoItems: TodoWithUser[];
  listMode?: "all" | "active" | "completed";
};

const renderByMode = (
  item: TodoWithUser,
  listMode: TodoListProps["listMode"]
) => {
  switch (listMode) {
    case "active":
      if (item.done) {
        return null;
      }
      break;
    case "completed":
      if (!item.done) {
        return null;
      }
      break;
    default:
      break;
  }
  return <TodoItem key={item.id} {...item} />;
};

export const TodoList = ({ todoItems, listMode }: TodoListProps) => {
  return (
    <div className="flex w-full flex-col items-center px-4">
      {todoItems.map((item) => renderByMode(item, listMode))}
    </div>
  );
};
