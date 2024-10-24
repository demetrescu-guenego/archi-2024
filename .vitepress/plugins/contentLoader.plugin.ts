// import { createContentLoader } from "vitepress";
import { basename } from "path";
import { clientLoad } from "./loaders/client";
import { mairieLoad } from "./loaders/mairie";
import { createContentLoader } from "./utils/createContentLoader";
import { getCategoryLabel } from "./utils/label";

export const contentLoader = {
  name: "content-loader",
  async load(id: string) {
    return (
      (await realisationLoad(id)) ??
      (await clientLoad(id)) ??
      (await mairieLoad(id))
    );
  },
};

const realisationLoad = async (id: string) => {
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
