import React from "react";
import { AppProps } from "next/app";
import "lib/tailwind.css";
import Header from "components/Header";
import PrimaryLayout from "components/PrimaryLayout";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta key="robots" name="robots" content="all" />
        <meta key="googlebot" name="googlebot" content="all" />
      </Head>
      <PrimaryLayout header={<Header />} body={<Component {...pageProps} />} />
    </>
  );
}

export default App;
