import { Intervention } from "../../interfaces/Intervention";
import { Post } from "../../interfaces/Post";
import { Client } from "../../interfaces/Client";

export const filterPostByClientType = (
  posts: Post[],
  type: string,
): Client[] => {
  return posts
    .filter((post) => {
      if (typeof post.frontmatter.client !== "object") {
        return false;
      }
      return post.frontmatter.client?.type === type;
    })
    .map((post) => {
      const client = post.frontmatter.client as Client;
      return {
        ...client,
        years: post.frontmatter.interventions.map(
          (i: Intervention) => +String(i.year).substring(0, 4),
        ),
      };
    });
};
