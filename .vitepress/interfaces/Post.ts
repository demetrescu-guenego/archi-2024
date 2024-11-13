import { Client } from "./Client";
import { Intervention } from "./Intervention";

export interface Post {
  url: string;
  frontmatter: {
    label: string;
    client?: Client | string;
    interventions?: Intervention[];
  };
}
