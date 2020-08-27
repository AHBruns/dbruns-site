import React from "react";

function BuyLinkBar({
  buyLinks,
}: {
  buyLinks: { platform: string; link: string }[];
}) {
  return (
    <div className="pt-4 bg-gray-100 rounded-sm shadow-inner">
      <h1 className="px-4 text-3xl font-semibold leading-tight tracking-wider text-center text-gray-800">
        Buy it here!
      </h1>
      <div className="flex flex-col flex-wrap justify-center p-4 md:flex-row">
        {buyLinks.map(({ platform, link }) => {
          let cleanedPlatform: string;
          switch (platform) {
            case "Barnes_AND_Noble":
              cleanedPlatform = "Barnes & Noble";
              break;
            default:
              cleanedPlatform = platform;
              break;
          }
          return (
            <a href={link} target="_blank" className="focus:outline-none group">
              <div className="px-6 py-3 m-2 text-lg font-bold leading-tight tracking-wider text-white uppercase bg-orange-500 rounded-sm shadow-lg group-focus:bg-orange-600 focus:bg-orange-600 hover:bg-orange-400">
                <p>{cleanedPlatform}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default BuyLinkBar;
