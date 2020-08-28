import React from "react";
import ThreeDimensionalBook from "./3DBook";
import Link from "next/link";

function BookSet({
  books,
  size,
}: {
  books: { id: number; coverImageURL: string; height: number; width: number }[];
  size: "small" | "medium" | "large" | "3D";
}) {
  let imgClassName: string;
  let containerClassNameExt: string;
  switch (size) {
    case "large":
      imgClassName = "p-4 lg:h-96 md:h-80 sm:h-64 h-52 rounded-sm shadow-lg";
      containerClassNameExt = "p-4";
      break;
    case "medium":
      imgClassName = "p-2 lg:h-80 md:h-72 sm:h-56 h-48 rounded-sm shadow-lg";
      containerClassNameExt = "p-2";
      break;
    case "small":
      imgClassName = "p-2 lg:h-72 md:h-64 sm:h-52 h-42 rounded-sm shadow-lg";
      containerClassNameExt = "p-2";
      break;
    case "3D":
      containerClassNameExt = "p-4";
      break;
    default:
      break;
  }

  return (
    <div className={`${containerClassNameExt} flex flex-wrap justify-center`}>
      {books.map(({ id, coverImageURL, height, width }, index) => (
        <Link key={index} href="/books/[id]" as={`/books/${id}`}>
          <a className="focus:outline-none group">
            {size === "3D" ? (
              <div className="p-4 rounded-lg group-focus:bg-opacity-25 group-focus:bg-gray-800 group-focus:shadow-lg">
                <div className="hidden sm:block">
                  <ThreeDimensionalBook
                    src={coverImageURL}
                    height={height}
                    width={width}
                  />
                </div>
                <img
                  src={coverImageURL}
                  className="block h-64 rounded-sm shadow-lg sm:hidden"
                  // height={height}
                  // width={width}
                />
              </div>
            ) : (
              <img
                src={coverImageURL}
                className={imgClassName}
                height={height}
                width={width}
              />
            )}
          </a>
        </Link>
      ))}
    </div>
  );
}

export default BookSet;
