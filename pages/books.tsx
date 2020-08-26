import React, { useState } from "react";
import Link from "next/link";
import Header from "components/Header";
import Footer from "components/Footer";
import NoSSR from "components/NoSSR";

function ImgCard({
  id,
  url,
  height,
  width,
}: {
  id: string;
  url: string;
  height: number;
  width: number;
}) {
  return (
    <div
      key={id}
      className="relative flex items-center justify-center p-8 overflow-hidden rounded-lg shadow-lg"
    >
      <div className="shadow-lg">
        <img
          src={`https://www.master-7rqtwti-hmyhm4xzoek6k.us-2.platformsh.site${url}`}
          className="absolute inset-0 opacity-25"
          style={{
            filter: "blur(5px) contrast(200%)",
          }}
          height={height.toString()}
          width={width.toString()}
        />
        <Link as={`/books/${id}`} href="/books/[slug]">
          <img
            height={height.toString()}
            width={width.toString()}
            src={`https://www.master-7rqtwti-hmyhm4xzoek6k.us-2.platformsh.site${url}`}
            className="relative z-10 object-contain transition-all duration-300 ease-in-out transform rounded-md shadow-lg cursor-pointer hover:scale-110"
          />
        </Link>
      </div>
    </div>
  );
}

function Books({ data }: { data: any[] }) {
  const [format, setFormat] = useState("all");

  return (
    <div className="relative flex flex-col justify-between sm:min-h-screen">
      <Header />
      <main className="relative z-20 p-4">
        <h1 className="text-3xl font-semibold leading-tight tracking-wider text-center text-gray-800">
          Books
        </h1>
        {
          <div className="grid grid-flow-row grid-cols-1 gap-8 p-4 mx-auto max-w-7xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data.map(({ id, cover: { url, height, width } }) => {
              return (
                <ImgCard
                  key={id}
                  id={id}
                  url={url}
                  height={height}
                  width={width}
                />
              );
            })}
          </div>
        }
      </main>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      data: await (
        await fetch(
          "https://www.master-7rqtwti-hmyhm4xzoek6k.us-2.platformsh.site/books"
        )
      ).json(),
    },
    revalidate: 15,
  };
}

export default Books;
