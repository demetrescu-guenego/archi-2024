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
    console.log("testing id: ", id);
    return (await realisationLoad(id)) ?? (await clientLoad(id));
  },
};

const clientLoad = async (id: string) => {
  const regex = /^.*\/clients.md$/;
  if (!id.match(regex)) {
    return;
  }
  // look at all the projects and generate the frontmatter.
  const posts = await createContentLoader(`realisations/**/*.md`, {
    includeSrc: false,
    excerpt: true,
    render: false,
  }).load();

  const mairies = posts
    .filter((post) => {
      return post.frontmatter.type === "Mairie";
    })
    .map((post) => {
      return {
        years: post.frontmatter.years,
        name: post.frontmatter.name,
        zipcode: post.frontmatter.zipcode,
      };
    });

  const jsonString = JSON.stringify({
    layout: "clients",
    mairies: mairies,
  });
  console.log("jsonString: ", jsonString);

  return `---
${jsonString}
---
`;
};

const realisationLoad = async (id: string) => {
  const regex = /^.*\/realisations\/([^/]*).md$/;
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
};
