import React from "react";
import Link from "next/link";

function RecommendationsBar({
  recommendations,
}: {
  recommendations: {
    type: string;
    priority: number;
    info:
      | { id: number; coverImageURL: string }
      | { id: number; name: string }
      | { id: number; name: string; avatarURL?: string };
  }[];
}) {
  if (recommendations.length === 0) return null;

  return (
    <div className="pt-4 bg-gray-100 rounded-sm shadow-inner">
      <h1 className="px-4 text-3xl font-semibold leading-tight tracking-wider text-center text-gray-800">
        Recommendations
      </h1>
      <div className="w-full max-w-full overflow-x-auto">
        <div className="flex px-6 pt-4 pb-6 space-x-4">
          {recommendations.map(({ type, info }, i) => {
            let elem;
            if (type === "BOOK") {
              elem = (
                <Link href="/books/[id]" as={`/books/${info.id}`}>
                  <a className="focus:outline-none group">
                    <div className="bg-gray-800">
                      <img
                        alt="image of a book"
                        src={
                          (info as { id: number; coverImageURL: string })
                            .coverImageURL
                        }
                        className="h-64 hover:opacity-75 group-focus:opacity-50"
                      />
                    </div>
                  </a>
                </Link>
              );
            } else if (type === "AUTHOR") {
              return null; // todo
              elem = (
                <Link href="/authors/[id]" as={`/authors/${info.id}`}>
                  <a className="focus:outline-none group">
                    <div className="relative flex items-center justify-center h-full p-4 bg-gray-500 hover:bg-gray-600 group-focus:bg-gray-400">
                      <h1 className="w-40 text-3xl font-semibold text-center text-white max-w-40">
                        {
                          (info as {
                            id: number;
                            name: string;
                            avatarURL: string;
                          }).name
                        }
                      </h1>
                      <span className="absolute px-2 py-1 text-gray-800 bg-white rounded-sm shadow-lg bottom-2 left-2">
                        Author
                      </span>
                    </div>
                  </a>
                </Link>
              );
            } else if (type === "SERIES") {
              elem = (
                <Link href="/series/[id]" as={`/series/${info.id}`}>
                  <a className="focus:outline-none group">
                    <div className="relative flex items-center justify-center h-full p-4 bg-gray-500 hover:bg-gray-600 group-focus:bg-gray-400">
                      <h1 className="w-40 text-3xl font-semibold text-center text-white max-w-40">
                        {(info as { id: number; name: string }).name}
                      </h1>
                      <span className="absolute px-2 py-1 text-gray-800 bg-white rounded-sm shadow-lg bottom-2 left-2">
                        Series
                      </span>
                    </div>
                  </a>
                </Link>
              );
            } else if (type === "UNIVERSE") {
              return null; // todo
              elem = (
                <Link href="/universes/[id]" as={`/universes/${info.id}`}>
                  <a className="focus:outline-none group">
                    <div className="relative flex items-center justify-center h-full p-4 bg-gray-500 hover:bg-gray-600 group-focus:bg-gray-400">
                      <h1 className="w-40 text-3xl font-semibold text-center text-white max-w-40">
                        {(info as { id: number; name: string }).name}
                      </h1>
                      <span className="absolute px-2 py-1 text-gray-800 bg-white rounded-sm shadow-lg bottom-2 left-2">
                        Universe
                      </span>
                    </div>
                  </a>
                </Link>
              );
            } else elem = null;
            return (
              <div className="flex-shrink-0 overflow-hidden rounded-sm shadow-lg">
                {elem}
              </div>
            );
          })}
          <div className="flex-shrink-0">
            <div className="w-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendationsBar;
