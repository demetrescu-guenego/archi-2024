import { createContentLoader } from "../../.vitepress/plugins/utils/createContentLoader";
import { filterPostByClientType } from "../../.vitepress/plugins/utils/filter";
import { IdWithLabel } from "../../commons/interfaces/IdWithLabel";
import { toSlug } from "../../.vitepress/utils/slug";

const getPlaceData = async (): Promise<IdWithLabel[]> => {
  const posts = await createContentLoader(`realisations/**/*.md`, {
    includeSrc: false,
    excerpt: true,
    render: false,
  }).load();
  console.log("xxx posts: ", posts);

  const mairies = filterPostByClientType(posts, "Mairie");
  console.log("mairies: ", mairies);
  const publicOthers = filterPostByClientType(posts, "Public Autres");
  console.log("publicOthers: ", publicOthers);

  const clients = [...mairies, ...publicOthers].map((post) => {
    return {
      id: toSlug(post.name),
      label: post.name,
    } satisfies IdWithLabel;
  });
  console.log("clients: ", clients);

  return clients;
};

export default {
  async paths() {
    const list = await getPlaceData();

    const result = list.map((item) => ({ params: item }));
    return result;
  },
};
