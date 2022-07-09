import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { KBarProvider } from "kbar";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <KBarProvider>
      <NextNProgress />
      {/* <KBarPortal>
          <KBarPositioner>
            <KBarAnimator>
              <KBarSearch />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </KBarProvider>
  );
};

export default MyApp;
