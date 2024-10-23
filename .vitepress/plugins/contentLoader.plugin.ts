// import { createContentLoader } from "vitepress";
import { basename, createContentLoader } from "./utils";
import { data } from "../../data";

const getLabel = (category: string) => {
  const c = data.categories.find((c) => c.id === category);
  return c !== undefined ? c.label : "label not found";
};

export const contentLoader = {
  name: "content-loader",
  async load(id: string) {
    const regex = /^.*\/realisations\/([^/]*).md$/;
    console.log("testing id: ", id);
    if (!id.match(regex)) {
      return;
    }
    const category = id.replace(regex, "$1");
    const label = getLabel(category);
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
    console.log("jsonString: ", jsonString);

    return `---
${jsonString}
---
`;
  },
};
