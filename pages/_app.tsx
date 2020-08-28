import React, { useState } from "react";
import { AppProps } from "next/app";
import "lib/tailwind.css";
import Header from "components/Header";
import PrimaryLayout from "components/PrimaryLayout";

function App({ Component, pageProps }: AppProps) {
  return (
    <PrimaryLayout header={<Header />} body={<Component {...pageProps} />} />
  );
}

export default App;
