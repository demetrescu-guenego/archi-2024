import { basename } from "node:path";
import { getCategoryLabel } from "../utils/label";
import { createContentLoader } from "../utils/createContentLoader";

export const realisationLoad = async (id: string) => {
  const regex = /^.*\/realisations\/([^/]*).md$/;
  if (!id.match(regex)) {
    return;
  }
  const category = id.replace(regex, "$1");
  const label = getCategoryLabel(category);
  const posts = await createContentLoader(`realisations/${category}/*.md`, {
    includeSrc: false,
    excerpt: true,
    render: false,
  }).load();

  const projects = posts.map((post) => {
    return { id: basename(post.url), label: post.frontmatter.label };
  });

  const jsonString = JSON.stringify({
    layout: "category",
    category,
    label,
    projects,
  });

  return `---
${jsonString}
---
`;
};
