import React from "react";
import { markdownToStringifiedHTML } from "lib/markdown";
import { prependBaseURL, fetchJSON } from "lib/cmsUtils";
import { STRINGIFIED_HTML } from "lib/models/aliases";
import AboutPage from "components/AboutPage";

export interface AboutProps {
  headerText: string;
  headshot: string;
  description: STRINGIFIED_HTML;
  videoHeaderText: string;
  youtubeEmbedLink: string;
}

function About(props: AboutProps) {
  return <AboutPage {...props} />;
}

export async function getStaticProps(): Promise<{
  props: AboutProps;
  revalidate: number;
}> {
  const data = await fetchJSON(prependBaseURL({ endpoint: "/about-page" }));

  return {
    props: {
      headerText: data.header_text,
      headshot: prependBaseURL({ endpoint: data.headshot?.url }),
      description: markdownToStringifiedHTML({ md: data.description }),
      videoHeaderText: data.video_header_text,
      youtubeEmbedLink: data.youtube_embed_link,
    },
    revalidate: 15,
  };
}

export default About;
