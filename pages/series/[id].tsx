import React from "react";
import SeriesIdPage from "components/SeriesIdPage";
import {
  fetchJSON,
  prependBaseURL,
  extractAndSortRecommendations,
} from "lib/cmsUtils";
import { markdownToStringifiedHTML } from "lib/markdown";
import { Series } from "lib/models/Series";
import { Genre } from "lib/models/Genre";
import { Book } from "lib/models/Book";
import { STRINGIFIED_HTML } from "lib/models/aliases";
import { BooksBookProp as BookProps } from "pages/books";
import { useRouter } from "next/dist/client/router";
import { Author } from "lib/models/Author";

export interface SeriesIdProps {
  name: string;
  tagLine: string;
  description: STRINGIFIED_HTML;
  genres: string[];
  books: BookProps[];
  authors: string[];
  recommendations: {
    type: string;
    priority: number;
    info:
      | { id: number; coverImageURL: string }
      | { id: number; name: string }
      | { id: number; name: string; avatarURL?: string };
  }[];
}

function SeriesId(props: SeriesIdProps) {
  const router = useRouter();

  return router.isFallback ? null : <SeriesIdPage {...props} />;
}

export async function getStaticPaths() {
  const data = await fetchJSON(prependBaseURL({ endpoint: "/series" }));

  return {
    paths: data.map(({ id }) => ({ params: { id: id.toString() } })),
    fallback: true,
  };
}

export async function getStaticProps({
  params,
}): Promise<{ props: SeriesIdProps; revalidate: number }> {
  const series: Series = await fetchJSON(
    prependBaseURL({ endpoint: `/series/${params.id}` })
  );

  return {
    props: {
      name: series.name,
      tagLine: series.tag_line,
      description:
        markdownToStringifiedHTML({ md: series.description }) ?? null,
      genres: (series.genres as Genre[]).map(({ name }) => name),
      books: (series.books as Book[]).map(
        ({ id, cover: { url, height, width } }) => ({
          id,
          coverImageURL: prependBaseURL({ endpoint: url }),
          height,
          width,
        })
      ),
      authors: (series.authors as Author[]).map(({ name }) => name),
      recommendations: extractAndSortRecommendations(series),
    },
    revalidate: 15,
  };
}

export default SeriesId;
