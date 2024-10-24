// import { createContentLoader } from "vitepress";
import { basename } from "path";
import { mairieLoad } from "./loaders/mairie";
import { createContentLoader } from "./utils/createContentLoader";
import { filterPostByClientType } from "./utils/filter";
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
