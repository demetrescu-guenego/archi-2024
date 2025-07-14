import { Post } from "../../interfaces/Post";

export const getLastYear = (p: Post): number => {
  const interventions = p.frontmatter.interventions ?? [];
  const year = interventions
    .map((i) => {
      if (typeof i.year === "number") return i.year;
      if (typeof i.year === "string") {
        const array = i.year.trim().split(/[ -]/);
        return +array[array.length - 1];
      }
      return 0;
    })
    .sort()
    .at(-1);
  return year ?? 0;
};
