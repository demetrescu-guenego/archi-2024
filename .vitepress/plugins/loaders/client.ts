import { createContentLoader } from "../utils/createContentLoader";
import { filterPostByClientType } from "../utils/filter";

export const clientLoad = async (id: string) => {
  const regex = /^.*\/clients.md$/;
  if (!id.match(regex)) {
    return;
  }
  console.log("id: ", id);
  // look at all the projects and generate the frontmatter.
  const posts = await createContentLoader(`realisations/**/*.md`, {
    includeSrc: false,
    excerpt: true,
    render: false,
  }).load();

  const mairies = filterPostByClientType(posts, "Mairie");
  const publicOthers = filterPostByClientType(posts, "Public Autres");

  const jsonString = JSON.stringify({
    layout: "clients",
    mairies,
    publicOthers,
  });
  console.log("jsonString: ", jsonString);

  return `---
${jsonString}
---
  `;
};
