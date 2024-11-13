import { Intervention } from "./Intervention";

export interface Project {
  id: string;
  label: string;
  category: string;
  interventions?: Intervention[];
}
