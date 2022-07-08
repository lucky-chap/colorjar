import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Link href={"/test"}>
      <button>Next page</button>
    </Link>
  );
};

export default Home;
