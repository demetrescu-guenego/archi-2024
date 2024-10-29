import { defineConfig, HeadConfig } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";
import { contentLoader } from "./plugins/contentLoader.plugin";
import { specificConfig } from "./siteconfig";
import removeConsole from "vite-plugin-remove-console";

const head: HeadConfig[] = [
  ["link", { rel: "icon", href: "/favicon.ico", sizes: "48x48" }],
  [
    "link",
    {
      rel: "icon",
      href: "/favicon.svg",
      sizes: "any",
      type: "image/svg+xml",
    },
  ],
  ["link", { name: "apple-touch-icon", href: "/apple-touch-icon-180x180.png" }],
  [
    "meta",
    {
      property: "og:image",
      content: "https://archi.guenego.com/home/ferrieres-portrait.jpg",
    },
  ],
];

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    lang: "fr",
    title: "Cabinet d'architecture DEMETRESCU - GUÉNÉGO",
    description:
      "Seine et Marne, 77, Torcy - Architectures, Patrimoine, Eglises, Abbayes, Châteaux, Granges, Restauration - Mairies, Collectivités Locales",
    head: head,
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
      includeAssets: ["/home/*.jpg"],
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
