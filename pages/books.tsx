import React from "react";
import { fetchJSON, prependBaseURL } from "lib/cmsUtils";
import { Book } from "lib/models/Book";
import { Series } from "lib/models/Series";
import BooksPage from "components/BooksPage";
import { STRINGIFIED_HTML } from "lib/models/aliases";
import Head from "next/head";

export interface BooksBookProp {
  id: number;
  coverImageURL: string;
  height: number;
  width: number;
  title: string;
}

export interface BooksSeriesProp {
  id: number;
  name: string;
  description: STRINGIFIED_HTML;
  books: BooksBookProp[];
}

export interface BooksUniverseProp {
  id: number;
  name: string;
  series: BooksSeriesProp[];
  books: BooksBookProp[];
}

export interface BooksProps {
  universes: BooksUniverseProp[];
  universelessSeries: BooksSeriesProp[];
  universelessAndSerieslessBooks: BooksBookProp[];
}

function Books(props: BooksProps) {
  return (
    <>
      <Head>
        <title>Books · David Bruns</title>
        <meta
          name="description"
          content="A complete list of books, series, and anthologies written by the author David Bruns."
        />
        <meta name="author" content="David Bruns" />
        <meta
          name="books, series, and universes"
          content={[
            ...props.universes.flatMap(({ name, series }) => [
              name,
              ...series.flatMap(({ name, books }) => [
                name,
                ...books.flatMap(({ title }) => [title]),
              ]),
            ]),
            ...props.universelessSeries.flatMap(({ name, books }) => [
              name,
              ...books.flatMap(({ title }) => [title]),
            ]),
            ...props.universelessAndSerieslessBooks.flatMap(({ title }) => [
              title,
            ]),
          ].join(", ")}
        />
      </Head>
      <BooksPage {...props} />
    </>
  );
}

export async function getStaticProps(): Promise<{
  props: BooksProps;
  revalidate: number;
}> {
  function processBook(book: Book): BooksBookProp {
    const [_, cover] = Object.entries(book.cover.formats).reduce(
      (acc, elem) => {
        switch (acc[0]) {
          case undefined:
            if (elem[1].size < 150 && elem[1].size > acc[1].size) return elem;
          case "thumbnail":
            if (["small", "medium", "large"].includes(elem[0])) return elem;
            break;
          case "small":
            if (["medium", "large"].includes(elem[0])) return elem;
            break;
          case "medium":
            if (["large"].includes(elem[0])) return elem;
            break;
          case "large":
            if ([].includes(elem[0])) return elem;
            break;
        }
        return acc;
      },
      [undefined, book.cover]
    );

    console.log([_, cover]);

    return {
      id: book.id,
      coverImageURL: prependBaseURL({ endpoint: cover.url }),
      height: cover.height,
      width: cover.width,
      title: book.title,
    };
  }

  function processSeries(series: Series): BooksSeriesProp {
    return {
      id: series.id,
      name: series.name,
      description: series.description,
      books: (series.books as Book[]).map(processBook),
    };
  }

  const [
    partialUniverses,
    { universelessSeries, allSeries },
    universelessAndSerieslessBooks,
  ] = await Promise.all([
    fetchJSON(
      prependBaseURL({
        endpoint: "/universes",
      })
    ) as Promise<any[]>,
    fetchJSON(
      prependBaseURL({
        endpoint: "/series",
      })
    ).then((series: Series[]) => {
      return {
        universelessSeries: series
          .filter(({ universe }) => !universe)
          .map(processSeries),
        allSeries: series,
      };
    }),
    fetchJSON(
      prependBaseURL({
        endpoint: "/books",
      })
    ).then((books: Book[]) => {
      return books
        .filter(({ series, universe }) => !(series || universe))
        .map(processBook);
    }),
  ]);

  const universes = partialUniverses.map(({ name, id, series, books }) => {
    return {
      id,
      name,
      books: books.map(processBook),
      series: series
        .map(({ id }) => {
          return allSeries.find(({ id: _id }) => id === _id);
        })
        .map(processSeries),
    };
  });

  return {
    props: {
      universes,
      universelessSeries,
      universelessAndSerieslessBooks,
    },
    revalidate: 15,
  };
}

export default Books;
