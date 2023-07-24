import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Github } from "lucide-react";

const Auth: React.FC = () => {
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
            onClick={() => signIn("github", { callbackUrl: "/" })}
          >
            <Github className="mr-2 h-4 w-4" />
            <span>Github</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
