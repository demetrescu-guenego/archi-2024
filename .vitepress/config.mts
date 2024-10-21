import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Cabinet d'architecture DEMETRESCU - GUÉNÉGO",
  description: "Architectures, Patrimoine, Eglises, Abbayes, Châteaux, Granges",
  cleanUrls: true,
  head: [["link", { rel: "icon", href: "/favicon.png" }]],
});
