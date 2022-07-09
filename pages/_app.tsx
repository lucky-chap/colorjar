/* eslint-disable no-return-assign */
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import CommandPalette from "../components/CommandPalette";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CommandPalette>
      {" "}
      <NextNProgress />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CommandPalette>
  );
};

export default MyApp;
