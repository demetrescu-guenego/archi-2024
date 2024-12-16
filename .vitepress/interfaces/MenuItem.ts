import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface MenuItem {
  href: string;
  title: string;
  newWindow?: boolean;
  primary?: boolean;
  icon?: IconDefinition;
}
