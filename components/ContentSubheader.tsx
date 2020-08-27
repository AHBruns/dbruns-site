import React from "react";

function ContentSubheader({
  authors,
  genres,
}: {
  authors?: string[];
  genres?: string[];
}) {
  return authors?.length || genres ? (
    <div className="p-2 space-y-2 bg-gray-800 rounded-sm shadow-lg">
      {authors?.length && (
        <p className="font-semibold leading-tight tracking-wider text-white">
          By: {authors.join(", ")}
        </p>
      )}
      {genres && (
        <div className="flex space-x-2">
          {genres.map((genre) => (
            <p
              key={genre}
              className="px-2 py-1 font-bold leading-tight tracking-wider text-gray-800 bg-white rounded-sm shadow-lg"
            >
              {genre}
            </p>
          ))}
        </div>
      )}
    </div>
  ) : null;
}

export default ContentSubheader;
