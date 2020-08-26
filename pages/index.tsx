import React from "react";
import Header from "components/Header";
import Button from "components/Button";
import { markdownToStringifiedHTML } from "lib/markdown";

function NewsletterCard({ title, body }: { title: string; body: string }) {
  return (
    <div
      className="relative p-4 space-y-4 bg-gray-800 shadow-md md:bg-opacity-75 md:max-w-lg"
      style={{
        backdropFilter: "blur(10px)",
      }}
    >
      <h1 className="text-xl font-bold leading-tight tracking-wider text-center text-white uppercase md:text-left">
        {title}
      </h1>
      <div
        dangerouslySetInnerHTML={{ __html: body }}
        className="space-y-4 font-light tracking-wider text-gray-100"
      />
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <input
          className="flex-1 px-3 py-2 text-gray-800 bg-white shadow-md /rounded-md focus:outline-none"
          placeholder="john.doe@gmail.com"
        />
        <Button className="px-3 py-2 font-semibold tracking-wider text-white bg-gray-600 shadow-md hover:bg-gray-700 md:bg-gray-800">
          Submit
        </Button>
      </div>
    </div>
  );
}

function Index({ data }: any) {
  return (
    <div className="relative z-10 flex flex-col justify-between sm:min-h-screen">
      <Header />
      <div className="flex items-center justify-center flex-1 p-4 overflow-hidden">
        <img
          src="https://scx2.b-cdn.net/gfx/news/hires/2019/3-mars.jpg"
          className="absolute inset-0 hidden object-cover min-w-full min-h-full md:block"
        />
        <div className="px-4 py-4 space-y-8 md:px-16 md:space-y-0">
          <h1 className="relative z-10 block max-w-5xl p-4 text-3xl font-bold leading-tight tracking-wider text-center text-white uppercase bg-gray-800 md:text-gray-800 md:bg-white md:hidden">
            {data.mainText.text}
          </h1>
          <div className="relative z-20 flex transform md:justify-end md:translate-x-8 md:translate-y-8">
            <NewsletterCard
              title={data.theTwoNavyGuysReaderGroup.title}
              body={data.theTwoNavyGuysReaderGroup.body}
            />
          </div>
          <h1 className="relative z-10 hidden max-w-5xl px-8 py-12 text-5xl font-bold leading-tight tracking-wider text-center text-gray-800 uppercase bg-white md:block">
            {data.mainText.text}
          </h1>
          <div className="relative z-20 flex transform md:justify-start md:-translate-x-8 md:-translate-y-8">
            <NewsletterCard
              title={data.theSpeculativeReadersGroup.title}
              body={data.theSpeculativeReadersGroup.body}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const twoNavyGuysData = await (
    await fetch(
      "https://www.master-7rqtwti-hmyhm4xzoek6k.us-2.platformsh.site/the-twonavy-guys-reader-group-card"
    )
  ).json();

  const speculativeReadersData = await (
    await fetch(
      "https://www.master-7rqtwti-hmyhm4xzoek6k.us-2.platformsh.site/the-speculative-readers-group-card"
    )
  ).json();

  return {
    props: {
      data: {
        theTwoNavyGuysReaderGroup: {
          title: twoNavyGuysData.title,
          body: markdownToStringifiedHTML(twoNavyGuysData.body),
        },
        theSpeculativeReadersGroup: {
          title: speculativeReadersData.title,
          body: markdownToStringifiedHTML(speculativeReadersData.body),
        },
        mainText: await (
          await fetch(
            "https://www.master-7rqtwti-hmyhm4xzoek6k.us-2.platformsh.site/landing-page-main-text"
          )
        ).json(),
      },
    },
    revalidate: 15,
  };
}

export default Index;
