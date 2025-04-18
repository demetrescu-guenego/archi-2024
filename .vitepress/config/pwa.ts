import { PwaOptions } from "@vite-pwa/vitepress";

export const pwa: PwaOptions = {
  outDir: "../.vitepress/dist",
  includeAssets: ["/home/*.jpg", "/photos/**/*.{jpg,webp,avif}"],
  manifest: {
    name: "Guénégo Architectes",
    short_name: "Guénégo",
    description: "Cabinet d'architecture GUÉNÉGO - DEMETRESCU",
    theme_color: "#ffffff",
    scope: "/",
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
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
};
