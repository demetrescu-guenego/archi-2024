import { Client } from "./Client";

export interface ProjectData {
  moa: {
    url?: string;
    name: string;
  };
  classement: string;
  client: Client;
}
