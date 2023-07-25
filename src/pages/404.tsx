import { Button } from "~/components/ui/button";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="mt-40 flex flex-col items-center justify-center gap-8">
      <h1 className="scroll-m-20 text-5xl font-light tracking-tight lg:text-5xl">
        Got lost ?
      </h1>
      <Button asChild className="scroll-m-20">
        <Link href="/">Take me home :)</Link>
      </Button>
    </div>
  );
};

export default Custom404;
