import { basename, dirname } from "node:path";
import { Client } from "../../interfaces/Client";
import { toSlug } from "../../utils/slug";
import { createContentLoader } from "../utils/createContentLoader";

export const mairieLoad = async (id: string) => {
  const regex = /^.*\/clients\/([^/]*).md$/;
  if (!id.match(regex)) {
    return;
  }
  const place = id.replace(regex, "$1");
  // look at all the projects and generate the frontmatter.
  const posts = await createContentLoader(`realisations/**/*.md`, {
    includeSrc: false,
    excerpt: true,
    render: false,
  }).load();

  let client: Client | undefined = undefined;

  const projects = posts
    .filter((post) => {
      if (typeof post.frontmatter.client !== "object") {
        return false;
      }
      if (toSlug(post.frontmatter.client.name) !== place) {
        return false;
      }
      client = post.frontmatter.client;
      return true;
    })
    .map((post) => {
      return {
        id: basename(post.url),
        label: post.frontmatter.label,
        category: basename(dirname(post.url)),
      };
    });

  const jsonString = JSON.stringify({
    layout: "mairie",
    client,
    projects,
  });

  return `---
${jsonString}
---
  `;
};
