// https://vitepress.dev/guide/custom-theme
import MainLayout from "./MainLayout.vue";
import type { Theme } from "vitepress";
import "./style.css";

export default {
  Layout: MainLayout,
  // enhanceApp({ app, router, siteData }) {
  //   // ...
  // },
} satisfies Theme;
