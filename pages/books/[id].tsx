import React from "react";
import { useRouter } from "next/dist/client/router";
import { markdownToStringifiedHTML } from "lib/markdown";
import {
  fetchJSON,
  prependBaseURL,
  extractAndSortRecommendations,
} from "lib/cmsUtils";
import { STRINGIFIED_HTML } from "lib/models/aliases";
import BooksIdPage from "components/BooksIdPage";
import Head from "next/head";

export interface BooksIdProps {
  title: string;
  tagLine: string;
  description: STRINGIFIED_HTML;
  formats: string[];
  buyLinks: { platform: string; link: string }[];
  genres: string[];
  authors: string[];
  coverImageURL: string;
  recommendations: {
    type: string;
    priority: number;
    info:
      | { id: number; coverImageURL: string }
      | { id: number; name: string }
      | { id: number; name: string; avatarURL?: string };
  }[];
  series: string; // todo
  universe: string; // todo
  pageCount: number;
  wordCount: number;
  asin: string;
  isbn10: number;
  isbn13: number;
  id: number;
  height: number;
  width: number;
}

function Book(props: BooksIdProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{`${props.title ? `${props.title} · ` : ""}David Bruns`}</title>
      </Head>
      {router.isFallback ? null : <BooksIdPage {...props} />}
    </>
  );
}

export async function getStaticProps({ params }) {
  const data = await fetchJSON(
    prependBaseURL({ endpoint: `/books/${params.id}` })
  );

  return {
    props: {
      title: data.title,
      tagLine: data.tag_line,
      ...(data.description
        ? { description: markdownToStringifiedHTML({ md: data.description }) }
        : {}),
      formats: data.formats.map(({ name }) => name),
      buyLinks: data.buy_links.map(({ platform, link }) => ({
        platform,
        link,
      })),
      genres: data.genres.map(({ name }) => name),
      authors: data.authors.map(({ name }) => name),
      ...(data.cover?.url
        ? { coverImageURL: prependBaseURL({ endpoint: data.cover.url }) }
        : {}),
      height: data.cover?.height ?? null,
      width: data.cover?.width ?? null,
      recommendations: extractAndSortRecommendations(data),
      ...(data.series?.name
        ? { series: { id: data.series.id, name: data.series.name } }
        : {}),
      ...(data.universe?.name
        ? { universe: { id: data.universe.id, name: data.universe.name } }
        : {}),
      ...(data.page_count ? { pageCount: data.page_count } : {}),
      ...(data.word_count ? { wordCount: data.word_count } : {}),
      ...(data.asin ? { asin: data.asin } : {}),
      ...(data.isbn_10 ? { isbn10: data.isbn_10 } : {}),
      ...(data.isbn_13 ? { isbn13: data.isbn_13 } : {}),
    },
    revalidate: 15,
  };
}

export async function getStaticPaths() {
  const data = await fetchJSON(prependBaseURL({ endpoint: "/books" }));

  return {
    paths: data.map(({ id }) => ({ params: { id: id.toString() } })),
    fallback: true,
  };
}

export default Book;
