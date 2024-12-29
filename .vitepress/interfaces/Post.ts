import { Client } from "./Client";
import { Intervention } from "./Intervention";

export interface Post {
  url: string;
  frontmatter: {
    title: string;
    client?: Client | string;
    lieu?: Client | string;
    interventions?: Intervention[];
  };
}
