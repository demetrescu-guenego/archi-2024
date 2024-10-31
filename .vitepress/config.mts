import { withPwa } from "@vite-pwa/vitepress";
import removeConsole from "vite-plugin-remove-console";
import { defineConfig } from "vitepress";
import { contentLoader } from "./plugins/contentLoader.plugin";
import { specificConfig } from "./siteconfig";
import { head, transformHead } from "./config/header";

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    lang: "fr",
    title: "Cabinet d'architecture DEMETRESCU - GUÉNÉGO",
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
    pwa: {
      outDir: "../.vitepress/dist",
      includeAssets: ["/home/*.jpg", "/photos/**/*.{jpg,webp}"],
      manifest: {
        name: "Guénégo Architectes",
        short_name: "Guénégo Archi",
        description: "Cabinet d'architecture GUÉNÉGO - DEMETRESCU",
        theme_color: "#ffffff",
        lang: "fr",
        icons: [
          {
            src: "/pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
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
