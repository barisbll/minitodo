import Head from "next/head";
import { Header } from "~/sections/Header";
import { type ReactNode } from "react";
import { Todo } from "~/sections/Todo";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Todo-T3</title>
        <meta name="description" content="A Todo app built with t3 stack." />
      </Head>
      <Header />
      <div className="flex flex-grow justify-center">
        <Todo />
      </div>
      {/* <AuthShowcase /> */}
    </>
  );
};

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
