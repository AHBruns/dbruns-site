import React from "react";
import { BooksProps, BooksSeriesProp, BooksUniverseProp } from "pages/books";
import Link from "next/link";
import { STRINGIFIED_HTML } from "lib/models/aliases";
import BookSet from "./BookSet";

function Series({
  id,
  name,
  description,
  books,
  isNested,
}: BooksSeriesProp & { isNested?: boolean } & {
  description?: STRINGIFIED_HTML;
}) {
  let header = (
    <h1
      className={`${
        isNested ? "top-14" : "top-0"
      } z-10 sticky shadow-lg flex items-center justify-center text-2xl font-medium leading-tight tracking-widest text-center group-focus:bg-opacity-75 group-focus:bg-gray-900 text-white bg-gray-800 bg-opacity-75 BACKDROP_BLUR h-12`}
    >
      {name}
    </h1>
  );
  return (
    <div className="sm:shadow-lg">
      {id ? (
        <Link href="/series/[id]" as={`/series/${id}`}>
          <a className="focus:outline-none group">{header}</a>
        </Link>
      ) : (
        header
      )}
      <div className="p-4 space-y-4 bg-gray-800 bg-opacity-25 BACKDROP_BLUR">
        {description && (
          <p className="max-w-4xl mx-auto leading-tight tracking-wider text-center text-white">
            {description}
          </p>
        )}
        <BookSet books={books} size="3D" />
      </div>
    </div>
  );
}

function Universe({ id, name, series, books }: BooksUniverseProp) {
  return (
    <div className="sm:space-y-4 sm:shadow-lg">
      <Link href="/universes/[id]" as={`/universes/${id}`}>
        <a className="focus:outline-none group">
          <h1 className="sticky top-0 z-20 flex items-center justify-center text-3xl font-semibold leading-tight tracking-widest text-center text-white bg-gray-800 shadow-lg group-focus:bg-gray-900 h-14">
            {name}
          </h1>
        </a>
      </Link>
      <div className="flex flex-col items-stretch /bg-white /bg-opacity-25 sm:space-y-4">
        {series.map((series) => (
          <Series {...series} isNested />
        ))}
        <Series
          name="Standalone Books"
          id={undefined}
          description={undefined}
          books={books}
          isNested
        />
      </div>
    </div>
  );
}

function BackgroundImage({ url }: { url: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img src={url} className="object-cover min-w-full min-h-full" />
    </div>
  );
}

function BooksPage({
  universes,
  universelessSeries,
  universelessAndSerieslessBooks,
}: BooksProps) {
  return (
    <div className="relative flex-1">
      <BackgroundImage url="https://scx2.b-cdn.net/gfx/news/hires/2019/3-mars.jpg" />
      <div className="absolute inset-0 overflow-y-auto">
        <div className="relative flex flex-col flex-1 mx-auto sm:space-y-8 sm:py-8 max-w-7xl">
          {universes.map((universe, index) => (
            <Universe {...universe} key={`2-${index}`} />
          ))}
          {universelessSeries.map((series, index) => (
            <Series {...series} key={`2-${index}`} />
          ))}
          <Series
            name="Standalone Novels"
            id={undefined}
            description={undefined}
            books={universelessAndSerieslessBooks}
          />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
