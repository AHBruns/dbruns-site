export function prependBaseURL({ endpoint }: { endpoint: string }) {
  return `https://www.master-7rqtwti-hmyhm4xzoek6k.us-2.platformsh.site${endpoint}`;
}

export async function fetchJSON(input: RequestInfo, init?: RequestInit) {
  return await fetch(input, init).then((r) => r.json());
}

export function extractAndSortRecommendations(obj: any) {
  if (!("recommendations" in obj))
    throw new Error("recommendations not in the given object");

  if (!obj.recommendations) return [];

  const authorRecs = obj.recommendations.authors.map(
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

  const bookRecs = obj.recommendations.books.map(
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

  const seriesRecs = obj.recommendations.series.map(
    ({ priority, series: { id, name } }) => ({
      type: "SERIES",
      priority,
      info: { id, name },
    })
  );

  const universeRecs = obj.recommendations.universes.map(
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
