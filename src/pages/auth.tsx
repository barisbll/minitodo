import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const AuthShowcase: React.FC = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return <div className="flex items-center justify-center"></div>;
};

export default AuthShowcase;
