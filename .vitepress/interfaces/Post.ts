import { Client } from "./Client";
import { Intervention } from "./Intervention";

export interface Post {
  url: string;
  frontmatter: {
    client?: Client | string;
    interventions: Intervention[];
  };
}
