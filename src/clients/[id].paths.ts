import { createContentLoader } from "../../.vitepress/plugins/utils/createContentLoader";
import { filterPostByClientType } from "../../.vitepress/plugins/utils/filter";
import { IdWithLabel } from "../../.vitepress/interfaces/IdWithLabel";
import { toSlug } from "../../.vitepress/utils/slug";

const getPlaceData = async (): Promise<IdWithLabel[]> => {
  const posts = await createContentLoader(`realisations/**/*.md`).load();

  const mairies = filterPostByClientType(posts, "Mairie");
  const publicOthers = filterPostByClientType(posts, "Public Autres");

  const clients = [...mairies, ...publicOthers].map((post) => {
    return {
      id: toSlug(post.name),
      title: post.name,
    } satisfies IdWithLabel;
  });

  return clients;
};

export default {
  async paths() {
    const list = await getPlaceData();

    const result = list.map((item) => ({ params: item }));
    return result;
  },
};
