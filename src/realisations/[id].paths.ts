import { data } from "../../data";

export default {
  paths() {
    const list = data.categories;

    const result = list.map((item) => ({ params: item }));
    return result;
  },
};
