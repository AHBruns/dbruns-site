import React from "react";
import { markdownToStringifiedHTML } from "lib/markdown";
import { STRINGIFIED_HTML } from "lib/models/aliases";
import { prependBaseURL, fetchJSON } from "lib/cmsUtils";
import IndexPage from "components/IndexPage/IndexPage";
import Head from "next/head";

export interface IndexCardProps {
  title: string;
  body: STRINGIFIED_HTML;
  mobileBookImage: {
    url: string;
    height: number;
    width: number;
  };
}

export interface IndexProps {
  card1: IndexCardProps;
  card2: IndexCardProps;
  primaryText: string;
}

function Index(props: IndexProps) {
  return (
    <>
      <Head>
        <title>David Bruns</title>
      </Head>
      <IndexPage {...props} />
    </>
  );
}

export async function getStaticProps(): Promise<{
  props: IndexProps;
  revalidate: number;
}> {
  function processCardData({
    title,
    mobile_book_image,
    body,
  }: {
    title: string;
    mobile_book_image: { url?: string; width?: number; height?: number };
    body: string;
  }) {
    return {
      title: title,
      mobileBookImage: {
        url: prependBaseURL({
          endpoint: mobile_book_image?.url,
        }),
        width: mobile_book_image?.width,
        height: mobile_book_image?.height,
      },
      body: markdownToStringifiedHTML({ md: body }),
    };
  }

  const [primaryText, card1, card2] = await Promise.all([
    fetchJSON(prependBaseURL({ endpoint: "/landing-page-main-text" })).then(
      (mainText) => mainText.text
    ),
    fetchJSON(
      prependBaseURL({ endpoint: "/the-twonavy-guys-reader-group-card" })
    ).then(processCardData),
    fetchJSON(
      prependBaseURL({ endpoint: "/the-speculative-readers-group-card" })
    ).then(processCardData),
  ]);

  return {
    props: {
      card1,
      card2,
      primaryText,
    },
    revalidate: 15,
  };
}

export default Index;
