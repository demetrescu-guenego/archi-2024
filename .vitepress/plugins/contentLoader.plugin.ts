import { createContentLoader } from "vitepress";
import { basename } from "./utils";
import { data } from "../../data";

const getLabel = (category: string) => {
  const c = data.categories.find((c) => c.id === category);
  if (c === undefined) {
    return "label not found";
  }
  return c.label;
};

export const contentLoader = {
  name: "content-loader",
  async load(id: string) {
    const regex = /^.*\/realisations\/([^/]*).md$/;
    console.log("testing id: ", id);
    if (id.match(regex)) {
      const category = id.replace(regex, "$1");
      console.log("found: ", category);
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

      return `---
${jsonString}
---
        `;
    }
  },
};
