import { Button } from "../shadcn-ui/button";
import { Input } from "../shadcn-ui/input";

export const TodoBar = () => {
  return (
    <div className="flex w-full items-center space-x-2 self-center px-6 pt-2  md:w-2/3 md:flex-grow-0 lg:w-2/3 xl:w-1/2">
      <Input placeholder="Enter your task!" />
      <Button type="submit">Add</Button>
    </div>
  );
};
