import React from "react";
import Header from "components/Header";
import { markdownToStringifiedHTML } from "lib/markdown";

function About({ data }) {
  return (
    <div className="relative flex flex-col justify-between flex-1 sm:min-h-screen">
      <Header />
      <main className="relative z-20 pt-4">
        <h1 className="text-3xl font-semibold leading-tight tracking-wider text-center text-gray-800">
          About David
        </h1>
        <div className="max-w-5xl p-4 mx-auto space-y-4">
          <p className="space-y-4 tracking-wider text-justify text-gray-800">
            <img
              src={
                "https://www.master-7rqtwti-hmyhm4xzoek6k.us-2.platformsh.site" +
                data.headshot.url
              }
              className="w-full mb-4 ml-4 sm:w-auto"
              style={{ float: "right" }}
            />
            <div
              dangerouslySetInnerHTML={{ __html: data.description }}
              className="space-y-4"
            />
          </p>
          <div className="flex flex-col items-center justify-center p-4 space-y-4 bg-gray-800 shadow-lg">
            <h1 className="text-lg font-semibold leading-tight tracking-wider text-center text-white ">
              {data.video_header_text}
            </h1>
            <iframe
              style={{
                width:
                  "min(calc(64rem - 32px - 32px), calc(100vw - 32px - 32px))",
                height:
                  "calc(min(calc(64rem - 32px - 32px), calc(100vw - 32px - 32px)) * 9 / 16)",
              }}
              src={data.youtube_embed_link}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const data = await (
    await fetch(
      "https://www.master-7rqtwti-hmyhm4xzoek6k.us-2.platformsh.site/about-page"
    )
  ).json();

  return {
    props: {
      data: {
        ...data,
        description: markdownToStringifiedHTML(data.description),
      },
    },
    revalidate: 15,
  };
}

export default About;
