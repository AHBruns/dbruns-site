import React from "react";
import ContentPageLayout from "./ContentPageLayout";
import { BooksIdProps } from "pages/books/[id]";
import ContentSubheader from "./ContentSubheader";
import ThreeDimensionalBook from "./3DBook";
import RecommendationsBar from "./RecommendationsBar";
import BuyLinkBar from "./BuyLinkBar";

function SeriesHeader({ name, tagLine }: { name?: string; tagLine?: string }) {
  return name || tagLine ? (
    <div className="space-y-2">
      {name && (
        <h1 className="text-5xl font-semibold leading-none tracking-wider text-gray-800">
          {name}
        </h1>
      )}
      {tagLine && (
        <h2 className="text-2xl font-semibold leading-tight tracking-wider text-gray-700 ">
          {tagLine}
        </h2>
      )}
    </div>
  ) : null;
}

function BookInfo({
  title,
  tagLine,
  authors,
  genres,
}: {
  title?: string;
  tagLine?: string;
  authors?: string[];
  genres?: string[];
}) {
  return (
    <div className="space-y-4">
      <SeriesHeader name={title} tagLine={tagLine} />
      <ContentSubheader authors={authors} genres={genres} />
    </div>
  );
}

function BooksIdPage({
  title,
  tagLine,
  authors,
  genres,
  coverImageURL,
  description,
  recommendations,
  buyLinks,
  height,
  width,
}: BooksIdProps) {
  return (
    <ContentPageLayout>
      {/* img & basic info */}
      <div className="grid grid-flow-row grid-cols-3 gap-8 py-8">
        <div className="col-span-3 row-span-1">
          <BookInfo
            title={title}
            tagLine={tagLine}
            authors={authors}
            genres={genres}
          />
        </div>
        <div className="col-span-3">
          <div className="float-left min-w-full pb-8 md:pb-8 md:pl-4 md:pr-12 md:min-w-0 ">
            <ThreeDimensionalBook
              src={coverImageURL}
              height={height}
              width={width}
            />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className="prose max-w-none"
          />
        </div>
        <div className="col-span-3">
          <BuyLinkBar buyLinks={buyLinks} />
        </div>
        <div className="col-span-3">
          <RecommendationsBar recommendations={recommendations} />
        </div>
      </div>
      {/* description */}
      {/* buy links */}
      {/* recommendations */}
    </ContentPageLayout>
  );
}

export default BooksIdPage;
