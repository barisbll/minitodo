import Head from "next/head";
import Header from "~/sections/Header";
import { type ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Todo-T3</title>
        <meta name="description" content="A Todo app built with t3 stack." />
      </Head>
      <Header />
      <div className="flex h-screen flex-col">
        {/* <main className="flex-grow">{children}</main> */}
      </div>
    </>
  );
};

export default Layout;
