// import { createContentLoader } from "vitepress";
import { data } from "../../data";
import { Intervention } from "../theme/interfaces/Intervention";
import { createContentLoader, toSlug } from "./utils";
import { basename, dirname } from "path";

interface Post {
  url: string;
  frontmatter: any;
}

const filterPost = (posts: Post[], type: string) => {
  return posts
    .filter((post) => {
      return post.frontmatter.client?.type === type;
    })
    .map((post) => {
      return {
        ...post.frontmatter.client,
        years: post.frontmatter.interventions.map((i: Intervention) => i.year),
      };
    });
};

const getLabel = (category: string) => {
  const c = data.categories.find((c) => c.id === category);
  return c !== undefined ? c.label : "label not found";
};

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

const mairieLoad = async (id: string) => {
  const regex = /^.*\/clients\/([^/]*).md$/;
  if (!id.match(regex)) {
    return;
  }
  const place = id.replace(regex, "$1");
  console.log("id: ", id);
  // look at all the projects and generate the frontmatter.
  const posts = await createContentLoader(`realisations/**/*.md`, {
    includeSrc: false,
    excerpt: true,
    render: false,
  }).load();

  const projects = posts
    .filter((post) => {
      console.log("post: ", post);
      if (typeof post.frontmatter.client !== "object") {
        return false;
      }
      return toSlug(post.frontmatter.client.name) === place;
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
    projects,
  });
  console.log("jsonString: ", jsonString);

  return `---
${jsonString}
---
`;
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

  const mairies = filterPost(posts, "Mairie");
  const publicOthers = filterPost(posts, "Public Autres");

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
