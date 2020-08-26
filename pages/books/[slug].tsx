import React from "react";
import Header from "components/Header";
import { useRouter } from "next/dist/client/router";
import { markdownToStringifiedHTML } from "lib/markdown";
import ThreeDimensionalBook from "components/3DBook";

function Book({ data }) {
  const router = useRouter();

  if (router.isFallback) return null;

  return (
    <div className="relative flex flex-col justify-start max-w-full sm:min-h-screen">
      <Header />
      <main className="max-w-full">
        <div className="max-w-6xl px-4 py-8 mx-auto space-y-8">
          {/* info */}
          <div>
            <div className="flex flex-col flex-wrap items-center space-y-2">
              {data.universe && (
                <div className="text-3xl font-bold leading-tight tracking-wider text-gray-600">
                  <p>{data.universe.name}</p>
                </div>
              )}
              {data.series && (
                <div className="text-4xl font-bold leading-tight tracking-wider text-gray-700">
                  <p>{data.series.name}</p>
                </div>
              )}
              <div className="flex flex-col items-center w-full px-6 py-3 space-y-2 bg-gray-800 shadow-lg">
                <h1 className="text-5xl font-semibold leading-tight tracking-wider text-center text-white ">
                  {data.title}
                </h1>
                {data.authors.length > 0 && (
                  <h2 className="pb-2 text-sm leading-tight tracking-wider text-gray-200">
                    by:{" "}
                    {data.authors.flatMap(({ name }) => [", ", name]).slice(1)}
                  </h2>
                )}
              </div>
            </div>
          </div>
          {/* img & desc */}
          <div>
            <div className="flex flex-col items-stretch space-x-0 space-y-8 md:space-y-0 md:space-x-4 md:flex-row">
              <div className="relative flex items-center justify-center p-16 overflow-hidden bg-gray-100 shadow-inner">
                <div className="transform scale-125">
                  {/* <div className="shadow-xl">
                  <div className="shadow-lg">
                    <div className="shadow-lg"> */}
                  {/* <img
                        src={}
                        className="shadow-xl w-80"
                      /> */}
                  <ThreeDimensionalBook
                    src={`https://www.master-7rqtwti-hmyhm4xzoek6k.us-2.platformsh.site${data.cover.url}`}
                  />
                  {/* </div>
                  </div>
                </div> */}
                </div>
              </div>
              <div className="flex-1 space-y-4 tracking-wider text-gray-800">
                {data.tag_line && (
                  <h2 className="text-2xl font-semibold leading-tight tracking-wider text-gray-800">
                    {data.tag_line}
                  </h2>
                )}
                <div
                  dangerouslySetInnerHTML={{ __html: data.description }}
                  className="space-y-4"
                />
              </div>
            </div>
          </div>
          {/* buy links */}
          <div>
            <div className="flex flex-col items-center max-w-full p-3 overflow-x-auto bg-gray-100 shadow-inner">
              <h1 className="p-2 text-3xl font-black leading-tight tracking-wider text-gray-800 uppercase">
                Buy it now
              </h1>
              <div className="flex flex-wrap items-center justify-center">
                {data.buy_links.map(
                  ({ link, platform }: { link: string; platform: string }) => {
                    let cleanPlatformName = platform
                      .replace(/_AND_/g, " & ")
                      .replace(/_/g, " ");
                    return (
                      <a
                        key={link}
                        href={link}
                        target="_blank"
                        className="px-6 py-3 m-3 font-extrabold leading-tight tracking-wider text-white uppercase whitespace-no-wrap bg-orange-500 shadow-lg hover:bg-orange-400 "
                      >
                        {cleanPlatformName}
                      </a>
                    );
                  }
                )}
              </div>
            </div>
          </div>
          {/* recommendations */}
          {data.recommendations?.book_recommendations && (
            <div>
              <div className="flex flex-col items-center max-w-full bg-gray-100 shadow-inner">
                <h1 className="px-4 pt-4 text-lg font-black leading-tight tracking-wider text-center text-gray-800 uppercase md:text-3xl">
                  Recommendations based on this book
                </h1>
                <div className="flex items-center justify-center w-full p-4 overflow-x-auto">
                  <div className="flex justify-start min-w-full space-x-2 overflow-x-auto">
                    {data.recommendations.book_recommendations.map(
                      (bookRecommendation) => {
                        return (
                          <div
                            className="flex items-center justify-center"
                            style={{ minWidth: 45 * 4 }}
                          >
                            <a
                              href={`/books/${bookRecommendation.id}`}
                              target="_blank"
                            >
                              <img
                                className="shadow-lg"
                                style={{ maxHeight: 64 * 4 }}
                                src={`https://www.master-7rqtwti-hmyhm4xzoek6k.us-2.platformsh.site${bookRecommendation.cover.url}`}
                              />
                            </a>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const data = await (
    await fetch(
      `https://www.master-7rqtwti-hmyhm4xzoek6k.us-2.platformsh.site/books/${params.slug}`
    )
  ).json();

  return {
    props: {
      data: {
        ...data,
        description: markdownToStringifiedHTML(data.description),
      },
    },
    revalidate: 15,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default Book;

/* <div className="max-w-5xl p-4 mx-auto space-y-4">
          <p className="">
            <img
              src={`https://www.master-7rqtwti-hmyhm4xzoek6k.us-2.platformsh.site${data.cover.url}`}
              className="float-left max-w-full mb-3 mr-4 shadow-lg w-96"
            />
            <div className="inline space-y-4">
              <h1 className="inline-flex items-center text-5xl font-semibold leading-tight text-gray-800">
                {data.series && (
                  <>
                    <span className="px-2 py-1 text-4xl font-bold text-white bg-gray-800">
                      {data.series.name}
                    </span>{" "}
                  </>
                )}
                {data.title}
              </h1>
              <h2 className="text-lg font-medium leading-tight tracking-widest text-gray-600">
                By:{" "}
                {data.authors
                  .flatMap(({ name }) => {
                    return [", ", name];
                  })
                  ?.splice(1)}
              </h2>
              <div className="flex space-x-2">
                {data.genres.map(({ name }) => {
                  return (
                    <div className="px-2 py-1 text-white bg-gray-800 rounded-md shadow-md">
                      {name}
                    </div>
                  );
                })}
              </div>
              <MD source={data.description} />
            </div>
          </p>
          <div className="flex p-4 space-x-4 bg-gray-800 shadow-md">
            {data.buy_links.map(
              ({ link, platform }: { link: string; platform: string }) => {
                let cleanPlatformName = platform
                  .replace(/_AND_/g, " & ")
                  .replace(/_/g, " ");
                return (
                  <a
                    href={link}
                    target="_blank"
                    className="px-2 py-1 leading-tight tracking-wider text-white bg-gray-700 shadow-lg hover:bg-gray-900 "
                  >
                    {cleanPlatformName}
                  </a>
                );
              }
            )}
            {/* {[
              book.amazon && (
                <a
                  href={book.amazon}
                  className="px-2 py-1 text-white bg-gray-700 rounded-md shadow-md"
                >
                  Amazon
                </a>
              ),
              book.audible && (
                <a
                  href={book.audible}
                  className="px-2 py-1 text-white bg-gray-700 rounded-md shadow-md"
                >
                  Audible
                </a>
              ),
              book.barnes_and_nobel && (
                <a
                  href={book.barnes_and_nobel}
                  className="px-2 py-1 text-white bg-gray-700 rounded-md shadow-md"
                >
                  Barnes & Nobel
                </a>
              ),
            ]} 
          </div>
        </div> */
