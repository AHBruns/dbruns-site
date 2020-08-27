import Showdown from "showdown";

const Converter = new Showdown.Converter();

export function markdownToStringifiedHTML({ md }: { md: string }): string {
  if (!md) return;

  const matches = md.matchAll(/!\[(.*)\]\((.*)\)/g);

  let cleanMD = md;

  Array.from(matches).forEach(([_, name, url]) => {
    if (url[0] === "/")
      cleanMD = cleanMD.replace(
        `![${name}](${url})`,
        `![${name}](https://www.master-7rqtwti-hmyhm4xzoek6k.us-2.platformsh.site${url})`
      );
  });

  return Converter.makeHtml(cleanMD);
}
