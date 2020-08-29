import React from "react";
import { markdownToStringifiedHTML } from "lib/markdown";
import {
  prependBaseURL,
  fetchJSON,
  extractImage,
  ImageGroup,
} from "lib/cmsUtils";
import IndexPage from "components/IndexPage/IndexPage";
import Head from "next/head";
import { NewsletterProps } from "components/IndexPage/Newsletter";

export interface IndexProps {
  newsletter1: NewsletterProps;
  newsletter2: NewsletterProps;
  desktopBackgroundImage: ImageGroup;
  callToAction: string;
}

function Index(props: IndexProps) {
  return (
    <>
      <Head>
        <title>David Bruns</title>
        <meta
          name="description"
          content="David Bruns is a military thriller and science fiction author. Known for series such as The WMD Files, The SynCorp Saga, and The Dream Guild Chronicles."
        />
        <meta name="author" content="David Bruns" />
        <meta
          name="newsletters"
          content="The Two Navy Guys, The Speculative Readers Group"
        />
        <meta
          name="series"
          content="The WMD Files, The SynCorp Sage, The Dream Guild Chronicles"
        />
        <meta
          name="books"
          content={`
            weapons of mass deception,
            rules of engagement,
            jihadi apprentice,
            the pandora deception,
            the lazarus protocol,
            cassandra's war,
            hostile takeover,
            valhalla station,
            masada's gate,
            serpent's fury,
            irradience,
            sight,
            sacrifice
          `}
        />
      </Head>
      <IndexPage {...props} />
    </>
  );
}

export async function getStaticProps(): Promise<{
  props: IndexProps;
  revalidate: number;
}> {
  const data = await fetchJSON(prependBaseURL({ endpoint: "/landing-page" }));

  return {
    props: {
      callToAction: data.call_to_action,
      desktopBackgroundImage: extractImage({
        cmsImage: data.desktop_background_image,
      }),
      newsletter1: {
        title: data.newsletter_1.title,
        body: markdownToStringifiedHTML({ md: data.newsletter_1.body }),
        mobileBookImage: extractImage({
          cmsImage: data.newsletter_1.mobile_book_image,
        }),
      },
      newsletter2: {
        title: data.newsletter_2.title,
        body: markdownToStringifiedHTML({ md: data.newsletter_2.body }),
        mobileBookImage: extractImage({
          cmsImage: data.newsletter_2.mobile_book_image,
        }),
      },
    },
    revalidate: 15,
  };
}

export default Index;
