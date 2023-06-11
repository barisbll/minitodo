import Head from "next/head";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import { type ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Next Tailwind Theme</title>
        <meta
          name="description"
          content="Create dark mode in next and tailwind"
        />
      </Head>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
