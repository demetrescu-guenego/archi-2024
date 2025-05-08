// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import MainLayout from "./MainLayout.vue";
import "./style.css";
import { vAutofocus } from "./directives/vAutofocus";

export default {
  Layout: MainLayout,
  enhanceApp({ app }) {
    app.directive("autofocus", vAutofocus);
  },
} satisfies Theme;
