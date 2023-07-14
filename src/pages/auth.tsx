import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { Button } from "~/components/shadcn-ui/button";
import { useRouter } from "next/router";

const AuthShowcase: React.FC = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  if (status === "authenticated") {
    void router.push("/");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </div>
  );
};

export default AuthShowcase;
