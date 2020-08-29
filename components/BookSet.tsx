import React from "react";
import ImgGroup from "./ImgGroup";
import { ImageGroup } from "lib/cmsUtils";
import Link from "next/link";

function BookSet({
  books,
}: {
  books: { id?: number; coverImageGroup: ImageGroup }[];
}) {
  return (
    <div className="flex flex-wrap justify-center p-1 sm:p-2">
      {books
        .map(({ id, coverImageGroup }) => {
          return [
            <div key={id} className="w-full h-auto p-1 sm:w-auto sm:p-2">
              <div className="w-full h-auto bg-black rounded-sm sm:w-auto lg:h-96 md:h-80 sm:h-64">
                <ImgGroup
                  imageGroup={coverImageGroup}
                  className="w-full h-auto rounded-sm shadow-lg sm:h-full sm:w-auto group-focus:opacity-50 group-hover:opacity-75"
                />
              </div>
            </div>,
            id,
          ];
        })
        .map(([img, id]: [JSX.Element, number]) => {
          if (id) {
            return (
              <Link key={id} href="/books/[id]" as={`/books/${id}`}>
                <a
                  key={id}
                  className="w-full h-auto focus:outline-none group sm:w-auto"
                >
                  {img}
                </a>
              </Link>
            );
          } else return img;
        })}
    </div>
  );
}

export default BookSet;
