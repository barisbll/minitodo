import Head from "next/head";
import { Header } from "~/sections/Header";
import { type ReactNode } from "react";
import { Toaster } from "~/components/shadcn-ui/toaster";

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
      <div className="flex flex-grow justify-center">{children}</div>
      <Toaster />
      {/* <AuthShowcase /> */}
    </>
  );
};
