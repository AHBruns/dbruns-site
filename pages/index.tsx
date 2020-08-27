import React from "react";
import { markdownToStringifiedHTML } from "lib/markdown";
import { STRINGIFIED_HTML } from "lib/models/aliases";
import { prependBaseURL, fetchJSON } from "lib/cmsUtils";
import IndexPage from "components/IndexPage/IndexPage";

export interface IndexCardProps {
  title: string;
  body: STRINGIFIED_HTML;
  mobileBookImage: string;
}

export interface IndexProps {
  card1: IndexCardProps;
  card2: IndexCardProps;
  primaryText: string;
}

function Index(props: IndexProps) {
  return <IndexPage {...props} />;
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
    mobile_book_image: { url?: string };
    body: string;
  }) {
    return {
      title: title,
      mobileBookImage: prependBaseURL({
        endpoint: mobile_book_image?.url,
      }),
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
