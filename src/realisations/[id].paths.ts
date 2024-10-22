import json from "../../data.json";

export default {
  paths() {
    const list = json.categories;

    const result = list.map((item) => ({ params: item }));
    return result;
  },
};
