import { Client } from "../../interfaces/Client";
import { createContentLoader } from "../utils/createContentLoader";
import { filterPostByClientType } from "../utils/filter";
import { sort } from "../utils/sort";

export const clientLoad = async (id: string) => {
  const regex = /^.*\/clients.md$/;
  if (!id.match(regex)) {
    return;
  }
  // look at all the projects and generate the frontmatter.
  const posts = await createContentLoader(`realisations/**/*.md`).load();

  const reducer = (acc: Map<string, Client>, client: Client) => {
    const item = acc.get(client.name);
    if (item) {
      client.years.push(...client.years);
      return acc;
    }
    acc.set(client.name, client);
    return acc;
  };

  const mairies = filterPostByClientType(posts, "Mairie")
    .reduce(reducer, new Map<string, Client>())
    .values();
  const publicOthers = filterPostByClientType(posts, "Public Autres")
    .reduce(reducer, new Map<string, Client>())
    .values();
  const jsonString = JSON.stringify({
    layout: "clients",
    mairies: [...mairies].map((client) => {
      client.years = sort(client.years);
      return client;
    }),
    publicOthers: [...publicOthers].map((client) => {
      client.years = sort(client.years);
      return client;
    }),
  });

  return `---
${jsonString}
---
  `;
};
