import { CardContent } from "./CardContent";

interface YearItem {
  type: "year";
  year: number;
}

interface ProjectItem {
  type: "project";
  project: CardContent;
}
interface HeaderItem {
  type: "header";
}
interface FooterItem {
  type: "footer";
  total: number;
  current: number;
}
interface BlankItem {
  type: "blank";
}

export type PrintableItem =
  | YearItem
  | ProjectItem
  | HeaderItem
  | FooterItem
  | BlankItem;
