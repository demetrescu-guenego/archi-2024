import { defineConfig } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";
import { contentLoader } from "./plugins/contentLoader.plugin";
import { specificConfig } from "./siteconfig";

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    lang: "fr",
    title: "Cabinet d'architecture DEMETRESCU - GUÉNÉGO",
    description:
      "Architectures, Patrimoine, Eglises, Abbayes, Châteaux, Granges",
    cleanUrls: true,
    srcDir: specificConfig.srcDir,
    vite: {
      plugins: [contentLoader],
      server: {
        host: true,
      },
    },
    pwa: {
      outDir: "../.vitepress/dist",
      pwaAssets: {
        disabled: false,
        config: true,
      },
      manifest: {
        name: "Guénégo Architectes",
        short_name: "Guénégo Archi",
        description: "Cabinet d'architecture GUÉNÉGO - DEMETRESCU",
        theme_color: "#ffffff",
        lang: "fr",
        screenshots: [
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            label: "Guénégo Archi",
          },
          {
            src: "/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            label: "Guénégo Archi",
            form_factor: "wide",
          },
        ],
      },
    },
  }),
);
