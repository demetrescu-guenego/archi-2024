import { defineConfig, HeadConfig } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";
import { contentLoader } from "./plugins/contentLoader.plugin";
import { specificConfig } from "./siteconfig";

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
];

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    lang: "fr",
    title: "Cabinet d'architecture DEMETRESCU - GUÉNÉGO",
    description:
      "Architectures, Patrimoine, Eglises, Abbayes, Châteaux, Granges",
    head: head,
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
