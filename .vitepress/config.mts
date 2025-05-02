import { withPwa } from "@vite-pwa/vitepress";
import removeConsole from "vite-plugin-remove-console";
import { defineConfig } from "vitepress";
import { head, transformHead } from "./config/header";
import { pwa } from "./config/pwa";
import { contentLoader } from "./plugins/contentLoader.plugin";
import { specificConfig } from "./siteconfig";

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    lang: "fr",
    title: "xxx",
    titleTemplate: "Cabinet d'architecture DEMETRESCU - GUÉNÉGO",
    description:
      "Seine et Marne, 77, Torcy - Architectures, Patrimoine, Eglises, Abbayes, Châteaux, Granges, Restauration - Mairies, Collectivités Locales",
    head,
    transformHead,
    cleanUrls: true,
    srcDir: specificConfig.srcDir,
    vite: {
      plugins: [contentLoader, removeConsole()],
      server: {
        host: true,
      },
    },
    pwa,
  }),
);
