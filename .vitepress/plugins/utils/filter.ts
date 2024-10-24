import { Intervention } from "../../theme/interfaces/Intervention";
import { Post } from "../interfaces/Post";

export const filterPostByClientType = (posts: Post[], type: string) => {
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
