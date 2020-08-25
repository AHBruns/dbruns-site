import React, { useState } from "react";
import Link from "next/link";
import Header from "components/Header";
import Footer from "components/Footer";

export const DATA = [
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2019/04/Weapons-Cover-SMALL-WEB.jpg",
    slug: "weapons-of-mass-deception",
    title: "Weapons of Mass Deception",
    authors: ["David Bruns", "JR Olson"],
    description: "You can write your own descriptions.",
    series: "The WMD Files",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2019/04/Jihadi-Cover-SMALL-WEB.jpg",
    slug: "jihadi-apprentice",
    title: "Jihadi Apprentice",
    authors: ["David Bruns", "JR Olson"],
    series: "The WMD Files",
    ISBN: "1950806057",
    genres: ["Thriller", "Military"],
    amazon: "https://www.amazon.com/dp/B01G6B7SSI?tag=davbru0d-20",
    barnes_and_nobel:
      "https://www.qksrv.net/links/7737731/type/am/https://www.barnesandnoble.com/w/jihadi-apprentice-david-bruns/1123851867?ean=2940161351796",
    audible:
      "https://www.qksrv.net/links/7737731/type/am/https://www.audible.com/pd/Jihadi-Apprentice-Audiobook/B01LFGVAD8?qid=1555955371",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2019/06/Rules-of-Engagement-768x1168.jpg",
    slug: "rules-of-engagement",
    title: "Rules of Engagement",
    authors: ["David Bruns", "JR Olson"],
    series: "The WMD Files",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2020/07/Pandora-cover-1-768x1157.jpg",
    slug: "the-pandora-deception",
    title: "The Pandora Deception",
    authors: ["David Bruns", "JR Olson"],
    series: "The WMD Files",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2018/08/Lazarus-Project-eBook_1000.jpg",
    series: "The SynCorp Saga",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2018/08/Cassandras-War-eBook_1000.jpg",
    series: "The SynCorp Saga",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2018/10/Hostile-Takeover-eBook_1000.jpg",
    series: "The SynCorp Saga",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2019/03/ValhallaStation_1000_150dpi-1.jpg",
    series: "The SynCorp Saga",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2019/07/MasadasGate_1000_150dpi-1.jpg",
    series: "The SynCorp Saga",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2019/08/SerpentsFury_e-book_150-1000.jpg",
    series: "The SynCorp Saga",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2014/03/Irradiance_CVR_LRG-682x1024.jpg",
    series: "The Dream Guild Chronicles",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2016/02/TheSight_CVR_LRG-768x1152.jpg",
    series: "The Dream Guild Chronicles",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2016/02/Sacrifice_CVR_LRG-768x1152.jpg",
    series: "The Dream Guild Chronicles",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2016/10/Cover-DG-2-768x1152.jpg",
    series: "The Dream Guild Chronicles",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2018/05/Best-of-Beyond-the-Stars.jpg",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2018/05/Bridge-Across-the-Stars.jpg",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img: "https://davidbruns.com/wp-content/uploads/2018/05/At-the-Helm.jpg",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2016/09/eBookCover_300DPI_GalaxysEdge-768x1229.jpg",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2017/06/BTS-NWNS-draft-cover-768x1172.png",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2015/10/Tails-cover-e1445551933679.jpg",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img: "https://davidbruns.com/wp-content/uploads/2018/05/Futurescapes.jpg",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2018/05/The-Expanding-Universe.jpg",

    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2018/05/World-Domination.jpg",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2016/02/517vKQ4YT1L._SX326_BO1204203200_.jpg",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img: "https://davidbruns.com/wp-content/uploads/2017/04/1986329483.jpg",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2016/11/CW-Paradisi-eBook-768x1228.jpg",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2018/05/Tales-of-Dystopia.jpg",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
  {
    img:
      "https://davidbruns.com/wp-content/uploads/2018/08/FINAL-BTS-UR-ebook-cover-768x1229.jpg",
    popularityRanking: Math.random(),
    authorRanking: Math.random(),
  },
];

function Selector({
  children,
  format,
  selectedFormat,
  setSelectedFormat,
}: {
  children: string;
  format: string;
  selectedFormat: string;
  setSelectedFormat: (_: string) => void;
}) {
  return (
    <p
      onClick={() => setSelectedFormat(format)}
      className={`py-1 px-4 cursor-pointer rounded-full ${
        selectedFormat === format ? "bg-gray-700" : ""
      }`}
    >
      {children}
    </p>
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
            {data.map(({ id, cover: { url } }) => {
              return (
                <div
                  key={id}
                  className="relative flex items-center justify-center p-8 overflow-hidden rounded-lg shadow-lg"
                >
                  <div className="shadow-lg">
                    <img
                      src={`https://www.master-7rqtwti-hmyhm4xzoek6k.us-2.platformsh.site${url}`}
                      className="absolute inset-0 opacity-25"
                      style={{ filter: "blur(5px) contrast(200%)" }}
                    />
                    <Link href={`/books/${id}`}>
                      <img
                        src={`https://www.master-7rqtwti-hmyhm4xzoek6k.us-2.platformsh.site${url}`}
                        className="relative z-10 object-contain transition-all duration-300 ease-in-out transform rounded-md shadow-lg cursor-pointer hover:scale-110"
                      />
                    </Link>
                  </div>
                </div>
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
