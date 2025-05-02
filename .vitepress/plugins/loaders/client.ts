import { createContentLoader } from "../utils/createContentLoader";
import { filterPostByClientType } from "../utils/filter";

export const clientLoad = async (id: string) => {
  const regex = /^.*\/clients.md$/;
  const matches = id.match(regex);
  if (!matches) {
    return;
  }
  // look at all the projects and generate the frontmatter.
  const posts = await createContentLoader(`realisations/**/*.md`).load();

  const mairies = filterPostByClientType(posts, "Mairie");
  const publicOthers = filterPostByClientType(posts, "Public Autres");

  const jsonString = JSON.stringify({
    title: "Clients",
    layout: "clients",
    mairies,
    publicOthers,
  });

  return `---
${jsonString}
---
  `;
};
