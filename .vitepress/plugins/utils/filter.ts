import { Client } from "../../interfaces/Client";
import { Intervention } from "../../interfaces/Intervention";
import { Post } from "../../interfaces/Post";
import { getGPSCoordFromZipcode } from "../../utils/gps";
import { toSlug } from "../../utils/slug";
import { sort } from "./sort";

const reducer = (acc: Map<string, Client>, client: Client) => {
  const item = acc.get(client.name);
  if (item) {
    client.years.push(...client.years);
    return acc;
  }
  acc.set(client.name, client);
  return acc;
};

const normalize = (mairie: string) => {
  return toSlug(mairie)
    .toUpperCase()
    .replaceAll(/[^A-Z]/g, " ");
};

export const filterPostByClientType = (
  posts: Post[],
  type: string,
): Client[] => {
  const iterator = posts
    .filter((post) => {
      if (typeof post.frontmatter.client !== "object") {
        return false;
      }
      return post.frontmatter.client?.type === type;
    })
    .map((post) => {
      const client = post.frontmatter.client as Client;

      return {
        ...client,
        years: (post.frontmatter.interventions ?? [])
          .map((i: Intervention) => +String(i.year).substring(0, 4))
          .sort(),
      };
    })
    .reduce(reducer, new Map<string, Client>())
    .values();
  return [...iterator].map((client) => {
    client.years = sort(client.years);
    const key = client.commune
      ? client.commune.zip + normalize(client.commune.name)
      : client.zip + normalize(client.name);
    console.log("key: ", key);
    client.gps = client.gps ?? getGPSCoordFromZipcode(key);
    console.log("client.gps: ", client.gps);
    return client;
  });
};
