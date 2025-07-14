import { Client } from "./Client";

export interface ProjectWithScore {
  title: string;
  url: string;
  client: Client;
  year: number;
  searchScore: number;
}
