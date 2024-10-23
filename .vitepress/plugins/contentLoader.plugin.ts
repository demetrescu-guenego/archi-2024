// import { createContentLoader } from "vitepress";
import { data } from "../../data";
import { Intervention } from "../theme/interfaces/Intervention";
import { basename, createContentLoader } from "./utils";

const getLabel = (category: string) => {
  const c = data.categories.find((c) => c.id === category);
  return c !== undefined ? c.label : "label not found";
};

export const contentLoader = {
  name: "content-loader",
  async load(id: string) {
    return (await realisationLoad(id)) ?? (await clientLoad(id));
  },
};

const clientLoad = async (id: string) => {
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

  const mairies = posts
    .filter((post) => {
      return post.frontmatter.client?.type === "Mairie";
    })
    .map((post) => {
      return {
        ...post.frontmatter.client,
        years: post.frontmatter.interventions.map((i: Intervention) => i.year),
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

  return `---
${jsonString}
---
`;
};
