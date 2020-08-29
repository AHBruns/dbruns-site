import { Image } from "./models/traits/Image";

export function prependBaseURL({ endpoint }: { endpoint: string }) {
  return `https://www.master-7rqtwti-hmyhm4xzoek6k.us-2.platformsh.site${endpoint}`;
}

export async function fetchJSON(input: RequestInfo, init?: RequestInit) {
  return await fetch(input, init).then((r) => r.json());
}

export function extractAndSortRecommendations({
  recommendations,
}: {
  recommendations: any;
}) {
  if (!recommendations) return [];

  const authorRecs = recommendations.authors.map(
    ({ priority, author: { id, name, avatar } }) => ({
      type: "AUTHOR",
      priority,
      info: {
        name,
        id,
        ...(avatar
          ? {
              avatarImageURL: prependBaseURL({ endpoint: avatar }),
            }
          : {}),
      },
    })
  );

  const bookRecs = recommendations.books.map(
    ({
      priority,
      book: {
        id,
        cover: { url },
      },
    }) => ({
      type: "BOOK",
      priority,
      info: { id, coverImageURL: prependBaseURL({ endpoint: url }) },
    })
  );

  const seriesRecs = recommendations.series.map(
    ({ priority, series: { id, name } }) => ({
      type: "SERIES",
      priority,
      info: { id, name },
    })
  );

  const universeRecs = recommendations.universes.map(
    ({ priority, universe: { id, name } }) => ({
      type: "UNIVERSE",
      priority,
      info: { id, name },
    })
  );

  return [...bookRecs, ...seriesRecs, ...universeRecs, ...authorRecs].sort(
    (a, b) => a.priority - b.priority
  );
}

interface ClientSideImage {
  height: number;
  width: number;
  url: string;
}

export interface ImageGroup {
  alt?: string;
  desktop: ClientSideImage;
  mobile: ClientSideImage;
}

export function extractImage({ cmsImage }: { cmsImage: Image }): ImageGroup {
  const MAX_MOBILE_SIZE = 90;
  const MIN_MOBILE_RESOLUTION = 200 * 400;
  const MAX_DESKTOP_SIZE = 150;
  const MIN_DESKTOP_RESOLUTION = 300 * 600;

  const defaultImage = {
    size: cmsImage.size,
    height: cmsImage.height,
    width: cmsImage.width,
    url: prependBaseURL({ endpoint: cmsImage.url }),
  };

  let currentBestMobileImage = undefined;
  let currentBestDesktopImage = undefined;

  [
    ...Object.values(cmsImage.formats).map(({ url, ...rest }) => ({
      url: prependBaseURL({ endpoint: url }),
      ...rest,
    })),
    defaultImage,
  ].map(({ size, height, width, url }) => {
    if (
      size < MAX_MOBILE_SIZE &&
      height * width > MIN_MOBILE_RESOLUTION &&
      (currentBestMobileImage === undefined ||
        height * width >
          currentBestMobileImage.height * currentBestMobileImage.width)
    )
      currentBestMobileImage = {
        size,
        height,
        width,
        url,
      };

    if (
      size < MAX_DESKTOP_SIZE &&
      height * width > MIN_DESKTOP_RESOLUTION &&
      (currentBestDesktopImage === undefined ||
        height * width >
          currentBestDesktopImage.height * currentBestDesktopImage.width)
    )
      currentBestDesktopImage = {
        size,
        height,
        width,
        url,
      };
  });

  // if nothing fits our parameters we still gotta send something 🤷‍♂️
  if (currentBestDesktopImage === undefined)
    currentBestDesktopImage = defaultImage;
  if (currentBestMobileImage === undefined)
    currentBestMobileImage = defaultImage;

  return {
    ...(cmsImage.alternativeText || cmsImage.caption
      ? { alt: cmsImage.alternativeText ?? cmsImage.caption }
      : {}),
    desktop: currentBestDesktopImage,
    mobile: currentBestMobileImage,
  };
}

export function extractMetadata({ metadata }: { metadata: any }) {
  // todo
}
