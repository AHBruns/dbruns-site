import React from "react";
import { BooksProps, BooksSeriesProp, BooksUniverseProp } from "pages/books";
import Link from "next/link";
import { STRINGIFIED_HTML } from "lib/models/aliases";
import BookSet from "./BookSet";
import { Transition } from "@tailwindui/react";

function SeriesHeader({ name, id }: { name: string; id: number }) {
  if (!name && !id) return null;

  const Header = (
    <Transition
      appear
      show
      enter="transition-all ease-out duration-300 transform"
      enterFrom="opacity-0 translate-y-2"
      enterTo="opacity-100 translate-y-0"
      className={`${
        id ? "group-focus:bg-gray-900 hover:bg-gray-800" : ""
      } px-4 py-2 bg-gray-700 shadow-lg top-14`}
    >
      <h1 className="text-2xl font-semibold leading-tight tracking-wider text-white">
        {name}
      </h1>
    </Transition>
  );

  return id ? (
    <Link href="/series/[id]" as={`/series/${id}`}>
      <a className="sticky top-0 z-10 focus:outline-none group">{Header}</a>
    </Link>
  ) : (
    <div className="sticky top-0 z-10">{Header}</div>
  );
}

function Series({
  id,
  name,
  description,
  books,
  isNested,
}: BooksSeriesProp & { isNested?: boolean } & {
  description?: STRINGIFIED_HTML;
}) {
  return (
    <div className="flex flex-col space-y-4">
      <SeriesHeader id={id} name={name} />
      <div className="px-4">
        <div className="p-4 bg-gray-600 rounded-sm shadow-lg ">
          {description && (
            <div
              dangerouslySetInnerHTML={{ __html: description }}
              className="max-w-5xl px-8 py-4 mx-auto text-lg tracking-wider text-center text-white"
            />
          )}
          {<BookSet books={books} size="medium" />}
        </div>
      </div>
    </div>
  );
}

// function Series({
//   id,
//   name,
//   description,
//   books,
//   isNested,
// }: BooksSeriesProp & { isNested?: boolean } & {
//   description?: STRINGIFIED_HTML;
// }) {
//   const elem = <h1>{name}</h1>;
//   const classes = `${
//     isNested ? "top-14" : "top-0"
//   } z-10 sticky shadow-lg flex items-center justify-center focus:bg-opacity-75 focus:bg-gray-900 text-2xl font-medium leading-tight tracking-widest text-center text-white bg-gray-800 bg-opacity-75 BACKDROP_BLUR h-12`;
//   return (
//     <div className="sm:shadow-lg">
//       {id ? (
//         <Link href="/series/[id]" as={`/series/${id}`}>
//           <a className={`${classes} focus:outline-none`}>{elem}</a>
//         </Link>
//       ) : (
//         <div className={classes}>{elem}</div>
//       )}
//       <div className="p-8 space-y-4 bg-gray-800 bg-opacity-25 BACKDROP_BLUR">
//         {description && (
//           <p className="max-w-4xl mx-auto leading-tight tracking-wider text-center text-white">
//             {description}
//           </p>
//         )}
//         <BookSet books={books} size="3D" />
//       </div>
//     </div>
//   );
// }

// function Universe({ id, name, series, books }: BooksUniverseProp) {
//   return (
//     <div className="sm:space-y-4 sm:shadow-lg">
//       <Link href="/universes/[id]" as={`/universes/${id}`}>
//         <a className="focus:outline-none group">
//           <h1 className="sticky top-0 z-20 flex items-center justify-center text-3xl font-semibold leading-tight tracking-widest text-center text-white bg-gray-800 shadow-lg group-focus:bg-gray-900 h-14">
//             {name}
//           </h1>
//         </a>
//       </Link>
//       <div className="flex flex-col items-stretch /bg-white /bg-opacity-25 sm:space-y-4">
//         {series.map((series) => {
//           return <Series {...series} isNested />;
//         })}
//         <Series
//           name="Standalone Books"
//           id={undefined}
//           description={undefined}
//           books={books}
//           isNested
//         />
//       </div>
//     </div>
//   );
// }

// todo : universes

function BooksPage({
  universes,
  universelessSeries,
  universelessAndSerieslessBooks,
}: BooksProps) {
  return (
    <div className="relative flex-1">
      <div className="absolute inset-0 overflow-y-auto">
        <div className="flex flex-col flex-1 pb-8 mx-auto space-y-8 ">
          {/* {universes.map((universe, index) => (
            <Universe {...universe} key={`2-${index}`} />
          ))} */}
          {[...universelessSeries].map((series, index) => {
            return <Series {...series} key={series.name} />;
          })}
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
