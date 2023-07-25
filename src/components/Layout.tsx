import Head from "next/head";
import { Header } from "~/sections/Header";
import { type ReactNode } from "react";
import { Toaster } from "~/components/ui/toaster";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>#minitodo</title>
        <meta
          name="description"
          content="The most minimalistic todo application."
        />
      </Head>
      <Header />
      <div className="flex flex-grow justify-center">{children}</div>
      <Toaster />
    </>
  );
};
