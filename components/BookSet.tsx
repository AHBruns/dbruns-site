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
            <div className="p-1 sm:p-2">
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
        .map(([img, id]) => {
          if (id) {
            return (
              <Link href="/books/[id]" as={`/books/${id}`}>
                <a className="focus:outline-none group">{img}</a>
              </Link>
            );
          } else return img;
        })}
    </div>
  );
}

export default BookSet;
