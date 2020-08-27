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
}

function Book(props: BooksIdProps) {
  const router = useRouter();

  if (router.isFallback) return null;

  return (
    <BooksIdPage {...props} />
    // <div className="relative flex flex-col justify-start max-w-full sm:min-h-screen">
    //   <main className="max-w-full">
    //     <div className="max-w-6xl px-4 py-8 mx-auto space-y-8">
    //       {/* info */}
    //       <div>
    //         <div className="flex flex-col flex-wrap items-center space-y-2">
    //           {data.universe && (
    //             <div className="text-3xl font-bold leading-tight tracking-wider text-gray-600">
    //               <p>{data.universe.name}</p>
    //             </div>
    //           )}
    //           {data.series && (
    //             <div className="text-4xl font-bold leading-tight tracking-wider text-gray-700">
    //               <p>{data.series.name}</p>
    //             </div>
    //           )}
    //           <div className="flex flex-col items-center w-full px-6 py-3 space-y-2 bg-gray-800 shadow-lg">
    //             <h1 className="text-5xl font-semibold leading-tight tracking-wider text-center text-white ">
    //               {data.title}
    //             </h1>
    //             {data.authors.length > 0 && (
    //               <h2 className="pb-2 text-sm leading-tight tracking-wider text-gray-200">
    //                 by:{" "}
    //                 {data.authors.flatMap(({ name }) => [", ", name]).slice(1)}
    //               </h2>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //       {/* img & desc */}
    //       <div>
    //         <div className="flex flex-col-reverse items-stretch space-x-0 space-y-8 space-y-reverse md:space-y-0 md:space-x-4 md:flex-row">
    //           <div className="flex-1 space-y-4 tracking-wider text-gray-800">
    //             {data.tag_line && (
    //               <h2 className="text-2xl font-semibold leading-tight tracking-wider text-gray-800">
    //                 {data.tag_line}
    //               </h2>
    //             )}
    //             <div
    //               dangerouslySetInnerHTML={{ __html: data.description }}
    //               className="space-y-4"
    //             />
    //           </div>
    //           <div className="relative flex items-center justify-center p-16 overflow-hidden bg-gray-100 shadow-inner">
    //             <div className="transform scale-125">
    //               {/* <div className="shadow-xl">
    //               <div className="shadow-lg">
    //                 <div className="shadow-lg"> */}
    //               {/* <img
    //                     src={}
    //                     className="shadow-xl w-80"
    //                   /> */}
    //               <ThreeDimensionalBook
    //                 src={`https://www.master-7rqtwti-hmyhm4xzoek6k.us-2.platformsh.site${data.coverImageURL}`}
    //               />
    //               {/* </div>
    //               </div>
    //             </div> */}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       {/* buy links */}
    //       <div>
    //         <div className="flex flex-col items-center max-w-full p-3 overflow-x-auto bg-gray-100 shadow-inner">
    //           <h1 className="p-2 text-3xl font-black leading-tight tracking-wider text-gray-800 uppercase">
    //             Buy it now
    //           </h1>
    //           <div className="flex flex-wrap items-center justify-center">
    //             {data.buyLinks.map(
    //               ({ link, platform }: { link: string; platform: string }) => {
    //                 let cleanPlatformName = platform
    //                   .replace(/_AND_/g, " & ")
    //                   .replace(/_/g, " ");
    //                 return (
    //                   <a
    //                     key={link}
    //                     href={link}
    //                     target="_blank"
    //                     className="px-6 py-3 m-3 font-extrabold leading-tight tracking-wider text-white uppercase whitespace-no-wrap bg-orange-500 shadow-lg hover:bg-orange-400 "
    //                   >
    //                     {cleanPlatformName}
    //                   </a>
    //                 );
    //               }
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //       {/* recommendations */}
    //       {/* {data.recommendations?.book_recommendations && (
    //         <div>
    //           <div className="flex flex-col items-center max-w-full bg-gray-100 shadow-inner">
    //             <h1 className="px-4 pt-4 text-lg font-black leading-tight tracking-wider text-center text-gray-800 uppercase md:text-3xl">
    //               Recommendations based on this book
    //             </h1>
    //             <div className="flex items-center justify-center w-full p-4 overflow-x-auto">
    //               <div className="flex justify-start mx-auto space-x-2 overflow-x-auto">
    //                 {data.recommendations.book_recommendations.map(
    //                   (bookRecommendation) => {
    //                     return (
    //                       <div
    //                         key={bookRecommendation.cover.url}
    //                         className="flex items-center justify-center"
    //                         style={{ minWidth: 45 * 4 }}
    //                       >
    //                         <a
    //                           href={`/books/${bookRecommendation.id}`}
    //                           target="_blank"
    //                         >
    //                           <img
    //                             className="shadow-lg"
    //                             style={{ maxHeight: 64 * 4 }}
    //                             src={`https://www.master-7rqtwti-hmyhm4xzoek6k.us-2.platformsh.site${bookRecommendation.cover.url}`}
    //                           />
    //                         </a>
    //                       </div>
    //                     );
    //                   }
    //                 )}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       )} */}
    //     </div>
    //   </main>
    // </div>
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
  return {
    paths: [],
    fallback: true,
  };
}

export default Book;
