import React from "react";
import { AboutProps } from "pages/about";

function Header({ children }: { children: string }) {
  return (
    <h1 className="text-4xl font-semibold leading-tight tracking-wider text-center text-gray-800">
      {children}
    </h1>
  );
}

function Blurb({
  headshot,
  description,
}: {
  headshot: string;
  description: string;
}) {
  return (
    <div>
      <img
        src={headshot}
        className="float-left w-full pb-2 rounded-sm shadow-lg sm:pr-4 sm:w-auto sm:h-96"
      />
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className="space-y-4 text-base text-justify text-gray-800 "
      />
    </div>
  );
}

function VideoSection({
  videoHeaderText,
  youtubeEmbedLink,
}: {
  videoHeaderText: string;
  youtubeEmbedLink: string;
}) {
  return (
    <div className="flex flex-col items-center p-4 space-y-4 bg-gray-800 rounded-sm shadow-lg">
      <h2 className="text-xl font-bold leading-tight tracking-wider text-center text-white">
        {videoHeaderText}
      </h2>
      <iframe
        src={youtubeEmbedLink}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        className="rounded-sm shadow-lg"
      ></iframe>
      <style jsx>{`
        iframe {
          width: calc(min(72rem, 100vw) - 64px);
          height: calc((min(72rem, 100vw) - 64px) * 9 / 16);
        }
      `}</style>
    </div>
  );
}

function AboutPage({
  headerText,
  headshot,
  description,
  videoHeaderText,
  youtubeEmbedLink,
}: AboutProps) {
  return (
    <div className="relative flex flex-col items-center justify-start flex-1">
      <div className="flex flex-col w-full max-w-6xl p-4 space-y-4">
        <Header>{headerText}</Header>
        <Blurb {...{ headshot, description }} />
        <VideoSection {...{ videoHeaderText, youtubeEmbedLink }} />
      </div>
    </div>
  );
}

export default AboutPage;
