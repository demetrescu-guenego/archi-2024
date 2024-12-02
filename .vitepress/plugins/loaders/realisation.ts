import { basename } from "node:path";
import { getCategoryLabel } from "../utils/label";
import { createContentLoader } from "../utils/createContentLoader";

export const realisationLoad = async (id: string) => {
  const regex = /^.*\/realisations\/([^/]*).md$/;
  if (!id.match(regex)) {
    return;
  }
  const category = id.replace(regex, "$1");
  const title = getCategoryLabel(category);
  const posts = await createContentLoader(
    `realisations/${category}/*.md`,
  ).load();

  const projects = posts.map((post) => {
    return {
      id: basename(post.url),
      title: post.frontmatter.title,
      interventions: post.frontmatter.interventions,
    };
  });

  const jsonString = JSON.stringify({
    title,
    layout: "category",
    category,
    projects,
  });

  return `---
${jsonString}
---
`;
};
