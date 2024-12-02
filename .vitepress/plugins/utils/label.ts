import { data } from "../../../commons/data";

export const getCategoryLabel = (category: string) => {
  const c = data.categories.find((c) => c.id === category);
  return c !== undefined ? c.title : "title not found";
};
