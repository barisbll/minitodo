import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Github } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { switchToRoleGuest } from "~/store/role";

const Auth: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGuestLogin = () => {
    // TODO: change the redux state
    dispatch(switchToRoleGuest());
    void router.push("/todos");
  };

  return (
    <div className="flex w-full items-center justify-center pt-40">
      <Card className="w-5/6 md:w-1/2 lg:w-1/3">
        <CardHeader>
          <CardTitle className="text-center text-xl font-light">
            Create an Account or Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={() => signIn("github", { callbackUrl: "/todos" })}
          >
            <Github className="mr-2 h-4 w-4" />
            <span>Github</span>
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="mt-4 w-full"
                // onClick={() => void signIn("google", { callbackUrl: "/todos" })}
              >
                <FaGoogle className="mr-2 h-4 w-4" />
                <span>Google</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <p className="text-sm">Coming out soon!</p>
            </PopoverContent>
          </Popover>
        </CardContent>
        <CardFooter className="flex justify-around">
          <Button variant="outline" className="w-36" asChild>
            <Link href={"/"}>Cancel</Link>
          </Button>
          <Button className="w-36" onClick={handleGuestLogin}>
            Wonder 👀
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
