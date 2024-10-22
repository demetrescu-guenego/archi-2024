import { defineConfig } from "vitepress";
import { contentLoader } from "./plugins/contentLoader.plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cabinet d'architecture DEMETRESCU - GUÉNÉGO",
  description: "Architectures, Patrimoine, Eglises, Abbayes, Châteaux, Granges",
  cleanUrls: true,
  head: [["link", { rel: "icon", href: "/favicon.png" }]],
  srcDir: "./src",
  vite: {
    plugins: [contentLoader],
  },
});
