import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
