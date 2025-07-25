import { Post } from "../../interfaces/Post";

export const getMontantDesTravaux = (post: Post): number | undefined => {
  if (post.frontmatter.interventions === undefined) {
    return undefined;
  }
  const total = post.frontmatter.interventions.reduce(
    (acc, current) => {
      const price = getPriceFromIntervention(current.price);
      if (price === undefined) {
        return acc;
      }
      return (acc || 0) + price;
    },
    undefined as number | undefined,
  );
  return total;
};

export const getPriceFromIntervention = (
  priceStr: string | undefined,
): number | undefined => {
  if (priceStr === undefined) {
    return undefined;
  }
  const onlyNbr = priceStr.replace(/\D/g, "");
  return +onlyNbr;
};

export const getMissions = (post: Post) => {
  if (post.frontmatter.interventions === undefined) {
    return undefined;
  }
  const missions = post.frontmatter.interventions.reduce((acc, current) => {
    if (current.missions === undefined) {
      return acc;
    }
    acc.push(...current.missions);
    return acc;
  }, [] as string[]);
  const result = [...new Set(missions)].sort();
  return result;
};
