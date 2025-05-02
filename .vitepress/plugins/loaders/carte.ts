import { getGPSCoordFromZipcode, normalize } from "../../utils/gps";
import { createContentLoader } from "../utils/createContentLoader";

export const carteLoad = async (id: string) => {
  const regex = /^.*\/carte.md$/;
  const matches = id.match(regex);
  if (!matches) {
    return;
  }
  // look at all the projects and generate the frontmatter.
  const posts = await createContentLoader(`realisations/*/*.md`).load();

  const filteredPosts = posts.map((post) => {
    if (typeof post.frontmatter.client !== "object") {
      console.log("post.frontmatter: ", post.frontmatter);
      throw new Error("client not formatted");
    }
    const client = post.frontmatter.client;
    const key = client.commune
      ? client.commune.zip + normalize(client.commune.name)
      : client.zip + normalize(client.name);
    client.gps = client.gps ?? getGPSCoordFromZipcode(key);
    return post;
  });

  const jsonString = JSON.stringify({
    title: "Carte",
    layout: "map",
    posts: filteredPosts,
  });

  return `---
${jsonString}
---
  `;
};
