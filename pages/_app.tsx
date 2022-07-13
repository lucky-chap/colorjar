import "../styles/globals.css";
import { useState } from "react";
import NextNProgress from "nextjs-progressbar";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import CommandPalette from "../components/CommandPalette";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CommandPalette>
          {" "}
          <NextNProgress />
          <Toaster />
          <SessionProvider session={session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </CommandPalette>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
