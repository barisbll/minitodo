import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="dark">
      <Head>
        <title>Todo-T3</title>
        <meta
          name="description"
          content="Todo Application Made With T3 Stack"
        />
      </Head>
      <div className="text-red-600">Hello World!</div>
    </div>
  );
};

export default Home;
