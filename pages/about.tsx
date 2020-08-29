import React from "react";
import { markdownToStringifiedHTML } from "lib/markdown";
import {
  prependBaseURL,
  fetchJSON,
  extractImage,
  ImageGroup,
} from "lib/cmsUtils";
import { STRINGIFIED_HTML } from "lib/models/aliases";
import AboutPage from "components/AboutPage";
import Head from "next/head";

export interface AboutProps {
  headerText: string;
  headshot: ImageGroup;
  description: STRINGIFIED_HTML;
  videoHeaderText: string;
  youtubeEmbedLink: string;
}

function About(props: AboutProps) {
  return (
    <>
      <Head>
        <title>About · David Bruns</title>
        <meta
          name="description"
          content="An in-depth description of the author David Bruns' life is given along with a video interview."
        />
        <meta name="author" content="David Bruns" />
      </Head>
      <AboutPage {...props} />
    </>
  );
}

export async function getStaticProps(): Promise<{
  props: AboutProps;
  revalidate: number;
}> {
  const data = await fetchJSON(prependBaseURL({ endpoint: "/about-page" }));

  return {
    props: {
      headerText: data.header_text,
      headshot: extractImage({ cmsImage: data.headshot }),
      description: markdownToStringifiedHTML({ md: data.description }),
      videoHeaderText: data.video_header_text,
      youtubeEmbedLink: data.youtube_embed_link,
    },
    revalidate: 15,
  };
}

export default About;
