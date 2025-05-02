// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import MainLayout from "./MainLayout.vue";
import "./style.css";

export default {
  Layout: MainLayout,
  // enhanceApp({ app, router, siteData }) {
  //   // ...
  // },
} satisfies Theme;
