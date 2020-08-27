import React from "react";
import { SeriesIdProps } from "pages/series/[id]";
import { STRINGIFIED_HTML } from "lib/models/aliases";
import BookSet from "./BookSet";
import RecommendationsBar from "./RecommendationsBar";
import ContentPageLayout from "./ContentPageLayout";
import ContentSubheader from "./ContentSubheader";

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

function SeriesInfo({
  name,
  tagLine,
  description,
  authors,
  genres,
}: {
  name?: string;
  tagLine?: string;
  description?: STRINGIFIED_HTML;
  authors?: string[];
  genres?: string[];
}) {
  return (
    <div className="space-y-4">
      <SeriesHeader name={name} tagLine={tagLine} />
      <ContentSubheader authors={authors} genres={genres} />
      {description && (
        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className="space-y-4 tracking-wider text-gray-800"
        />
      )}
    </div>
  );
}

function SeriesIdPage(props: SeriesIdProps) {
  return (
    <ContentPageLayout>
      <SeriesInfo {...props} />
      <BookSet books={props.books} size="3D" />
      <RecommendationsBar recommendations={props.recommendations} />
    </ContentPageLayout>
  );
}

export default SeriesIdPage;
