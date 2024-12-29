// .vitepress/config.mts
import { withPwa } from "file:///D:/___ARCHITECT/archi2024/node_modules/@vite-pwa/vitepress/dist/index.mjs";
import removeConsole from "file:///D:/___ARCHITECT/archi2024/node_modules/vite-plugin-remove-console/dist/index.mjs";
import { defineConfig } from "file:///D:/___ARCHITECT/archi2024/node_modules/vitepress/dist/node/index.js";

// .vitepress/config/header.ts
var head = [
  ["link", { rel: "icon", href: "/favicon.ico", sizes: "48x48" }],
  [
    "link",
    {
      rel: "icon",
      href: "/favicon.svg",
      sizes: "any",
      type: "image/svg+xml"
    }
  ],
  ["link", { rel: "apple-touch-icon", href: "/apple-touch-icon-180x180.png" }],
  // ["script", { src: "https://cdn.botpress.cloud/webchat/v2.2/inject.js" }],
  // [
  //   "script",
  //   {
  //     src: "https://files.bpcontent.cloud/2024/11/10/12/20241110125112-DCSUYDWO.js",
  //   },
  // ],
  ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
  [
    "link",
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }
  ],
  [
    "link",
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Display:ital,wght@0,100..900;1,100..900&family=Sarala:wght@400;700&display=swap"
    }
  ]
];
var transformHead = ({ pageData }) => {
  const isProject = pageData.relativePath.match(new RegExp("realisations/[^/]+/[^/]+")) !== null;
  if (isProject) {
    const path2 = pageData.relativePath.replace(
      /^realisations\/(.*)\.md$/,
      "$1"
    );
    const parallax = `/photos/projects/${path2}/parallax.jpg`;
    const head3 = [
      [
        "meta",
        {
          property: "og:image",
          content: `https://archi.guenego.com${parallax}`
        }
      ]
    ];
    return head3;
  }
  const head2 = [
    [
      "meta",
      {
        property: "og:image",
        content: "https://archi.guenego.com/home/ferrieres-landscape.jpg"
      }
    ]
  ];
  return head2;
};

// .vitepress/config/pwa.ts
var pwa = {
  outDir: "../.vitepress/dist",
  includeAssets: ["/home/*.jpg", "/photos/**/*.{jpg,webp}"],
  manifest: {
    name: "Gu\xE9n\xE9go Architectes",
    short_name: "Gu\xE9n\xE9go",
    description: "Cabinet d'architecture GU\xC9N\xC9GO - DEMETRESCU",
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
        type: "image/png"
      },
      {
        src: "/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    screenshots: [
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        label: "Gu\xE9n\xE9go Archi"
      },
      {
        src: "/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        label: "Gu\xE9n\xE9go Archi",
        form_factor: "wide"
      }
    ]
  }
};

// .vitepress/plugins/utils/createContentLoader.ts
import { glob } from "file:///D:/___ARCHITECT/archi2024/node_modules/glob/dist/esm/index.js";
import matter from "file:///D:/___ARCHITECT/archi2024/node_modules/gray-matter/index.js";
import { readFileSync } from "node:fs";
import path from "node:path";

// .vitepress/siteconfig.ts
var specificConfig = {
  srcDir: "./src"
};

// .vitepress/plugins/utils/createContentLoader.ts
var createContentLoader = (pattern) => {
  const srcDir = path.resolve(specificConfig.srcDir);
  return {
    async load() {
      const files = await glob(pattern, {
        cwd: srcDir,
        posix: true
      });
      const posts = [];
      for (const file of files) {
        const src = readFileSync(path.join(srcDir, file), "utf-8");
        const matterContent = matter(src, { excerpt: false });
        posts.push({
          url: file.replace(/.md$/, ""),
          frontmatter: matterContent.data
        });
      }
      return posts;
    }
  };
};

// .vitepress/utils/gps.ts
import { readFileSync as readFileSync2 } from "node:fs";
import { csvParse } from "file:///D:/___ARCHITECT/archi2024/node_modules/d3/src/index.js";
var __vite_injected_original_dirname = "D:\\___ARCHITECT\\archi2024\\.vitepress\\utils";
var DEFAULT_GPS = {
  latitude: 0,
  longitude: 0
};
var map = /* @__PURE__ */ new Map();
var __dirname = __vite_injected_original_dirname;
var init = () => {
  const csvRaw = readFileSync2(
    __dirname + "/zipcode/base-officielle-codes-postaux.csv",
    { encoding: "utf-8" }
  );
  const csv = csvParse(csvRaw);
  for (const r of csv) {
    const geopoint = r._geopoint;
    const [latitude, longitude] = geopoint.split(",").map((s) => +s);
    map.set(r.code_postal + r.nom_de_la_commune, { latitude, longitude });
  }
};
init();
var getGPSCoordFromZipcode = (zipcode) => {
  const gps = map.get(zipcode.toString());
  return gps ?? DEFAULT_GPS;
};

// .vitepress/utils/slug.ts
var toSlug = (text) => {
  text = text.normalize("NFD");
  const result = text.replace(/[\u0300-\u036f]/g, "").replace(/[ ']/g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
  return result;
};

// .vitepress/plugins/utils/sort.ts
var sort = (array) => {
  const u = [...new Set(array)];
  return u.sort();
};

// .vitepress/plugins/utils/filter.ts
var reducer = (acc, client) => {
  const item = acc.get(client.name);
  if (item) {
    client.years.push(...client.years);
    return acc;
  }
  acc.set(client.name, client);
  return acc;
};
var normalize = (mairie) => {
  return toSlug(mairie).toUpperCase().replaceAll(/[^A-Z]/g, " ");
};
var filterPostByClientType = (posts, type) => {
  const iterator = posts.filter((post) => {
    if (typeof post.frontmatter.client !== "object") {
      return false;
    }
    return post.frontmatter.client?.type === type;
  }).map((post) => {
    const client = post.frontmatter.client;
    return {
      ...client,
      years: (post.frontmatter.interventions ?? []).map((i) => +String(i.year).substring(0, 4)).sort()
    };
  }).reduce(reducer, /* @__PURE__ */ new Map()).values();
  return [...iterator].map((client) => {
    client.years = sort(client.years);
    const key = client.commune ? client.commune.zip + normalize(client.commune.name) : client.zip + normalize(client.name);
    console.log("key: ", key);
    client.gps = client.gps ?? getGPSCoordFromZipcode(key);
    console.log("client.gps: ", client.gps);
    return client;
  });
};

// .vitepress/plugins/loaders/client.ts
var clientLoad = async (id) => {
  const regex = /^.*\/(clients|carte).md$/;
  const matches = id.match(regex);
  if (!matches) {
    return;
  }
  const posts = await createContentLoader(`realisations/**/*.md`).load();
  const mairies = filterPostByClientType(posts, "Mairie");
  const publicOthers = filterPostByClientType(posts, "Public Autres");
  const jsonString = JSON.stringify({
    title: matches[1] === "clients" ? "Clients" : "Carte",
    layout: matches[1] === "clients" ? "clients" : "map",
    mairies,
    publicOthers
  });
  return `---
${jsonString}
---
  `;
};

// .vitepress/plugins/loaders/mairie.ts
import { basename, dirname } from "node:path";
var mairieLoad = async (id) => {
  const regex = /^.*\/clients\/([^/]*).md$/;
  if (!id.match(regex)) {
    return;
  }
  const place = id.replace(regex, "$1");
  const posts = await createContentLoader(`realisations/**/*.md`).load();
  let client = {
    name: "inconnu",
    zip: "00000",
    type: "Mairie",
    years: []
  };
  const projects = posts.filter((post) => {
    if (typeof post.frontmatter.client !== "object") {
      return false;
    }
    if (toSlug(post.frontmatter.client.name) !== place) {
      return false;
    }
    client = post.frontmatter.client;
    return true;
  }).map((post) => {
    return {
      id: basename(post.url),
      title: post.frontmatter.title,
      category: basename(dirname(post.url))
    };
  });
  const jsonString = JSON.stringify({
    title: `${client.name} (${client.zip})`,
    layout: "mairie",
    client,
    projects
  });
  return `---
${jsonString}
---
  `;
};

// .vitepress/plugins/loaders/realisation.ts
import { basename as basename2 } from "node:path";

// commons/data.ts
var data = {
  categories: [
    {
      id: "chateaux",
      title: "Ch\xE2teaux",
      name: "ferrieres"
    },
    {
      id: "eglises",
      title: "Eglises",
      name: "chauconin"
    },
    {
      id: "remparts",
      title: "Remparts",
      name: "charleville-mezieres"
    },
    {
      id: "abbayes",
      title: "Abbayes",
      name: "dammarie-les-lys"
    },
    {
      id: "fermes",
      title: "Fermes",
      name: "coupvray"
    },
    {
      id: "restaurations",
      title: "Parements ext\xE9rieurs",
      name: "bois-le-roi"
    },
    {
      id: "serres",
      title: "Serres",
      name: "villiers-en-biere"
    },
    {
      id: "tertiaires",
      title: "Tertiaire - Administration",
      name: "tournan-en-brie"
    },
    {
      id: "sports",
      title: "Sports - Loisirs",
      name: "torcy-stade"
    },
    {
      id: "marches",
      title: "March\xE9s couverts",
      name: "torcy"
    },
    {
      id: "scolaire",
      title: "Scolaire - Education",
      name: "poincy"
    }
  ]
};

// .vitepress/plugins/utils/label.ts
var getCategoryLabel = (category) => {
  const c = data.categories.find((c2) => c2.id === category);
  return c !== void 0 ? c.title : "title not found";
};

// .vitepress/plugins/loaders/realisation.ts
var realisationLoad = async (id) => {
  const regex = /^.*\/realisations\/([^/]*).md$/;
  if (!id.match(regex)) {
    return;
  }
  const category = id.replace(regex, "$1");
  const title = getCategoryLabel(category);
  const posts = await createContentLoader(
    `realisations/${category}/*.md`
  ).load();
  const projects = posts.map((post) => {
    return {
      id: basename2(post.url),
      title: post.frontmatter.title,
      interventions: post.frontmatter.interventions
    };
  });
  const jsonString = JSON.stringify({
    title,
    layout: "category",
    category,
    projects
  });
  return `---
${jsonString}
---
`;
};

// .vitepress/plugins/contentLoader.plugin.ts
var contentLoader = {
  name: "content-loader",
  async load(id) {
    return await realisationLoad(id) ?? await clientLoad(id) ?? await mairieLoad(id);
  }
};

// .vitepress/config.mts
var config_default = withPwa(
  defineConfig({
    lang: "fr",
    title: "xxx",
    titleTemplate: "Cabinet d'architecture DEMETRESCU - GU\xC9N\xC9GO",
    description: "Seine et Marne, 77, Torcy - Architectures, Patrimoine, Eglises, Abbayes, Ch\xE2teaux, Granges, Restauration - Mairies, Collectivit\xE9s Locales",
    head,
    transformHead,
    cleanUrls: true,
    srcDir: specificConfig.srcDir,
    vite: {
      plugins: [contentLoader, removeConsole()],
      server: {
        host: true
      }
    },
    pwa
  })
);
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubXRzIiwgIi52aXRlcHJlc3MvY29uZmlnL2hlYWRlci50cyIsICIudml0ZXByZXNzL2NvbmZpZy9wd2EudHMiLCAiLnZpdGVwcmVzcy9wbHVnaW5zL3V0aWxzL2NyZWF0ZUNvbnRlbnRMb2FkZXIudHMiLCAiLnZpdGVwcmVzcy9zaXRlY29uZmlnLnRzIiwgIi52aXRlcHJlc3MvdXRpbHMvZ3BzLnRzIiwgIi52aXRlcHJlc3MvdXRpbHMvc2x1Zy50cyIsICIudml0ZXByZXNzL3BsdWdpbnMvdXRpbHMvc29ydC50cyIsICIudml0ZXByZXNzL3BsdWdpbnMvdXRpbHMvZmlsdGVyLnRzIiwgIi52aXRlcHJlc3MvcGx1Z2lucy9sb2FkZXJzL2NsaWVudC50cyIsICIudml0ZXByZXNzL3BsdWdpbnMvbG9hZGVycy9tYWlyaWUudHMiLCAiLnZpdGVwcmVzcy9wbHVnaW5zL2xvYWRlcnMvcmVhbGlzYXRpb24udHMiLCAiY29tbW9ucy9kYXRhLnRzIiwgIi52aXRlcHJlc3MvcGx1Z2lucy91dGlscy9sYWJlbC50cyIsICIudml0ZXByZXNzL3BsdWdpbnMvY29udGVudExvYWRlci5wbHVnaW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXC52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXF9fX0FSQ0hJVEVDVFxcXFxhcmNoaTIwMjRcXFxcLnZpdGVwcmVzc1xcXFxjb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9fX19BUkNISVRFQ1QvYXJjaGkyMDI0Ly52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IHdpdGhQd2EgfSBmcm9tIFwiQHZpdGUtcHdhL3ZpdGVwcmVzc1wiO1xuaW1wb3J0IHJlbW92ZUNvbnNvbGUgZnJvbSBcInZpdGUtcGx1Z2luLXJlbW92ZS1jb25zb2xlXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZXByZXNzXCI7XG5pbXBvcnQgeyBoZWFkLCB0cmFuc2Zvcm1IZWFkIH0gZnJvbSBcIi4vY29uZmlnL2hlYWRlclwiO1xuaW1wb3J0IHsgcHdhIH0gZnJvbSBcIi4vY29uZmlnL3B3YVwiO1xuaW1wb3J0IHsgY29udGVudExvYWRlciB9IGZyb20gXCIuL3BsdWdpbnMvY29udGVudExvYWRlci5wbHVnaW5cIjtcbmltcG9ydCB7IHNwZWNpZmljQ29uZmlnIH0gZnJvbSBcIi4vc2l0ZWNvbmZpZ1wiO1xuXG4vLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL3NpdGUtY29uZmlnXG5leHBvcnQgZGVmYXVsdCB3aXRoUHdhKFxuICBkZWZpbmVDb25maWcoe1xuICAgIGxhbmc6IFwiZnJcIixcbiAgICB0aXRsZTogXCJ4eHhcIixcbiAgICB0aXRsZVRlbXBsYXRlOiBcIkNhYmluZXQgZCdhcmNoaXRlY3R1cmUgREVNRVRSRVNDVSAtIEdVXHUwMEM5Tlx1MDBDOUdPXCIsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICBcIlNlaW5lIGV0IE1hcm5lLCA3NywgVG9yY3kgLSBBcmNoaXRlY3R1cmVzLCBQYXRyaW1vaW5lLCBFZ2xpc2VzLCBBYmJheWVzLCBDaFx1MDBFMnRlYXV4LCBHcmFuZ2VzLCBSZXN0YXVyYXRpb24gLSBNYWlyaWVzLCBDb2xsZWN0aXZpdFx1MDBFOXMgTG9jYWxlc1wiLFxuICAgIGhlYWQsXG4gICAgdHJhbnNmb3JtSGVhZCxcbiAgICBjbGVhblVybHM6IHRydWUsXG4gICAgc3JjRGlyOiBzcGVjaWZpY0NvbmZpZy5zcmNEaXIsXG4gICAgdml0ZToge1xuICAgICAgcGx1Z2luczogW2NvbnRlbnRMb2FkZXIsIHJlbW92ZUNvbnNvbGUoKV0sXG4gICAgICBzZXJ2ZXI6IHtcbiAgICAgICAgaG9zdDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwd2EsXG4gIH0pLFxuKTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxoZWFkZXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L19fX0FSQ0hJVEVDVC9hcmNoaTIwMjQvLnZpdGVwcmVzcy9jb25maWcvaGVhZGVyLnRzXCI7aW1wb3J0IHsgSGVhZENvbmZpZyB9IGZyb20gXCJ2aXRlcHJlc3NcIjtcblxuZXhwb3J0IGNvbnN0IGhlYWQ6IEhlYWRDb25maWdbXSA9IFtcbiAgW1wibGlua1wiLCB7IHJlbDogXCJpY29uXCIsIGhyZWY6IFwiL2Zhdmljb24uaWNvXCIsIHNpemVzOiBcIjQ4eDQ4XCIgfV0sXG4gIFtcbiAgICBcImxpbmtcIixcbiAgICB7XG4gICAgICByZWw6IFwiaWNvblwiLFxuICAgICAgaHJlZjogXCIvZmF2aWNvbi5zdmdcIixcbiAgICAgIHNpemVzOiBcImFueVwiLFxuICAgICAgdHlwZTogXCJpbWFnZS9zdmcreG1sXCIsXG4gICAgfSxcbiAgXSxcbiAgW1wibGlua1wiLCB7IHJlbDogXCJhcHBsZS10b3VjaC1pY29uXCIsIGhyZWY6IFwiL2FwcGxlLXRvdWNoLWljb24tMTgweDE4MC5wbmdcIiB9XSxcbiAgLy8gW1wic2NyaXB0XCIsIHsgc3JjOiBcImh0dHBzOi8vY2RuLmJvdHByZXNzLmNsb3VkL3dlYmNoYXQvdjIuMi9pbmplY3QuanNcIiB9XSxcbiAgLy8gW1xuICAvLyAgIFwic2NyaXB0XCIsXG4gIC8vICAge1xuICAvLyAgICAgc3JjOiBcImh0dHBzOi8vZmlsZXMuYnBjb250ZW50LmNsb3VkLzIwMjQvMTEvMTAvMTIvMjAyNDExMTAxMjUxMTItRENTVVlEV08uanNcIixcbiAgLy8gICB9LFxuICAvLyBdLFxuXG4gIFtcImxpbmtcIiwgeyByZWw6IFwicHJlY29ubmVjdFwiLCBocmVmOiBcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb21cIiB9XSxcbiAgW1xuICAgIFwibGlua1wiLFxuICAgIHsgcmVsOiBcInByZWNvbm5lY3RcIiwgaHJlZjogXCJodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tXCIsIGNyb3Nzb3JpZ2luOiBcIlwiIH0sXG4gIF0sXG4gIFtcbiAgICBcImxpbmtcIixcbiAgICB7XG4gICAgICByZWw6IFwic3R5bGVzaGVldFwiLFxuICAgICAgaHJlZjogXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PU5vdG8rU2FucytEaXNwbGF5Oml0YWwsd2dodEAwLDEwMC4uOTAwOzEsMTAwLi45MDAmZmFtaWx5PVNhcmFsYTp3Z2h0QDQwMDs3MDAmZGlzcGxheT1zd2FwXCIsXG4gICAgfSxcbiAgXSxcbl07XG5cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1IZWFkID0gKHsgcGFnZURhdGEgfSkgPT4ge1xuICBjb25zdCBpc1Byb2plY3QgPVxuICAgIHBhZ2VEYXRhLnJlbGF0aXZlUGF0aC5tYXRjaChuZXcgUmVnRXhwKFwicmVhbGlzYXRpb25zL1teL10rL1teL10rXCIpKSAhPT1cbiAgICBudWxsO1xuXG4gIGlmIChpc1Byb2plY3QpIHtcbiAgICBjb25zdCBwYXRoID0gcGFnZURhdGEucmVsYXRpdmVQYXRoLnJlcGxhY2UoXG4gICAgICAvXnJlYWxpc2F0aW9uc1xcLyguKilcXC5tZCQvLFxuICAgICAgXCIkMVwiLFxuICAgICk7XG4gICAgY29uc3QgcGFyYWxsYXggPSBgL3Bob3Rvcy9wcm9qZWN0cy8ke3BhdGh9L3BhcmFsbGF4LmpwZ2A7XG5cbiAgICBjb25zdCBoZWFkOiBIZWFkQ29uZmlnW10gPSBbXG4gICAgICBbXG4gICAgICAgIFwibWV0YVwiLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvcGVydHk6IFwib2c6aW1hZ2VcIixcbiAgICAgICAgICBjb250ZW50OiBgaHR0cHM6Ly9hcmNoaS5ndWVuZWdvLmNvbSR7cGFyYWxsYXh9YCxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgXTtcbiAgICByZXR1cm4gaGVhZDtcbiAgfVxuICBjb25zdCBoZWFkOiBIZWFkQ29uZmlnW10gPSBbXG4gICAgW1xuICAgICAgXCJtZXRhXCIsXG4gICAgICB7XG4gICAgICAgIHByb3BlcnR5OiBcIm9nOmltYWdlXCIsXG4gICAgICAgIGNvbnRlbnQ6IFwiaHR0cHM6Ly9hcmNoaS5ndWVuZWdvLmNvbS9ob21lL2ZlcnJpZXJlcy1sYW5kc2NhcGUuanBnXCIsXG4gICAgICB9LFxuICAgIF0sXG4gIF07XG4gIHJldHVybiBoZWFkO1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxwd2EudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L19fX0FSQ0hJVEVDVC9hcmNoaTIwMjQvLnZpdGVwcmVzcy9jb25maWcvcHdhLnRzXCI7aW1wb3J0IHsgUHdhT3B0aW9ucyB9IGZyb20gXCJAdml0ZS1wd2Evdml0ZXByZXNzXCI7XG5cbmV4cG9ydCBjb25zdCBwd2E6IFB3YU9wdGlvbnMgPSB7XG4gIG91dERpcjogXCIuLi8udml0ZXByZXNzL2Rpc3RcIixcbiAgaW5jbHVkZUFzc2V0czogW1wiL2hvbWUvKi5qcGdcIiwgXCIvcGhvdG9zLyoqLyoue2pwZyx3ZWJwfVwiXSxcbiAgbWFuaWZlc3Q6IHtcbiAgICBuYW1lOiBcIkd1XHUwMEU5blx1MDBFOWdvIEFyY2hpdGVjdGVzXCIsXG4gICAgc2hvcnRfbmFtZTogXCJHdVx1MDBFOW5cdTAwRTlnb1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkNhYmluZXQgZCdhcmNoaXRlY3R1cmUgR1VcdTAwQzlOXHUwMEM5R08gLSBERU1FVFJFU0NVXCIsXG4gICAgdGhlbWVfY29sb3I6IFwiI2ZmZmZmZlwiLFxuICAgIHNjb3BlOiBcIi9cIixcbiAgICBzdGFydF91cmw6IFwiL1wiLFxuICAgIGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxuICAgIG9yaWVudGF0aW9uOiBcInBvcnRyYWl0LXByaW1hcnlcIixcbiAgICBsYW5nOiBcImZyXCIsXG4gICAgaWNvbnM6IFtcbiAgICAgIHtcbiAgICAgICAgc3JjOiBcIi9wd2EtNjR4NjQucG5nXCIsXG4gICAgICAgIHNpemVzOiBcIjY0eDY0XCIsXG4gICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzcmM6IFwiL3B3YS0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzcmM6IFwiL3B3YS01MTJ4NTEyLnBuZ1wiLFxuICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICB9LFxuICAgIF0sXG4gICAgc2NyZWVuc2hvdHM6IFtcbiAgICAgIHtcbiAgICAgICAgc3JjOiBcIi9wd2EtNTEyeDUxMi5wbmdcIixcbiAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICBsYWJlbDogXCJHdVx1MDBFOW5cdTAwRTlnbyBBcmNoaVwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3JjOiBcIi9tYXNrYWJsZS1pY29uLTUxMng1MTIucG5nXCIsXG4gICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgbGFiZWw6IFwiR3VcdTAwRTluXHUwMEU5Z28gQXJjaGlcIixcbiAgICAgICAgZm9ybV9mYWN0b3I6IFwid2lkZVwiLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXHBsdWdpbnNcXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXF9fX0FSQ0hJVEVDVFxcXFxhcmNoaTIwMjRcXFxcLnZpdGVwcmVzc1xcXFxwbHVnaW5zXFxcXHV0aWxzXFxcXGNyZWF0ZUNvbnRlbnRMb2FkZXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L19fX0FSQ0hJVEVDVC9hcmNoaTIwMjQvLnZpdGVwcmVzcy9wbHVnaW5zL3V0aWxzL2NyZWF0ZUNvbnRlbnRMb2FkZXIudHNcIjtpbXBvcnQgeyBnbG9iIH0gZnJvbSBcImdsb2JcIjtcbmltcG9ydCBtYXR0ZXIgZnJvbSBcImdyYXktbWF0dGVyXCI7XG5pbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHsgUG9zdCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL1Bvc3RcIjtcbmltcG9ydCB7IHNwZWNpZmljQ29uZmlnIH0gZnJvbSBcIi4uLy4uL3NpdGVjb25maWdcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNvbnRlbnRMb2FkZXIgPSAocGF0dGVybjogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IHNyY0RpciA9IHBhdGgucmVzb2x2ZShzcGVjaWZpY0NvbmZpZy5zcmNEaXIpO1xuICByZXR1cm4ge1xuICAgIGFzeW5jIGxvYWQoKTogUHJvbWlzZTxQb3N0W10+IHtcbiAgICAgIC8vIGxvb2sgYXQgYWxsIGZpbGVzIGluIHBhdHRlcm5cbiAgICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgZ2xvYihwYXR0ZXJuLCB7XG4gICAgICAgIGN3ZDogc3JjRGlyLFxuICAgICAgICBwb3NpeDogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgLy8gZXh0cmFjdCB0aGVtIHRoZSBmcm9udG1hdHRlciBhbmQgdGhlIHVybFxuICAgICAgY29uc3QgcG9zdHM6IFBvc3RbXSA9IFtdO1xuICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IHJlYWRGaWxlU3luYyhwYXRoLmpvaW4oc3JjRGlyLCBmaWxlKSwgXCJ1dGYtOFwiKTtcbiAgICAgICAgY29uc3QgbWF0dGVyQ29udGVudCA9IG1hdHRlcihzcmMsIHsgZXhjZXJwdDogZmFsc2UgfSk7XG5cbiAgICAgICAgcG9zdHMucHVzaCh7XG4gICAgICAgICAgdXJsOiBmaWxlLnJlcGxhY2UoLy5tZCQvLCBcIlwiKSxcbiAgICAgICAgICBmcm9udG1hdHRlcjogbWF0dGVyQ29udGVudC5kYXRhIGFzIFBvc3RbXCJmcm9udG1hdHRlclwiXSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcG9zdHM7XG4gICAgfSxcbiAgfTtcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXF9fX0FSQ0hJVEVDVFxcXFxhcmNoaTIwMjRcXFxcLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXHNpdGVjb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L19fX0FSQ0hJVEVDVC9hcmNoaTIwMjQvLnZpdGVwcmVzcy9zaXRlY29uZmlnLnRzXCI7ZXhwb3J0IGNvbnN0IHNwZWNpZmljQ29uZmlnID0ge1xuICBzcmNEaXI6IFwiLi9zcmNcIixcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXF9fX0FSQ0hJVEVDVFxcXFxhcmNoaTIwMjRcXFxcLnZpdGVwcmVzc1xcXFx1dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXHV0aWxzXFxcXGdwcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovX19fQVJDSElURUNUL2FyY2hpMjAyNC8udml0ZXByZXNzL3V0aWxzL2dwcy50c1wiO2ltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgeyBHUFNDb29yZCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0dQU0Nvb3JkXCI7XG5pbXBvcnQgeyBjc3ZQYXJzZSB9IGZyb20gXCJkM1wiO1xuXG5jb25zdCBERUZBVUxUX0dQUzogR1BTQ29vcmQgPSB7XG4gIGxhdGl0dWRlOiAwLFxuICBsb25naXR1ZGU6IDAsXG59O1xuXG5jb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgR1BTQ29vcmQ+KCk7XG5cbmNvbnN0IF9fZGlybmFtZSA9IGltcG9ydC5tZXRhLmRpcm5hbWU7XG5cbmNvbnN0IGluaXQgPSAoKSA9PiB7XG4gIGNvbnN0IGNzdlJhdyA9IHJlYWRGaWxlU3luYyhcbiAgICBfX2Rpcm5hbWUgKyBcIi96aXBjb2RlL2Jhc2Utb2ZmaWNpZWxsZS1jb2Rlcy1wb3N0YXV4LmNzdlwiLFxuICAgIHsgZW5jb2Rpbmc6IFwidXRmLThcIiB9LFxuICApO1xuXG4gIGNvbnN0IGNzdiA9IGNzdlBhcnNlKGNzdlJhdyk7XG5cbiAgZm9yIChjb25zdCByIG9mIGNzdikge1xuICAgIGNvbnN0IGdlb3BvaW50ID0gci5fZ2VvcG9pbnQ7XG4gICAgY29uc3QgW2xhdGl0dWRlLCBsb25naXR1ZGVdID0gZ2VvcG9pbnQuc3BsaXQoXCIsXCIpLm1hcCgocykgPT4gK3MpO1xuICAgIG1hcC5zZXQoci5jb2RlX3Bvc3RhbCArIHIubm9tX2RlX2xhX2NvbW11bmUsIHsgbGF0aXR1ZGUsIGxvbmdpdHVkZSB9KTtcbiAgfVxufTtcblxuaW5pdCgpO1xuXG5leHBvcnQgY29uc3QgZ2V0R1BTQ29vcmRGcm9tWmlwY29kZSA9ICh6aXBjb2RlOiBzdHJpbmcgfCBudW1iZXIpOiBHUFNDb29yZCA9PiB7XG4gIGNvbnN0IGdwcyA9IG1hcC5nZXQoemlwY29kZS50b1N0cmluZygpKTtcbiAgcmV0dXJuIGdwcyA/PyBERUZBVUxUX0dQUztcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXF9fX0FSQ0hJVEVDVFxcXFxhcmNoaTIwMjRcXFxcLnZpdGVwcmVzc1xcXFx1dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXHV0aWxzXFxcXHNsdWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L19fX0FSQ0hJVEVDVC9hcmNoaTIwMjQvLnZpdGVwcmVzcy91dGlscy9zbHVnLnRzXCI7ZXhwb3J0IGNvbnN0IHRvU2x1ZyA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgdGV4dCA9IHRleHQubm9ybWFsaXplKFwiTkZEXCIpO1xuXG4gIGNvbnN0IHJlc3VsdCA9IHRleHRcbiAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgXCJcIilcbiAgICAucmVwbGFjZSgvWyAnXS9nLCBcIi1cIilcbiAgICAucmVwbGFjZSgvW15hLXpBLVowLTktXS9nLCBcIlwiKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXC52aXRlcHJlc3NcXFxccGx1Z2luc1xcXFx1dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXHBsdWdpbnNcXFxcdXRpbHNcXFxcc29ydC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovX19fQVJDSElURUNUL2FyY2hpMjAyNC8udml0ZXByZXNzL3BsdWdpbnMvdXRpbHMvc29ydC50c1wiO2V4cG9ydCBjb25zdCBzb3J0ID0gKGFycmF5OiBudW1iZXJbXSk6IG51bWJlcltdID0+IHtcbiAgY29uc3QgdSA9IFsuLi5uZXcgU2V0KGFycmF5KV07XG4gIHJldHVybiB1LnNvcnQoKTtcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXF9fX0FSQ0hJVEVDVFxcXFxhcmNoaTIwMjRcXFxcLnZpdGVwcmVzc1xcXFxwbHVnaW5zXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXC52aXRlcHJlc3NcXFxccGx1Z2luc1xcXFx1dGlsc1xcXFxmaWx0ZXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L19fX0FSQ0hJVEVDVC9hcmNoaTIwMjQvLnZpdGVwcmVzcy9wbHVnaW5zL3V0aWxzL2ZpbHRlci50c1wiO2ltcG9ydCB7IENsaWVudCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL0NsaWVudFwiO1xuaW1wb3J0IHsgSW50ZXJ2ZW50aW9uIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvSW50ZXJ2ZW50aW9uXCI7XG5pbXBvcnQgeyBQb3N0IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvUG9zdFwiO1xuaW1wb3J0IHsgZ2V0R1BTQ29vcmRGcm9tWmlwY29kZSB9IGZyb20gXCIuLi8uLi91dGlscy9ncHNcIjtcbmltcG9ydCB7IHRvU2x1ZyB9IGZyb20gXCIuLi8uLi91dGlscy9zbHVnXCI7XG5pbXBvcnQgeyBzb3J0IH0gZnJvbSBcIi4vc29ydFwiO1xuXG5jb25zdCByZWR1Y2VyID0gKGFjYzogTWFwPHN0cmluZywgQ2xpZW50PiwgY2xpZW50OiBDbGllbnQpID0+IHtcbiAgY29uc3QgaXRlbSA9IGFjYy5nZXQoY2xpZW50Lm5hbWUpO1xuICBpZiAoaXRlbSkge1xuICAgIGNsaWVudC55ZWFycy5wdXNoKC4uLmNsaWVudC55ZWFycyk7XG4gICAgcmV0dXJuIGFjYztcbiAgfVxuICBhY2Muc2V0KGNsaWVudC5uYW1lLCBjbGllbnQpO1xuICByZXR1cm4gYWNjO1xufTtcblxuY29uc3Qgbm9ybWFsaXplID0gKG1haXJpZTogc3RyaW5nKSA9PiB7XG4gIHJldHVybiB0b1NsdWcobWFpcmllKVxuICAgIC50b1VwcGVyQ2FzZSgpXG4gICAgLnJlcGxhY2VBbGwoL1teQS1aXS9nLCBcIiBcIik7XG59O1xuXG5leHBvcnQgY29uc3QgZmlsdGVyUG9zdEJ5Q2xpZW50VHlwZSA9IChcbiAgcG9zdHM6IFBvc3RbXSxcbiAgdHlwZTogc3RyaW5nLFxuKTogQ2xpZW50W10gPT4ge1xuICBjb25zdCBpdGVyYXRvciA9IHBvc3RzXG4gICAgLmZpbHRlcigocG9zdCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBwb3N0LmZyb250bWF0dGVyLmNsaWVudCAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gcG9zdC5mcm9udG1hdHRlci5jbGllbnQ/LnR5cGUgPT09IHR5cGU7XG4gICAgfSlcbiAgICAubWFwKChwb3N0KSA9PiB7XG4gICAgICBjb25zdCBjbGllbnQgPSBwb3N0LmZyb250bWF0dGVyLmNsaWVudCBhcyBDbGllbnQ7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmNsaWVudCxcbiAgICAgICAgeWVhcnM6IChwb3N0LmZyb250bWF0dGVyLmludGVydmVudGlvbnMgPz8gW10pXG4gICAgICAgICAgLm1hcCgoaTogSW50ZXJ2ZW50aW9uKSA9PiArU3RyaW5nKGkueWVhcikuc3Vic3RyaW5nKDAsIDQpKVxuICAgICAgICAgIC5zb3J0KCksXG4gICAgICB9O1xuICAgIH0pXG4gICAgLnJlZHVjZShyZWR1Y2VyLCBuZXcgTWFwPHN0cmluZywgQ2xpZW50PigpKVxuICAgIC52YWx1ZXMoKTtcbiAgcmV0dXJuIFsuLi5pdGVyYXRvcl0ubWFwKChjbGllbnQpID0+IHtcbiAgICBjbGllbnQueWVhcnMgPSBzb3J0KGNsaWVudC55ZWFycyk7XG4gICAgY29uc3Qga2V5ID0gY2xpZW50LmNvbW11bmVcbiAgICAgID8gY2xpZW50LmNvbW11bmUuemlwICsgbm9ybWFsaXplKGNsaWVudC5jb21tdW5lLm5hbWUpXG4gICAgICA6IGNsaWVudC56aXAgKyBub3JtYWxpemUoY2xpZW50Lm5hbWUpO1xuICAgIGNvbnNvbGUubG9nKFwia2V5OiBcIiwga2V5KTtcbiAgICBjbGllbnQuZ3BzID0gY2xpZW50LmdwcyA/PyBnZXRHUFNDb29yZEZyb21aaXBjb2RlKGtleSk7XG4gICAgY29uc29sZS5sb2coXCJjbGllbnQuZ3BzOiBcIiwgY2xpZW50Lmdwcyk7XG4gICAgcmV0dXJuIGNsaWVudDtcbiAgfSk7XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXC52aXRlcHJlc3NcXFxccGx1Z2luc1xcXFxsb2FkZXJzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXC52aXRlcHJlc3NcXFxccGx1Z2luc1xcXFxsb2FkZXJzXFxcXGNsaWVudC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovX19fQVJDSElURUNUL2FyY2hpMjAyNC8udml0ZXByZXNzL3BsdWdpbnMvbG9hZGVycy9jbGllbnQudHNcIjtpbXBvcnQgeyBjcmVhdGVDb250ZW50TG9hZGVyIH0gZnJvbSBcIi4uL3V0aWxzL2NyZWF0ZUNvbnRlbnRMb2FkZXJcIjtcbmltcG9ydCB7IGZpbHRlclBvc3RCeUNsaWVudFR5cGUgfSBmcm9tIFwiLi4vdXRpbHMvZmlsdGVyXCI7XG5cbmV4cG9ydCBjb25zdCBjbGllbnRMb2FkID0gYXN5bmMgKGlkOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgcmVnZXggPSAvXi4qXFwvKGNsaWVudHN8Y2FydGUpLm1kJC87XG4gIGNvbnN0IG1hdGNoZXMgPSBpZC5tYXRjaChyZWdleCk7XG4gIGlmICghbWF0Y2hlcykge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBsb29rIGF0IGFsbCB0aGUgcHJvamVjdHMgYW5kIGdlbmVyYXRlIHRoZSBmcm9udG1hdHRlci5cbiAgY29uc3QgcG9zdHMgPSBhd2FpdCBjcmVhdGVDb250ZW50TG9hZGVyKGByZWFsaXNhdGlvbnMvKiovKi5tZGApLmxvYWQoKTtcblxuICBjb25zdCBtYWlyaWVzID0gZmlsdGVyUG9zdEJ5Q2xpZW50VHlwZShwb3N0cywgXCJNYWlyaWVcIik7XG4gIGNvbnN0IHB1YmxpY090aGVycyA9IGZpbHRlclBvc3RCeUNsaWVudFR5cGUocG9zdHMsIFwiUHVibGljIEF1dHJlc1wiKTtcblxuICBjb25zdCBqc29uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgIHRpdGxlOiBtYXRjaGVzWzFdID09PSBcImNsaWVudHNcIiA/IFwiQ2xpZW50c1wiIDogXCJDYXJ0ZVwiLFxuICAgIGxheW91dDogbWF0Y2hlc1sxXSA9PT0gXCJjbGllbnRzXCIgPyBcImNsaWVudHNcIiA6IFwibWFwXCIsXG4gICAgbWFpcmllcyxcbiAgICBwdWJsaWNPdGhlcnMsXG4gIH0pO1xuXG4gIHJldHVybiBgLS0tXG4ke2pzb25TdHJpbmd9XG4tLS1cbiAgYDtcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXF9fX0FSQ0hJVEVDVFxcXFxhcmNoaTIwMjRcXFxcLnZpdGVwcmVzc1xcXFxwbHVnaW5zXFxcXGxvYWRlcnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXF9fX0FSQ0hJVEVDVFxcXFxhcmNoaTIwMjRcXFxcLnZpdGVwcmVzc1xcXFxwbHVnaW5zXFxcXGxvYWRlcnNcXFxcbWFpcmllLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9fX19BUkNISVRFQ1QvYXJjaGkyMDI0Ly52aXRlcHJlc3MvcGx1Z2lucy9sb2FkZXJzL21haXJpZS50c1wiO2ltcG9ydCB7IGJhc2VuYW1lLCBkaXJuYW1lIH0gZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvQ2xpZW50XCI7XG5pbXBvcnQgeyB0b1NsdWcgfSBmcm9tIFwiLi4vLi4vdXRpbHMvc2x1Z1wiO1xuaW1wb3J0IHsgY3JlYXRlQ29udGVudExvYWRlciB9IGZyb20gXCIuLi91dGlscy9jcmVhdGVDb250ZW50TG9hZGVyXCI7XG5cbmV4cG9ydCBjb25zdCBtYWlyaWVMb2FkID0gYXN5bmMgKGlkOiBzdHJpbmcpID0+IHtcbiAgY29uc3QgcmVnZXggPSAvXi4qXFwvY2xpZW50c1xcLyhbXi9dKikubWQkLztcbiAgaWYgKCFpZC5tYXRjaChyZWdleCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcGxhY2UgPSBpZC5yZXBsYWNlKHJlZ2V4LCBcIiQxXCIpO1xuICAvLyBsb29rIGF0IGFsbCB0aGUgcHJvamVjdHMgYW5kIGdlbmVyYXRlIHRoZSBmcm9udG1hdHRlci5cbiAgY29uc3QgcG9zdHMgPSBhd2FpdCBjcmVhdGVDb250ZW50TG9hZGVyKGByZWFsaXNhdGlvbnMvKiovKi5tZGApLmxvYWQoKTtcblxuICBsZXQgY2xpZW50OiBDbGllbnQgPSB7XG4gICAgbmFtZTogXCJpbmNvbm51XCIsXG4gICAgemlwOiBcIjAwMDAwXCIsXG4gICAgdHlwZTogXCJNYWlyaWVcIixcbiAgICB5ZWFyczogW10sXG4gIH07XG5cbiAgY29uc3QgcHJvamVjdHMgPSBwb3N0c1xuICAgIC5maWx0ZXIoKHBvc3QpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgcG9zdC5mcm9udG1hdHRlci5jbGllbnQgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHRvU2x1Zyhwb3N0LmZyb250bWF0dGVyLmNsaWVudC5uYW1lKSAhPT0gcGxhY2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgY2xpZW50ID0gcG9zdC5mcm9udG1hdHRlci5jbGllbnQ7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KVxuICAgIC5tYXAoKHBvc3QpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBiYXNlbmFtZShwb3N0LnVybCksXG4gICAgICAgIHRpdGxlOiBwb3N0LmZyb250bWF0dGVyLnRpdGxlLFxuICAgICAgICBjYXRlZ29yeTogYmFzZW5hbWUoZGlybmFtZShwb3N0LnVybCkpLFxuICAgICAgfTtcbiAgICB9KTtcblxuICBjb25zdCBqc29uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgIHRpdGxlOiBgJHtjbGllbnQubmFtZX0gKCR7Y2xpZW50LnppcH0pYCxcbiAgICBsYXlvdXQ6IFwibWFpcmllXCIsXG4gICAgY2xpZW50LFxuICAgIHByb2plY3RzLFxuICB9KTtcblxuICByZXR1cm4gYC0tLVxuJHtqc29uU3RyaW5nfVxuLS0tXG4gIGA7XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXC52aXRlcHJlc3NcXFxccGx1Z2luc1xcXFxsb2FkZXJzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXC52aXRlcHJlc3NcXFxccGx1Z2luc1xcXFxsb2FkZXJzXFxcXHJlYWxpc2F0aW9uLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9fX19BUkNISVRFQ1QvYXJjaGkyMDI0Ly52aXRlcHJlc3MvcGx1Z2lucy9sb2FkZXJzL3JlYWxpc2F0aW9uLnRzXCI7aW1wb3J0IHsgYmFzZW5hbWUgfSBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgeyBnZXRDYXRlZ29yeUxhYmVsIH0gZnJvbSBcIi4uL3V0aWxzL2xhYmVsXCI7XG5pbXBvcnQgeyBjcmVhdGVDb250ZW50TG9hZGVyIH0gZnJvbSBcIi4uL3V0aWxzL2NyZWF0ZUNvbnRlbnRMb2FkZXJcIjtcblxuZXhwb3J0IGNvbnN0IHJlYWxpc2F0aW9uTG9hZCA9IGFzeW5jIChpZDogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IHJlZ2V4ID0gL14uKlxcL3JlYWxpc2F0aW9uc1xcLyhbXi9dKikubWQkLztcbiAgaWYgKCFpZC5tYXRjaChyZWdleCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgY2F0ZWdvcnkgPSBpZC5yZXBsYWNlKHJlZ2V4LCBcIiQxXCIpO1xuICBjb25zdCB0aXRsZSA9IGdldENhdGVnb3J5TGFiZWwoY2F0ZWdvcnkpO1xuICBjb25zdCBwb3N0cyA9IGF3YWl0IGNyZWF0ZUNvbnRlbnRMb2FkZXIoXG4gICAgYHJlYWxpc2F0aW9ucy8ke2NhdGVnb3J5fS8qLm1kYCxcbiAgKS5sb2FkKCk7XG5cbiAgY29uc3QgcHJvamVjdHMgPSBwb3N0cy5tYXAoKHBvc3QpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IGJhc2VuYW1lKHBvc3QudXJsKSxcbiAgICAgIHRpdGxlOiBwb3N0LmZyb250bWF0dGVyLnRpdGxlLFxuICAgICAgaW50ZXJ2ZW50aW9uczogcG9zdC5mcm9udG1hdHRlci5pbnRlcnZlbnRpb25zLFxuICAgIH07XG4gIH0pO1xuXG4gIGNvbnN0IGpzb25TdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgdGl0bGUsXG4gICAgbGF5b3V0OiBcImNhdGVnb3J5XCIsXG4gICAgY2F0ZWdvcnksXG4gICAgcHJvamVjdHMsXG4gIH0pO1xuXG4gIHJldHVybiBgLS0tXG4ke2pzb25TdHJpbmd9XG4tLS1cbmA7XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXGNvbW1vbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXF9fX0FSQ0hJVEVDVFxcXFxhcmNoaTIwMjRcXFxcY29tbW9uc1xcXFxkYXRhLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9fX19BUkNISVRFQ1QvYXJjaGkyMDI0L2NvbW1vbnMvZGF0YS50c1wiO2V4cG9ydCBjb25zdCBkYXRhID0ge1xuICBjYXRlZ29yaWVzOiBbXG4gICAge1xuICAgICAgaWQ6IFwiY2hhdGVhdXhcIixcbiAgICAgIHRpdGxlOiBcIkNoXHUwMEUydGVhdXhcIixcbiAgICAgIG5hbWU6IFwiZmVycmllcmVzXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogXCJlZ2xpc2VzXCIsXG4gICAgICB0aXRsZTogXCJFZ2xpc2VzXCIsXG4gICAgICBuYW1lOiBcImNoYXVjb25pblwiLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IFwicmVtcGFydHNcIixcbiAgICAgIHRpdGxlOiBcIlJlbXBhcnRzXCIsXG4gICAgICBuYW1lOiBcImNoYXJsZXZpbGxlLW1lemllcmVzXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogXCJhYmJheWVzXCIsXG4gICAgICB0aXRsZTogXCJBYmJheWVzXCIsXG4gICAgICBuYW1lOiBcImRhbW1hcmllLWxlcy1seXNcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiBcImZlcm1lc1wiLFxuICAgICAgdGl0bGU6IFwiRmVybWVzXCIsXG4gICAgICBuYW1lOiBcImNvdXB2cmF5XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogXCJyZXN0YXVyYXRpb25zXCIsXG4gICAgICB0aXRsZTogXCJQYXJlbWVudHMgZXh0XHUwMEU5cmlldXJzXCIsXG4gICAgICBuYW1lOiBcImJvaXMtbGUtcm9pXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogXCJzZXJyZXNcIixcbiAgICAgIHRpdGxlOiBcIlNlcnJlc1wiLFxuICAgICAgbmFtZTogXCJ2aWxsaWVycy1lbi1iaWVyZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IFwidGVydGlhaXJlc1wiLFxuICAgICAgdGl0bGU6IFwiVGVydGlhaXJlIC0gQWRtaW5pc3RyYXRpb25cIixcbiAgICAgIG5hbWU6IFwidG91cm5hbi1lbi1icmllXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogXCJzcG9ydHNcIixcbiAgICAgIHRpdGxlOiBcIlNwb3J0cyAtIExvaXNpcnNcIixcbiAgICAgIG5hbWU6IFwidG9yY3ktc3RhZGVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiBcIm1hcmNoZXNcIixcbiAgICAgIHRpdGxlOiBcIk1hcmNoXHUwMEU5cyBjb3V2ZXJ0c1wiLFxuICAgICAgbmFtZTogXCJ0b3JjeVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IFwic2NvbGFpcmVcIixcbiAgICAgIHRpdGxlOiBcIlNjb2xhaXJlIC0gRWR1Y2F0aW9uXCIsXG4gICAgICBuYW1lOiBcInBvaW5jeVwiLFxuICAgIH0sXG4gIF0sXG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXC52aXRlcHJlc3NcXFxccGx1Z2luc1xcXFx1dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXHBsdWdpbnNcXFxcdXRpbHNcXFxcbGFiZWwudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L19fX0FSQ0hJVEVDVC9hcmNoaTIwMjQvLnZpdGVwcmVzcy9wbHVnaW5zL3V0aWxzL2xhYmVsLnRzXCI7aW1wb3J0IHsgZGF0YSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb25zL2RhdGFcIjtcblxuZXhwb3J0IGNvbnN0IGdldENhdGVnb3J5TGFiZWwgPSAoY2F0ZWdvcnk6IHN0cmluZykgPT4ge1xuICBjb25zdCBjID0gZGF0YS5jYXRlZ29yaWVzLmZpbmQoKGMpID0+IGMuaWQgPT09IGNhdGVnb3J5KTtcbiAgcmV0dXJuIGMgIT09IHVuZGVmaW5lZCA/IGMudGl0bGUgOiBcInRpdGxlIG5vdCBmb3VuZFwiO1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXF9fX0FSQ0hJVEVDVFxcXFxhcmNoaTIwMjRcXFxcLnZpdGVwcmVzc1xcXFxwbHVnaW5zXFxcXGNvbnRlbnRMb2FkZXIucGx1Z2luLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9fX19BUkNISVRFQ1QvYXJjaGkyMDI0Ly52aXRlcHJlc3MvcGx1Z2lucy9jb250ZW50TG9hZGVyLnBsdWdpbi50c1wiO2ltcG9ydCB7IGNsaWVudExvYWQgfSBmcm9tIFwiLi9sb2FkZXJzL2NsaWVudFwiO1xuaW1wb3J0IHsgbWFpcmllTG9hZCB9IGZyb20gXCIuL2xvYWRlcnMvbWFpcmllXCI7XG5pbXBvcnQgeyByZWFsaXNhdGlvbkxvYWQgfSBmcm9tIFwiLi9sb2FkZXJzL3JlYWxpc2F0aW9uXCI7XG5cbmV4cG9ydCBjb25zdCBjb250ZW50TG9hZGVyID0ge1xuICBuYW1lOiBcImNvbnRlbnQtbG9hZGVyXCIsXG4gIGFzeW5jIGxvYWQoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiAoXG4gICAgICAoYXdhaXQgcmVhbGlzYXRpb25Mb2FkKGlkKSkgPz9cbiAgICAgIChhd2FpdCBjbGllbnRMb2FkKGlkKSkgPz9cbiAgICAgIChhd2FpdCBtYWlyaWVMb2FkKGlkKSlcbiAgICApO1xuICB9LFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFIsU0FBUyxlQUFlO0FBQ3RULE9BQU8sbUJBQW1CO0FBQzFCLFNBQVMsb0JBQW9COzs7QUNBdEIsSUFBTSxPQUFxQjtBQUFBLEVBQ2hDLENBQUMsUUFBUSxFQUFFLEtBQUssUUFBUSxNQUFNLGdCQUFnQixPQUFPLFFBQVEsQ0FBQztBQUFBLEVBQzlEO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxNQUNFLEtBQUs7QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0EsQ0FBQyxRQUFRLEVBQUUsS0FBSyxvQkFBb0IsTUFBTSxnQ0FBZ0MsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFTM0UsQ0FBQyxRQUFRLEVBQUUsS0FBSyxjQUFjLE1BQU0sK0JBQStCLENBQUM7QUFBQSxFQUNwRTtBQUFBLElBQ0U7QUFBQSxJQUNBLEVBQUUsS0FBSyxjQUFjLE1BQU0sNkJBQTZCLGFBQWEsR0FBRztBQUFBLEVBQzFFO0FBQUEsRUFDQTtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsTUFDRSxLQUFLO0FBQUEsTUFDTCxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFDRjtBQUVPLElBQU0sZ0JBQWdCLENBQUMsRUFBRSxTQUFTLE1BQU07QUFDN0MsUUFBTSxZQUNKLFNBQVMsYUFBYSxNQUFNLElBQUksT0FBTywwQkFBMEIsQ0FBQyxNQUNsRTtBQUVGLE1BQUksV0FBVztBQUNiLFVBQU1BLFFBQU8sU0FBUyxhQUFhO0FBQUEsTUFDakM7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUNBLFVBQU0sV0FBVyxvQkFBb0JBLEtBQUk7QUFFekMsVUFBTUMsUUFBcUI7QUFBQSxNQUN6QjtBQUFBLFFBQ0U7QUFBQSxRQUNBO0FBQUEsVUFDRSxVQUFVO0FBQUEsVUFDVixTQUFTLDRCQUE0QixRQUFRO0FBQUEsUUFDL0M7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUNBLFdBQU9BO0FBQUEsRUFDVDtBQUNBLFFBQU1BLFFBQXFCO0FBQUEsSUFDekI7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLFFBQ0UsVUFBVTtBQUFBLFFBQ1YsU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNBLFNBQU9BO0FBQ1Q7OztBQ25FTyxJQUFNLE1BQWtCO0FBQUEsRUFDN0IsUUFBUTtBQUFBLEVBQ1IsZUFBZSxDQUFDLGVBQWUseUJBQXlCO0FBQUEsRUFDeEQsVUFBVTtBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFBLElBQ2IsYUFBYTtBQUFBLElBQ2IsT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGFBQWE7QUFBQSxNQUNYO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsTUFDVDtBQUFBLE1BQ0E7QUFBQSxRQUNFLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLGFBQWE7QUFBQSxNQUNmO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjs7O0FDaERvVyxTQUFTLFlBQVk7QUFDelgsT0FBTyxZQUFZO0FBQ25CLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sVUFBVTs7O0FDSDBSLElBQU0saUJBQWlCO0FBQUEsRUFDaFUsUUFBUTtBQUNWOzs7QURLTyxJQUFNLHNCQUFzQixDQUFDLFlBQW9CO0FBQ3RELFFBQU0sU0FBUyxLQUFLLFFBQVEsZUFBZSxNQUFNO0FBQ2pELFNBQU87QUFBQSxJQUNMLE1BQU0sT0FBd0I7QUFFNUIsWUFBTSxRQUFRLE1BQU0sS0FBSyxTQUFTO0FBQUEsUUFDaEMsS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLE1BQ1QsQ0FBQztBQUVELFlBQU0sUUFBZ0IsQ0FBQztBQUN2QixpQkFBVyxRQUFRLE9BQU87QUFDeEIsY0FBTSxNQUFNLGFBQWEsS0FBSyxLQUFLLFFBQVEsSUFBSSxHQUFHLE9BQU87QUFDekQsY0FBTSxnQkFBZ0IsT0FBTyxLQUFLLEVBQUUsU0FBUyxNQUFNLENBQUM7QUFFcEQsY0FBTSxLQUFLO0FBQUEsVUFDVCxLQUFLLEtBQUssUUFBUSxRQUFRLEVBQUU7QUFBQSxVQUM1QixhQUFhLGNBQWM7QUFBQSxRQUM3QixDQUFDO0FBQUEsTUFDSDtBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUNGOzs7QUU5QjBTLFNBQVMsZ0JBQUFDLHFCQUFvQjtBQUV2VSxTQUFTLGdCQUFnQjtBQUZ6QixJQUFNLG1DQUFtQztBQUl6QyxJQUFNLGNBQXdCO0FBQUEsRUFDNUIsVUFBVTtBQUFBLEVBQ1YsV0FBVztBQUNiO0FBRUEsSUFBTSxNQUFNLG9CQUFJLElBQXNCO0FBRXRDLElBQU0sWUFBWTtBQUVsQixJQUFNLE9BQU8sTUFBTTtBQUNqQixRQUFNLFNBQVNDO0FBQUEsSUFDYixZQUFZO0FBQUEsSUFDWixFQUFFLFVBQVUsUUFBUTtBQUFBLEVBQ3RCO0FBRUEsUUFBTSxNQUFNLFNBQVMsTUFBTTtBQUUzQixhQUFXLEtBQUssS0FBSztBQUNuQixVQUFNLFdBQVcsRUFBRTtBQUNuQixVQUFNLENBQUMsVUFBVSxTQUFTLElBQUksU0FBUyxNQUFNLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0QsUUFBSSxJQUFJLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLFVBQVUsVUFBVSxDQUFDO0FBQUEsRUFDdEU7QUFDRjtBQUVBLEtBQUs7QUFFRSxJQUFNLHlCQUF5QixDQUFDLFlBQXVDO0FBQzVFLFFBQU0sTUFBTSxJQUFJLElBQUksUUFBUSxTQUFTLENBQUM7QUFDdEMsU0FBTyxPQUFPO0FBQ2hCOzs7QUNqQ21ULElBQU0sU0FBUyxDQUFDLFNBQWlCO0FBQ2xWLFNBQU8sS0FBSyxVQUFVLEtBQUs7QUFFM0IsUUFBTSxTQUFTLEtBQ1osUUFBUSxvQkFBb0IsRUFBRSxFQUM5QixRQUFRLFNBQVMsR0FBRyxFQUNwQixRQUFRLGtCQUFrQixFQUFFLEVBQzVCLFlBQVk7QUFFZixTQUFPO0FBQ1Q7OztBQ1Y2VSxJQUFNLE9BQU8sQ0FBQyxVQUE4QjtBQUN2WCxRQUFNLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxLQUFLLENBQUM7QUFDNUIsU0FBTyxFQUFFLEtBQUs7QUFDaEI7OztBQ0lBLElBQU0sVUFBVSxDQUFDLEtBQTBCLFdBQW1CO0FBQzVELFFBQU0sT0FBTyxJQUFJLElBQUksT0FBTyxJQUFJO0FBQ2hDLE1BQUksTUFBTTtBQUNSLFdBQU8sTUFBTSxLQUFLLEdBQUcsT0FBTyxLQUFLO0FBQ2pDLFdBQU87QUFBQSxFQUNUO0FBQ0EsTUFBSSxJQUFJLE9BQU8sTUFBTSxNQUFNO0FBQzNCLFNBQU87QUFDVDtBQUVBLElBQU0sWUFBWSxDQUFDLFdBQW1CO0FBQ3BDLFNBQU8sT0FBTyxNQUFNLEVBQ2pCLFlBQVksRUFDWixXQUFXLFdBQVcsR0FBRztBQUM5QjtBQUVPLElBQU0seUJBQXlCLENBQ3BDLE9BQ0EsU0FDYTtBQUNiLFFBQU0sV0FBVyxNQUNkLE9BQU8sQ0FBQyxTQUFTO0FBQ2hCLFFBQUksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVO0FBQy9DLGFBQU87QUFBQSxJQUNUO0FBQ0EsV0FBTyxLQUFLLFlBQVksUUFBUSxTQUFTO0FBQUEsRUFDM0MsQ0FBQyxFQUNBLElBQUksQ0FBQyxTQUFTO0FBQ2IsVUFBTSxTQUFTLEtBQUssWUFBWTtBQUVoQyxXQUFPO0FBQUEsTUFDTCxHQUFHO0FBQUEsTUFDSCxRQUFRLEtBQUssWUFBWSxpQkFBaUIsQ0FBQyxHQUN4QyxJQUFJLENBQUMsTUFBb0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFDeEQsS0FBSztBQUFBLElBQ1Y7QUFBQSxFQUNGLENBQUMsRUFDQSxPQUFPLFNBQVMsb0JBQUksSUFBb0IsQ0FBQyxFQUN6QyxPQUFPO0FBQ1YsU0FBTyxDQUFDLEdBQUcsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXO0FBQ25DLFdBQU8sUUFBUSxLQUFLLE9BQU8sS0FBSztBQUNoQyxVQUFNLE1BQU0sT0FBTyxVQUNmLE9BQU8sUUFBUSxNQUFNLFVBQVUsT0FBTyxRQUFRLElBQUksSUFDbEQsT0FBTyxNQUFNLFVBQVUsT0FBTyxJQUFJO0FBQ3RDLFlBQVEsSUFBSSxTQUFTLEdBQUc7QUFDeEIsV0FBTyxNQUFNLE9BQU8sT0FBTyx1QkFBdUIsR0FBRztBQUNyRCxZQUFRLElBQUksZ0JBQWdCLE9BQU8sR0FBRztBQUN0QyxXQUFPO0FBQUEsRUFDVCxDQUFDO0FBQ0g7OztBQ3JETyxJQUFNLGFBQWEsT0FBTyxPQUFlO0FBQzlDLFFBQU0sUUFBUTtBQUNkLFFBQU0sVUFBVSxHQUFHLE1BQU0sS0FBSztBQUM5QixNQUFJLENBQUMsU0FBUztBQUNaO0FBQUEsRUFDRjtBQUVBLFFBQU0sUUFBUSxNQUFNLG9CQUFvQixzQkFBc0IsRUFBRSxLQUFLO0FBRXJFLFFBQU0sVUFBVSx1QkFBdUIsT0FBTyxRQUFRO0FBQ3RELFFBQU0sZUFBZSx1QkFBdUIsT0FBTyxlQUFlO0FBRWxFLFFBQU0sYUFBYSxLQUFLLFVBQVU7QUFBQSxJQUNoQyxPQUFPLFFBQVEsQ0FBQyxNQUFNLFlBQVksWUFBWTtBQUFBLElBQzlDLFFBQVEsUUFBUSxDQUFDLE1BQU0sWUFBWSxZQUFZO0FBQUEsSUFDL0M7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsU0FBTztBQUFBLEVBQ1AsVUFBVTtBQUFBO0FBQUE7QUFHWjs7O0FDMUJnVixTQUFTLFVBQVUsZUFBZTtBQUszVyxJQUFNLGFBQWEsT0FBTyxPQUFlO0FBQzlDLFFBQU0sUUFBUTtBQUNkLE1BQUksQ0FBQyxHQUFHLE1BQU0sS0FBSyxHQUFHO0FBQ3BCO0FBQUEsRUFDRjtBQUNBLFFBQU0sUUFBUSxHQUFHLFFBQVEsT0FBTyxJQUFJO0FBRXBDLFFBQU0sUUFBUSxNQUFNLG9CQUFvQixzQkFBc0IsRUFBRSxLQUFLO0FBRXJFLE1BQUksU0FBaUI7QUFBQSxJQUNuQixNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixPQUFPLENBQUM7QUFBQSxFQUNWO0FBRUEsUUFBTSxXQUFXLE1BQ2QsT0FBTyxDQUFDLFNBQVM7QUFDaEIsUUFBSSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVU7QUFDL0MsYUFBTztBQUFBLElBQ1Q7QUFDQSxRQUFJLE9BQU8sS0FBSyxZQUFZLE9BQU8sSUFBSSxNQUFNLE9BQU87QUFDbEQsYUFBTztBQUFBLElBQ1Q7QUFDQSxhQUFTLEtBQUssWUFBWTtBQUMxQixXQUFPO0FBQUEsRUFDVCxDQUFDLEVBQ0EsSUFBSSxDQUFDLFNBQVM7QUFDYixXQUFPO0FBQUEsTUFDTCxJQUFJLFNBQVMsS0FBSyxHQUFHO0FBQUEsTUFDckIsT0FBTyxLQUFLLFlBQVk7QUFBQSxNQUN4QixVQUFVLFNBQVMsUUFBUSxLQUFLLEdBQUcsQ0FBQztBQUFBLElBQ3RDO0FBQUEsRUFDRixDQUFDO0FBRUgsUUFBTSxhQUFhLEtBQUssVUFBVTtBQUFBLElBQ2hDLE9BQU8sR0FBRyxPQUFPLElBQUksS0FBSyxPQUFPLEdBQUc7QUFBQSxJQUNwQyxRQUFRO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxTQUFPO0FBQUEsRUFDUCxVQUFVO0FBQUE7QUFBQTtBQUdaOzs7QUNuRDBWLFNBQVMsWUFBQUMsaUJBQWdCOzs7QUNBN0YsSUFBTSxPQUFPO0FBQUEsRUFDalMsWUFBWTtBQUFBLElBQ1Y7QUFBQSxNQUNFLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLE1BQ0UsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBO0FBQUEsTUFDRSxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxNQUNFLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLE1BQ0UsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBO0FBQUEsTUFDRSxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxNQUNFLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLE1BQ0UsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBO0FBQUEsTUFDRSxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxNQUNFLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLE1BQ0UsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQ0Y7OztBQ3hETyxJQUFNLG1CQUFtQixDQUFDLGFBQXFCO0FBQ3BELFFBQU0sSUFBSSxLQUFLLFdBQVcsS0FBSyxDQUFDQyxPQUFNQSxHQUFFLE9BQU8sUUFBUTtBQUN2RCxTQUFPLE1BQU0sU0FBWSxFQUFFLFFBQVE7QUFDckM7OztBRkRPLElBQU0sa0JBQWtCLE9BQU8sT0FBZTtBQUNuRCxRQUFNLFFBQVE7QUFDZCxNQUFJLENBQUMsR0FBRyxNQUFNLEtBQUssR0FBRztBQUNwQjtBQUFBLEVBQ0Y7QUFDQSxRQUFNLFdBQVcsR0FBRyxRQUFRLE9BQU8sSUFBSTtBQUN2QyxRQUFNLFFBQVEsaUJBQWlCLFFBQVE7QUFDdkMsUUFBTSxRQUFRLE1BQU07QUFBQSxJQUNsQixnQkFBZ0IsUUFBUTtBQUFBLEVBQzFCLEVBQUUsS0FBSztBQUVQLFFBQU0sV0FBVyxNQUFNLElBQUksQ0FBQyxTQUFTO0FBQ25DLFdBQU87QUFBQSxNQUNMLElBQUlDLFVBQVMsS0FBSyxHQUFHO0FBQUEsTUFDckIsT0FBTyxLQUFLLFlBQVk7QUFBQSxNQUN4QixlQUFlLEtBQUssWUFBWTtBQUFBLElBQ2xDO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSxhQUFhLEtBQUssVUFBVTtBQUFBLElBQ2hDO0FBQUEsSUFDQSxRQUFRO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxTQUFPO0FBQUEsRUFDUCxVQUFVO0FBQUE7QUFBQTtBQUdaOzs7QUc5Qk8sSUFBTSxnQkFBZ0I7QUFBQSxFQUMzQixNQUFNO0FBQUEsRUFDTixNQUFNLEtBQUssSUFBWTtBQUNyQixXQUNHLE1BQU0sZ0JBQWdCLEVBQUUsS0FDeEIsTUFBTSxXQUFXLEVBQUUsS0FDbkIsTUFBTSxXQUFXLEVBQUU7QUFBQSxFQUV4QjtBQUNGOzs7QWRKQSxJQUFPLGlCQUFRO0FBQUEsRUFDYixhQUFhO0FBQUEsSUFDWCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxlQUFlO0FBQUEsSUFDZixhQUNFO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFFBQVEsZUFBZTtBQUFBLElBQ3ZCLE1BQU07QUFBQSxNQUNKLFNBQVMsQ0FBQyxlQUFlLGNBQWMsQ0FBQztBQUFBLE1BQ3hDLFFBQVE7QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFsicGF0aCIsICJoZWFkIiwgInJlYWRGaWxlU3luYyIsICJyZWFkRmlsZVN5bmMiLCAiYmFzZW5hbWUiLCAiYyIsICJiYXNlbmFtZSJdCn0K
