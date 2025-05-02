import { Intervention } from "./Intervention";

export interface Project {
  id: string;
  title: string;
  category: string;
  interventions?: Intervention[];
}
