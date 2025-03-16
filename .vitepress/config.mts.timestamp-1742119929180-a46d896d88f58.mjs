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

// .vitepress/utils/gps.ts
import { csvParse } from "file:///D:/___ARCHITECT/archi2024/node_modules/d3/src/index.js";
import { readFileSync } from "node:fs";

// .vitepress/utils/slug.ts
var toSlug = (text) => {
  text = text.normalize("NFD");
  const result = text.replace(/[\u0300-\u036f]/g, "").replace(/[ ']/g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
  return result;
};

// .vitepress/utils/gps.ts
var __vite_injected_original_dirname = "D:\\___ARCHITECT\\archi2024\\.vitepress\\utils";
var DEFAULT_GPS = {
  latitude: 0,
  longitude: 0
};
var map = /* @__PURE__ */ new Map();
var __dirname = __vite_injected_original_dirname;
var init = () => {
  const csvRaw = readFileSync(
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
var normalize = (mairie) => {
  return toSlug(mairie).toUpperCase().replaceAll(/[^A-Z]/g, " ");
};
var getGPSCoordFromZipcode = (zipcode) => {
  const gps = map.get(zipcode.toString());
  return gps ?? DEFAULT_GPS;
};

// .vitepress/plugins/utils/createContentLoader.ts
import { glob } from "file:///D:/___ARCHITECT/archi2024/node_modules/glob/dist/esm/index.js";
import matter from "file:///D:/___ARCHITECT/archi2024/node_modules/gray-matter/index.js";
import { readFileSync as readFileSync2 } from "node:fs";
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
        const src = readFileSync2(path.join(srcDir, file), "utf-8");
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

// .vitepress/plugins/loaders/carte.ts
var carteLoad = async (id) => {
  const regex = /^.*\/carte.md$/;
  const matches = id.match(regex);
  if (!matches) {
    return;
  }
  const posts = await createContentLoader(`realisations/*/*.md`).load();
  const filteredPosts = posts.map((post) => {
    if (typeof post.frontmatter.client !== "object") {
      console.log("post.frontmatter: ", post.frontmatter);
      throw new Error("client not formatted");
    }
    const client = post.frontmatter.client;
    const key = client.commune ? client.commune.zip + normalize(client.commune.name) : client.zip + normalize(client.name);
    client.gps = client.gps ?? getGPSCoordFromZipcode(key);
    return post;
  });
  const jsonString = JSON.stringify({
    title: "Carte",
    layout: "map",
    posts: filteredPosts
  });
  return `---
${jsonString}
---
  `;
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
    client.gps = client.gps ?? getGPSCoordFromZipcode(key);
    return client;
  });
};

// .vitepress/plugins/loaders/client.ts
var clientLoad = async (id) => {
  const regex = /^.*\/clients.md$/;
  const matches = id.match(regex);
  if (!matches) {
    return;
  }
  const posts = await createContentLoader(`realisations/**/*.md`).load();
  const mairies = filterPostByClientType(posts, "Mairie");
  const publicOthers = filterPostByClientType(posts, "Public Autres");
  const jsonString = JSON.stringify({
    title: "Clients",
    layout: "clients",
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
      name: "fontenailles"
    },
    {
      id: "remparts",
      title: "Remparts",
      name: "meaux"
    },
    {
      id: "abbayes",
      title: "Abbayes",
      name: "jouarre"
    },
    {
      id: "fermes",
      title: "Fermes",
      name: "coupvray"
    },
    {
      id: "folies",
      title: "Folies",
      name: "pringy"
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
    return await realisationLoad(id) ?? await clientLoad(id) ?? await mairieLoad(id) ?? await carteLoad(id);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubXRzIiwgIi52aXRlcHJlc3MvY29uZmlnL2hlYWRlci50cyIsICIudml0ZXByZXNzL2NvbmZpZy9wd2EudHMiLCAiLnZpdGVwcmVzcy91dGlscy9ncHMudHMiLCAiLnZpdGVwcmVzcy91dGlscy9zbHVnLnRzIiwgIi52aXRlcHJlc3MvcGx1Z2lucy91dGlscy9jcmVhdGVDb250ZW50TG9hZGVyLnRzIiwgIi52aXRlcHJlc3Mvc2l0ZWNvbmZpZy50cyIsICIudml0ZXByZXNzL3BsdWdpbnMvbG9hZGVycy9jYXJ0ZS50cyIsICIudml0ZXByZXNzL3BsdWdpbnMvdXRpbHMvc29ydC50cyIsICIudml0ZXByZXNzL3BsdWdpbnMvdXRpbHMvZmlsdGVyLnRzIiwgIi52aXRlcHJlc3MvcGx1Z2lucy9sb2FkZXJzL2NsaWVudC50cyIsICIudml0ZXByZXNzL3BsdWdpbnMvbG9hZGVycy9tYWlyaWUudHMiLCAiLnZpdGVwcmVzcy9wbHVnaW5zL2xvYWRlcnMvcmVhbGlzYXRpb24udHMiLCAiY29tbW9ucy9kYXRhLnRzIiwgIi52aXRlcHJlc3MvcGx1Z2lucy91dGlscy9sYWJlbC50cyIsICIudml0ZXByZXNzL3BsdWdpbnMvY29udGVudExvYWRlci5wbHVnaW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXC52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXF9fX0FSQ0hJVEVDVFxcXFxhcmNoaTIwMjRcXFxcLnZpdGVwcmVzc1xcXFxjb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9fX19BUkNISVRFQ1QvYXJjaGkyMDI0Ly52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IHdpdGhQd2EgfSBmcm9tIFwiQHZpdGUtcHdhL3ZpdGVwcmVzc1wiO1xuaW1wb3J0IHJlbW92ZUNvbnNvbGUgZnJvbSBcInZpdGUtcGx1Z2luLXJlbW92ZS1jb25zb2xlXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZXByZXNzXCI7XG5pbXBvcnQgeyBoZWFkLCB0cmFuc2Zvcm1IZWFkIH0gZnJvbSBcIi4vY29uZmlnL2hlYWRlclwiO1xuaW1wb3J0IHsgcHdhIH0gZnJvbSBcIi4vY29uZmlnL3B3YVwiO1xuaW1wb3J0IHsgY29udGVudExvYWRlciB9IGZyb20gXCIuL3BsdWdpbnMvY29udGVudExvYWRlci5wbHVnaW5cIjtcbmltcG9ydCB7IHNwZWNpZmljQ29uZmlnIH0gZnJvbSBcIi4vc2l0ZWNvbmZpZ1wiO1xuXG4vLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL3NpdGUtY29uZmlnXG5leHBvcnQgZGVmYXVsdCB3aXRoUHdhKFxuICBkZWZpbmVDb25maWcoe1xuICAgIGxhbmc6IFwiZnJcIixcbiAgICB0aXRsZTogXCJ4eHhcIixcbiAgICB0aXRsZVRlbXBsYXRlOiBcIkNhYmluZXQgZCdhcmNoaXRlY3R1cmUgREVNRVRSRVNDVSAtIEdVXHUwMEM5Tlx1MDBDOUdPXCIsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICBcIlNlaW5lIGV0IE1hcm5lLCA3NywgVG9yY3kgLSBBcmNoaXRlY3R1cmVzLCBQYXRyaW1vaW5lLCBFZ2xpc2VzLCBBYmJheWVzLCBDaFx1MDBFMnRlYXV4LCBHcmFuZ2VzLCBSZXN0YXVyYXRpb24gLSBNYWlyaWVzLCBDb2xsZWN0aXZpdFx1MDBFOXMgTG9jYWxlc1wiLFxuICAgIGhlYWQsXG4gICAgdHJhbnNmb3JtSGVhZCxcbiAgICBjbGVhblVybHM6IHRydWUsXG4gICAgc3JjRGlyOiBzcGVjaWZpY0NvbmZpZy5zcmNEaXIsXG4gICAgdml0ZToge1xuICAgICAgcGx1Z2luczogW2NvbnRlbnRMb2FkZXIsIHJlbW92ZUNvbnNvbGUoKV0sXG4gICAgICBzZXJ2ZXI6IHtcbiAgICAgICAgaG9zdDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwd2EsXG4gIH0pLFxuKTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxoZWFkZXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L19fX0FSQ0hJVEVDVC9hcmNoaTIwMjQvLnZpdGVwcmVzcy9jb25maWcvaGVhZGVyLnRzXCI7aW1wb3J0IHsgSGVhZENvbmZpZyB9IGZyb20gXCJ2aXRlcHJlc3NcIjtcblxuZXhwb3J0IGNvbnN0IGhlYWQ6IEhlYWRDb25maWdbXSA9IFtcbiAgW1wibGlua1wiLCB7IHJlbDogXCJpY29uXCIsIGhyZWY6IFwiL2Zhdmljb24uaWNvXCIsIHNpemVzOiBcIjQ4eDQ4XCIgfV0sXG4gIFtcbiAgICBcImxpbmtcIixcbiAgICB7XG4gICAgICByZWw6IFwiaWNvblwiLFxuICAgICAgaHJlZjogXCIvZmF2aWNvbi5zdmdcIixcbiAgICAgIHNpemVzOiBcImFueVwiLFxuICAgICAgdHlwZTogXCJpbWFnZS9zdmcreG1sXCIsXG4gICAgfSxcbiAgXSxcbiAgW1wibGlua1wiLCB7IHJlbDogXCJhcHBsZS10b3VjaC1pY29uXCIsIGhyZWY6IFwiL2FwcGxlLXRvdWNoLWljb24tMTgweDE4MC5wbmdcIiB9XSxcbiAgLy8gW1wic2NyaXB0XCIsIHsgc3JjOiBcImh0dHBzOi8vY2RuLmJvdHByZXNzLmNsb3VkL3dlYmNoYXQvdjIuMi9pbmplY3QuanNcIiB9XSxcbiAgLy8gW1xuICAvLyAgIFwic2NyaXB0XCIsXG4gIC8vICAge1xuICAvLyAgICAgc3JjOiBcImh0dHBzOi8vZmlsZXMuYnBjb250ZW50LmNsb3VkLzIwMjQvMTEvMTAvMTIvMjAyNDExMTAxMjUxMTItRENTVVlEV08uanNcIixcbiAgLy8gICB9LFxuICAvLyBdLFxuXG4gIFtcImxpbmtcIiwgeyByZWw6IFwicHJlY29ubmVjdFwiLCBocmVmOiBcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb21cIiB9XSxcbiAgW1xuICAgIFwibGlua1wiLFxuICAgIHsgcmVsOiBcInByZWNvbm5lY3RcIiwgaHJlZjogXCJodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tXCIsIGNyb3Nzb3JpZ2luOiBcIlwiIH0sXG4gIF0sXG4gIFtcbiAgICBcImxpbmtcIixcbiAgICB7XG4gICAgICByZWw6IFwic3R5bGVzaGVldFwiLFxuICAgICAgaHJlZjogXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PU5vdG8rU2FucytEaXNwbGF5Oml0YWwsd2dodEAwLDEwMC4uOTAwOzEsMTAwLi45MDAmZmFtaWx5PVNhcmFsYTp3Z2h0QDQwMDs3MDAmZGlzcGxheT1zd2FwXCIsXG4gICAgfSxcbiAgXSxcbl07XG5cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1IZWFkID0gKHsgcGFnZURhdGEgfSkgPT4ge1xuICBjb25zdCBpc1Byb2plY3QgPVxuICAgIHBhZ2VEYXRhLnJlbGF0aXZlUGF0aC5tYXRjaChuZXcgUmVnRXhwKFwicmVhbGlzYXRpb25zL1teL10rL1teL10rXCIpKSAhPT1cbiAgICBudWxsO1xuXG4gIGlmIChpc1Byb2plY3QpIHtcbiAgICBjb25zdCBwYXRoID0gcGFnZURhdGEucmVsYXRpdmVQYXRoLnJlcGxhY2UoXG4gICAgICAvXnJlYWxpc2F0aW9uc1xcLyguKilcXC5tZCQvLFxuICAgICAgXCIkMVwiLFxuICAgICk7XG4gICAgY29uc3QgcGFyYWxsYXggPSBgL3Bob3Rvcy9wcm9qZWN0cy8ke3BhdGh9L3BhcmFsbGF4LmpwZ2A7XG5cbiAgICBjb25zdCBoZWFkOiBIZWFkQ29uZmlnW10gPSBbXG4gICAgICBbXG4gICAgICAgIFwibWV0YVwiLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvcGVydHk6IFwib2c6aW1hZ2VcIixcbiAgICAgICAgICBjb250ZW50OiBgaHR0cHM6Ly9hcmNoaS5ndWVuZWdvLmNvbSR7cGFyYWxsYXh9YCxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgXTtcbiAgICByZXR1cm4gaGVhZDtcbiAgfVxuICBjb25zdCBoZWFkOiBIZWFkQ29uZmlnW10gPSBbXG4gICAgW1xuICAgICAgXCJtZXRhXCIsXG4gICAgICB7XG4gICAgICAgIHByb3BlcnR5OiBcIm9nOmltYWdlXCIsXG4gICAgICAgIGNvbnRlbnQ6IFwiaHR0cHM6Ly9hcmNoaS5ndWVuZWdvLmNvbS9ob21lL2ZlcnJpZXJlcy1sYW5kc2NhcGUuanBnXCIsXG4gICAgICB9LFxuICAgIF0sXG4gIF07XG4gIHJldHVybiBoZWFkO1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXGNvbmZpZ1xcXFxwd2EudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L19fX0FSQ0hJVEVDVC9hcmNoaTIwMjQvLnZpdGVwcmVzcy9jb25maWcvcHdhLnRzXCI7aW1wb3J0IHsgUHdhT3B0aW9ucyB9IGZyb20gXCJAdml0ZS1wd2Evdml0ZXByZXNzXCI7XG5cbmV4cG9ydCBjb25zdCBwd2E6IFB3YU9wdGlvbnMgPSB7XG4gIG91dERpcjogXCIuLi8udml0ZXByZXNzL2Rpc3RcIixcbiAgaW5jbHVkZUFzc2V0czogW1wiL2hvbWUvKi5qcGdcIiwgXCIvcGhvdG9zLyoqLyoue2pwZyx3ZWJwfVwiXSxcbiAgbWFuaWZlc3Q6IHtcbiAgICBuYW1lOiBcIkd1XHUwMEU5blx1MDBFOWdvIEFyY2hpdGVjdGVzXCIsXG4gICAgc2hvcnRfbmFtZTogXCJHdVx1MDBFOW5cdTAwRTlnb1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkNhYmluZXQgZCdhcmNoaXRlY3R1cmUgR1VcdTAwQzlOXHUwMEM5R08gLSBERU1FVFJFU0NVXCIsXG4gICAgdGhlbWVfY29sb3I6IFwiI2ZmZmZmZlwiLFxuICAgIHNjb3BlOiBcIi9cIixcbiAgICBzdGFydF91cmw6IFwiL1wiLFxuICAgIGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxuICAgIG9yaWVudGF0aW9uOiBcInBvcnRyYWl0LXByaW1hcnlcIixcbiAgICBsYW5nOiBcImZyXCIsXG4gICAgaWNvbnM6IFtcbiAgICAgIHtcbiAgICAgICAgc3JjOiBcIi9wd2EtNjR4NjQucG5nXCIsXG4gICAgICAgIHNpemVzOiBcIjY0eDY0XCIsXG4gICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzcmM6IFwiL3B3YS0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzcmM6IFwiL3B3YS01MTJ4NTEyLnBuZ1wiLFxuICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICB9LFxuICAgIF0sXG4gICAgc2NyZWVuc2hvdHM6IFtcbiAgICAgIHtcbiAgICAgICAgc3JjOiBcIi9wd2EtNTEyeDUxMi5wbmdcIixcbiAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICBsYWJlbDogXCJHdVx1MDBFOW5cdTAwRTlnbyBBcmNoaVwiLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3JjOiBcIi9tYXNrYWJsZS1pY29uLTUxMng1MTIucG5nXCIsXG4gICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgbGFiZWw6IFwiR3VcdTAwRTluXHUwMEU5Z28gQXJjaGlcIixcbiAgICAgICAgZm9ybV9mYWN0b3I6IFwid2lkZVwiLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXC52aXRlcHJlc3NcXFxcdXRpbHNcXFxcZ3BzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9fX19BUkNISVRFQ1QvYXJjaGkyMDI0Ly52aXRlcHJlc3MvdXRpbHMvZ3BzLnRzXCI7aW1wb3J0IHsgY3N2UGFyc2UgfSBmcm9tIFwiZDNcIjtcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgeyBHUFNDb29yZCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL0dQU0Nvb3JkXCI7XG5pbXBvcnQgeyB0b1NsdWcgfSBmcm9tIFwiLi9zbHVnXCI7XG5cbmNvbnN0IERFRkFVTFRfR1BTOiBHUFNDb29yZCA9IHtcbiAgbGF0aXR1ZGU6IDAsXG4gIGxvbmdpdHVkZTogMCxcbn07XG5cbmNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBHUFNDb29yZD4oKTtcblxuY29uc3QgX19kaXJuYW1lID0gaW1wb3J0Lm1ldGEuZGlybmFtZTtcblxuY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgY29uc3QgY3N2UmF3ID0gcmVhZEZpbGVTeW5jKFxuICAgIF9fZGlybmFtZSArIFwiL3ppcGNvZGUvYmFzZS1vZmZpY2llbGxlLWNvZGVzLXBvc3RhdXguY3N2XCIsXG4gICAgeyBlbmNvZGluZzogXCJ1dGYtOFwiIH0sXG4gICk7XG5cbiAgY29uc3QgY3N2ID0gY3N2UGFyc2UoY3N2UmF3KTtcblxuICBmb3IgKGNvbnN0IHIgb2YgY3N2KSB7XG4gICAgY29uc3QgZ2VvcG9pbnQgPSByLl9nZW9wb2ludDtcbiAgICBjb25zdCBbbGF0aXR1ZGUsIGxvbmdpdHVkZV0gPSBnZW9wb2ludC5zcGxpdChcIixcIikubWFwKChzKSA9PiArcyk7XG4gICAgbWFwLnNldChyLmNvZGVfcG9zdGFsICsgci5ub21fZGVfbGFfY29tbXVuZSwgeyBsYXRpdHVkZSwgbG9uZ2l0dWRlIH0pO1xuICB9XG59O1xuXG5pbml0KCk7XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemUgPSAobWFpcmllOiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIHRvU2x1ZyhtYWlyaWUpXG4gICAgLnRvVXBwZXJDYXNlKClcbiAgICAucmVwbGFjZUFsbCgvW15BLVpdL2csIFwiIFwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRHUFNDb29yZEZyb21aaXBjb2RlID0gKHppcGNvZGU6IHN0cmluZyB8IG51bWJlcik6IEdQU0Nvb3JkID0+IHtcbiAgY29uc3QgZ3BzID0gbWFwLmdldCh6aXBjb2RlLnRvU3RyaW5nKCkpO1xuICByZXR1cm4gZ3BzID8/IERFRkFVTFRfR1BTO1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXC52aXRlcHJlc3NcXFxcdXRpbHNcXFxcc2x1Zy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovX19fQVJDSElURUNUL2FyY2hpMjAyNC8udml0ZXByZXNzL3V0aWxzL3NsdWcudHNcIjtleHBvcnQgY29uc3QgdG9TbHVnID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICB0ZXh0ID0gdGV4dC5ub3JtYWxpemUoXCJORkRcIik7XG5cbiAgY29uc3QgcmVzdWx0ID0gdGV4dFxuICAgIC5yZXBsYWNlKC9bXFx1MDMwMC1cXHUwMzZmXS9nLCBcIlwiKVxuICAgIC5yZXBsYWNlKC9bICddL2csIFwiLVwiKVxuICAgIC5yZXBsYWNlKC9bXmEtekEtWjAtOS1dL2csIFwiXCIpXG4gICAgLnRvTG93ZXJDYXNlKCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXF9fX0FSQ0hJVEVDVFxcXFxhcmNoaTIwMjRcXFxcLnZpdGVwcmVzc1xcXFxwbHVnaW5zXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXC52aXRlcHJlc3NcXFxccGx1Z2luc1xcXFx1dGlsc1xcXFxjcmVhdGVDb250ZW50TG9hZGVyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9fX19BUkNISVRFQ1QvYXJjaGkyMDI0Ly52aXRlcHJlc3MvcGx1Z2lucy91dGlscy9jcmVhdGVDb250ZW50TG9hZGVyLnRzXCI7aW1wb3J0IHsgZ2xvYiB9IGZyb20gXCJnbG9iXCI7XG5pbXBvcnQgbWF0dGVyIGZyb20gXCJncmF5LW1hdHRlclwiO1xuaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB7IFBvc3QgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9Qb3N0XCI7XG5pbXBvcnQgeyBzcGVjaWZpY0NvbmZpZyB9IGZyb20gXCIuLi8uLi9zaXRlY29uZmlnXCI7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDb250ZW50TG9hZGVyID0gKHBhdHRlcm46IHN0cmluZykgPT4ge1xuICBjb25zdCBzcmNEaXIgPSBwYXRoLnJlc29sdmUoc3BlY2lmaWNDb25maWcuc3JjRGlyKTtcbiAgcmV0dXJuIHtcbiAgICBhc3luYyBsb2FkKCk6IFByb21pc2U8UG9zdFtdPiB7XG4gICAgICAvLyBsb29rIGF0IGFsbCBmaWxlcyBpbiBwYXR0ZXJuXG4gICAgICBjb25zdCBmaWxlcyA9IGF3YWl0IGdsb2IocGF0dGVybiwge1xuICAgICAgICBjd2Q6IHNyY0RpcixcbiAgICAgICAgcG9zaXg6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIC8vIGV4dHJhY3QgdGhlbSB0aGUgZnJvbnRtYXR0ZXIgYW5kIHRoZSB1cmxcbiAgICAgIGNvbnN0IHBvc3RzOiBQb3N0W10gPSBbXTtcbiAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICBjb25zdCBzcmMgPSByZWFkRmlsZVN5bmMocGF0aC5qb2luKHNyY0RpciwgZmlsZSksIFwidXRmLThcIik7XG4gICAgICAgIGNvbnN0IG1hdHRlckNvbnRlbnQgPSBtYXR0ZXIoc3JjLCB7IGV4Y2VycHQ6IGZhbHNlIH0pO1xuXG4gICAgICAgIHBvc3RzLnB1c2goe1xuICAgICAgICAgIHVybDogZmlsZS5yZXBsYWNlKC8ubWQkLywgXCJcIiksXG4gICAgICAgICAgZnJvbnRtYXR0ZXI6IG1hdHRlckNvbnRlbnQuZGF0YSBhcyBQb3N0W1wiZnJvbnRtYXR0ZXJcIl0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBvc3RzO1xuICAgIH0sXG4gIH07XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXC52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXF9fX0FSQ0hJVEVDVFxcXFxhcmNoaTIwMjRcXFxcLnZpdGVwcmVzc1xcXFxzaXRlY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9fX19BUkNISVRFQ1QvYXJjaGkyMDI0Ly52aXRlcHJlc3Mvc2l0ZWNvbmZpZy50c1wiO2V4cG9ydCBjb25zdCBzcGVjaWZpY0NvbmZpZyA9IHtcbiAgc3JjRGlyOiBcIi4vc3JjXCIsXG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXC52aXRlcHJlc3NcXFxccGx1Z2luc1xcXFxsb2FkZXJzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXC52aXRlcHJlc3NcXFxccGx1Z2luc1xcXFxsb2FkZXJzXFxcXGNhcnRlLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9fX19BUkNISVRFQ1QvYXJjaGkyMDI0Ly52aXRlcHJlc3MvcGx1Z2lucy9sb2FkZXJzL2NhcnRlLnRzXCI7aW1wb3J0IHsgZ2V0R1BTQ29vcmRGcm9tWmlwY29kZSwgbm9ybWFsaXplIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2dwc1wiO1xuaW1wb3J0IHsgY3JlYXRlQ29udGVudExvYWRlciB9IGZyb20gXCIuLi91dGlscy9jcmVhdGVDb250ZW50TG9hZGVyXCI7XG5cbmV4cG9ydCBjb25zdCBjYXJ0ZUxvYWQgPSBhc3luYyAoaWQ6IHN0cmluZykgPT4ge1xuICBjb25zdCByZWdleCA9IC9eLipcXC9jYXJ0ZS5tZCQvO1xuICBjb25zdCBtYXRjaGVzID0gaWQubWF0Y2gocmVnZXgpO1xuICBpZiAoIW1hdGNoZXMpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gbG9vayBhdCBhbGwgdGhlIHByb2plY3RzIGFuZCBnZW5lcmF0ZSB0aGUgZnJvbnRtYXR0ZXIuXG4gIGNvbnN0IHBvc3RzID0gYXdhaXQgY3JlYXRlQ29udGVudExvYWRlcihgcmVhbGlzYXRpb25zLyovKi5tZGApLmxvYWQoKTtcblxuICBjb25zdCBmaWx0ZXJlZFBvc3RzID0gcG9zdHMubWFwKChwb3N0KSA9PiB7XG4gICAgaWYgKHR5cGVvZiBwb3N0LmZyb250bWF0dGVyLmNsaWVudCAhPT0gXCJvYmplY3RcIikge1xuICAgICAgY29uc29sZS5sb2coXCJwb3N0LmZyb250bWF0dGVyOiBcIiwgcG9zdC5mcm9udG1hdHRlcik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjbGllbnQgbm90IGZvcm1hdHRlZFwiKTtcbiAgICB9XG4gICAgY29uc3QgY2xpZW50ID0gcG9zdC5mcm9udG1hdHRlci5jbGllbnQ7XG4gICAgY29uc3Qga2V5ID0gY2xpZW50LmNvbW11bmVcbiAgICAgID8gY2xpZW50LmNvbW11bmUuemlwICsgbm9ybWFsaXplKGNsaWVudC5jb21tdW5lLm5hbWUpXG4gICAgICA6IGNsaWVudC56aXAgKyBub3JtYWxpemUoY2xpZW50Lm5hbWUpO1xuICAgIGNsaWVudC5ncHMgPSBjbGllbnQuZ3BzID8/IGdldEdQU0Nvb3JkRnJvbVppcGNvZGUoa2V5KTtcbiAgICByZXR1cm4gcG9zdDtcbiAgfSk7XG5cbiAgY29uc3QganNvblN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICB0aXRsZTogXCJDYXJ0ZVwiLFxuICAgIGxheW91dDogXCJtYXBcIixcbiAgICBwb3N0czogZmlsdGVyZWRQb3N0cyxcbiAgfSk7XG5cbiAgcmV0dXJuIGAtLS1cbiR7anNvblN0cmluZ31cbi0tLVxuICBgO1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXHBsdWdpbnNcXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXF9fX0FSQ0hJVEVDVFxcXFxhcmNoaTIwMjRcXFxcLnZpdGVwcmVzc1xcXFxwbHVnaW5zXFxcXHV0aWxzXFxcXHNvcnQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L19fX0FSQ0hJVEVDVC9hcmNoaTIwMjQvLnZpdGVwcmVzcy9wbHVnaW5zL3V0aWxzL3NvcnQudHNcIjtleHBvcnQgY29uc3Qgc29ydCA9IChhcnJheTogbnVtYmVyW10pOiBudW1iZXJbXSA9PiB7XG4gIGNvbnN0IHUgPSBbLi4ubmV3IFNldChhcnJheSldO1xuICByZXR1cm4gdS5zb3J0KCk7XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXC52aXRlcHJlc3NcXFxccGx1Z2luc1xcXFx1dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXHBsdWdpbnNcXFxcdXRpbHNcXFxcZmlsdGVyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9fX19BUkNISVRFQ1QvYXJjaGkyMDI0Ly52aXRlcHJlc3MvcGx1Z2lucy91dGlscy9maWx0ZXIudHNcIjtpbXBvcnQgeyBDbGllbnQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9DbGllbnRcIjtcbmltcG9ydCB7IEludGVydmVudGlvbiB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL0ludGVydmVudGlvblwiO1xuaW1wb3J0IHsgUG9zdCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL1Bvc3RcIjtcbmltcG9ydCB7IGdldEdQU0Nvb3JkRnJvbVppcGNvZGUsIG5vcm1hbGl6ZSB9IGZyb20gXCIuLi8uLi91dGlscy9ncHNcIjtcbmltcG9ydCB7IHNvcnQgfSBmcm9tIFwiLi9zb3J0XCI7XG5cbmNvbnN0IHJlZHVjZXIgPSAoYWNjOiBNYXA8c3RyaW5nLCBDbGllbnQ+LCBjbGllbnQ6IENsaWVudCkgPT4ge1xuICBjb25zdCBpdGVtID0gYWNjLmdldChjbGllbnQubmFtZSk7XG4gIGlmIChpdGVtKSB7XG4gICAgY2xpZW50LnllYXJzLnB1c2goLi4uY2xpZW50LnllYXJzKTtcbiAgICByZXR1cm4gYWNjO1xuICB9XG4gIGFjYy5zZXQoY2xpZW50Lm5hbWUsIGNsaWVudCk7XG4gIHJldHVybiBhY2M7XG59O1xuXG5leHBvcnQgY29uc3QgZmlsdGVyUG9zdEJ5Q2xpZW50VHlwZSA9IChcbiAgcG9zdHM6IFBvc3RbXSxcbiAgdHlwZTogc3RyaW5nLFxuKTogQ2xpZW50W10gPT4ge1xuICBjb25zdCBpdGVyYXRvciA9IHBvc3RzXG4gICAgLmZpbHRlcigocG9zdCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBwb3N0LmZyb250bWF0dGVyLmNsaWVudCAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gcG9zdC5mcm9udG1hdHRlci5jbGllbnQ/LnR5cGUgPT09IHR5cGU7XG4gICAgfSlcbiAgICAubWFwKChwb3N0KSA9PiB7XG4gICAgICBjb25zdCBjbGllbnQgPSBwb3N0LmZyb250bWF0dGVyLmNsaWVudCBhcyBDbGllbnQ7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmNsaWVudCxcbiAgICAgICAgeWVhcnM6IChwb3N0LmZyb250bWF0dGVyLmludGVydmVudGlvbnMgPz8gW10pXG4gICAgICAgICAgLm1hcCgoaTogSW50ZXJ2ZW50aW9uKSA9PiArU3RyaW5nKGkueWVhcikuc3Vic3RyaW5nKDAsIDQpKVxuICAgICAgICAgIC5zb3J0KCksXG4gICAgICB9O1xuICAgIH0pXG4gICAgLnJlZHVjZShyZWR1Y2VyLCBuZXcgTWFwPHN0cmluZywgQ2xpZW50PigpKVxuICAgIC52YWx1ZXMoKTtcbiAgcmV0dXJuIFsuLi5pdGVyYXRvcl0ubWFwKChjbGllbnQpID0+IHtcbiAgICBjbGllbnQueWVhcnMgPSBzb3J0KGNsaWVudC55ZWFycyk7XG4gICAgY29uc3Qga2V5ID0gY2xpZW50LmNvbW11bmVcbiAgICAgID8gY2xpZW50LmNvbW11bmUuemlwICsgbm9ybWFsaXplKGNsaWVudC5jb21tdW5lLm5hbWUpXG4gICAgICA6IGNsaWVudC56aXAgKyBub3JtYWxpemUoY2xpZW50Lm5hbWUpO1xuICAgIGNsaWVudC5ncHMgPSBjbGllbnQuZ3BzID8/IGdldEdQU0Nvb3JkRnJvbVppcGNvZGUoa2V5KTtcbiAgICByZXR1cm4gY2xpZW50O1xuICB9KTtcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXF9fX0FSQ0hJVEVDVFxcXFxhcmNoaTIwMjRcXFxcLnZpdGVwcmVzc1xcXFxwbHVnaW5zXFxcXGxvYWRlcnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXF9fX0FSQ0hJVEVDVFxcXFxhcmNoaTIwMjRcXFxcLnZpdGVwcmVzc1xcXFxwbHVnaW5zXFxcXGxvYWRlcnNcXFxcY2xpZW50LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9fX19BUkNISVRFQ1QvYXJjaGkyMDI0Ly52aXRlcHJlc3MvcGx1Z2lucy9sb2FkZXJzL2NsaWVudC50c1wiO2ltcG9ydCB7IGNyZWF0ZUNvbnRlbnRMb2FkZXIgfSBmcm9tIFwiLi4vdXRpbHMvY3JlYXRlQ29udGVudExvYWRlclwiO1xuaW1wb3J0IHsgZmlsdGVyUG9zdEJ5Q2xpZW50VHlwZSB9IGZyb20gXCIuLi91dGlscy9maWx0ZXJcIjtcblxuZXhwb3J0IGNvbnN0IGNsaWVudExvYWQgPSBhc3luYyAoaWQ6IHN0cmluZykgPT4ge1xuICBjb25zdCByZWdleCA9IC9eLipcXC9jbGllbnRzLm1kJC87XG4gIGNvbnN0IG1hdGNoZXMgPSBpZC5tYXRjaChyZWdleCk7XG4gIGlmICghbWF0Y2hlcykge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBsb29rIGF0IGFsbCB0aGUgcHJvamVjdHMgYW5kIGdlbmVyYXRlIHRoZSBmcm9udG1hdHRlci5cbiAgY29uc3QgcG9zdHMgPSBhd2FpdCBjcmVhdGVDb250ZW50TG9hZGVyKGByZWFsaXNhdGlvbnMvKiovKi5tZGApLmxvYWQoKTtcblxuICBjb25zdCBtYWlyaWVzID0gZmlsdGVyUG9zdEJ5Q2xpZW50VHlwZShwb3N0cywgXCJNYWlyaWVcIik7XG4gIGNvbnN0IHB1YmxpY090aGVycyA9IGZpbHRlclBvc3RCeUNsaWVudFR5cGUocG9zdHMsIFwiUHVibGljIEF1dHJlc1wiKTtcblxuICBjb25zdCBqc29uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgIHRpdGxlOiBcIkNsaWVudHNcIixcbiAgICBsYXlvdXQ6IFwiY2xpZW50c1wiLFxuICAgIG1haXJpZXMsXG4gICAgcHVibGljT3RoZXJzLFxuICB9KTtcblxuICByZXR1cm4gYC0tLVxuJHtqc29uU3RyaW5nfVxuLS0tXG4gIGA7XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXC52aXRlcHJlc3NcXFxccGx1Z2luc1xcXFxsb2FkZXJzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXC52aXRlcHJlc3NcXFxccGx1Z2luc1xcXFxsb2FkZXJzXFxcXG1haXJpZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovX19fQVJDSElURUNUL2FyY2hpMjAyNC8udml0ZXByZXNzL3BsdWdpbnMvbG9hZGVycy9tYWlyaWUudHNcIjtpbXBvcnQgeyBiYXNlbmFtZSwgZGlybmFtZSB9IGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB7IENsaWVudCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL0NsaWVudFwiO1xuaW1wb3J0IHsgdG9TbHVnIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3NsdWdcIjtcbmltcG9ydCB7IGNyZWF0ZUNvbnRlbnRMb2FkZXIgfSBmcm9tIFwiLi4vdXRpbHMvY3JlYXRlQ29udGVudExvYWRlclwiO1xuXG5leHBvcnQgY29uc3QgbWFpcmllTG9hZCA9IGFzeW5jIChpZDogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IHJlZ2V4ID0gL14uKlxcL2NsaWVudHNcXC8oW14vXSopLm1kJC87XG4gIGlmICghaWQubWF0Y2gocmVnZXgpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHBsYWNlID0gaWQucmVwbGFjZShyZWdleCwgXCIkMVwiKTtcbiAgLy8gbG9vayBhdCBhbGwgdGhlIHByb2plY3RzIGFuZCBnZW5lcmF0ZSB0aGUgZnJvbnRtYXR0ZXIuXG4gIGNvbnN0IHBvc3RzID0gYXdhaXQgY3JlYXRlQ29udGVudExvYWRlcihgcmVhbGlzYXRpb25zLyoqLyoubWRgKS5sb2FkKCk7XG5cbiAgbGV0IGNsaWVudDogQ2xpZW50ID0ge1xuICAgIG5hbWU6IFwiaW5jb25udVwiLFxuICAgIHppcDogXCIwMDAwMFwiLFxuICAgIHR5cGU6IFwiTWFpcmllXCIsXG4gICAgeWVhcnM6IFtdLFxuICB9O1xuXG4gIGNvbnN0IHByb2plY3RzID0gcG9zdHNcbiAgICAuZmlsdGVyKChwb3N0KSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHBvc3QuZnJvbnRtYXR0ZXIuY2xpZW50ICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0b1NsdWcocG9zdC5mcm9udG1hdHRlci5jbGllbnQubmFtZSkgIT09IHBsYWNlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNsaWVudCA9IHBvc3QuZnJvbnRtYXR0ZXIuY2xpZW50O1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSlcbiAgICAubWFwKChwb3N0KSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogYmFzZW5hbWUocG9zdC51cmwpLFxuICAgICAgICB0aXRsZTogcG9zdC5mcm9udG1hdHRlci50aXRsZSxcbiAgICAgICAgY2F0ZWdvcnk6IGJhc2VuYW1lKGRpcm5hbWUocG9zdC51cmwpKSxcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgY29uc3QganNvblN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICB0aXRsZTogYCR7Y2xpZW50Lm5hbWV9ICgke2NsaWVudC56aXB9KWAsXG4gICAgbGF5b3V0OiBcIm1haXJpZVwiLFxuICAgIGNsaWVudCxcbiAgICBwcm9qZWN0cyxcbiAgfSk7XG5cbiAgcmV0dXJuIGAtLS1cbiR7anNvblN0cmluZ31cbi0tLVxuICBgO1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXHBsdWdpbnNcXFxcbG9hZGVyc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXHBsdWdpbnNcXFxcbG9hZGVyc1xcXFxyZWFsaXNhdGlvbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovX19fQVJDSElURUNUL2FyY2hpMjAyNC8udml0ZXByZXNzL3BsdWdpbnMvbG9hZGVycy9yZWFsaXNhdGlvbi50c1wiO2ltcG9ydCB7IGJhc2VuYW1lIH0gZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHsgZ2V0Q2F0ZWdvcnlMYWJlbCB9IGZyb20gXCIuLi91dGlscy9sYWJlbFwiO1xuaW1wb3J0IHsgY3JlYXRlQ29udGVudExvYWRlciB9IGZyb20gXCIuLi91dGlscy9jcmVhdGVDb250ZW50TG9hZGVyXCI7XG5cbmV4cG9ydCBjb25zdCByZWFsaXNhdGlvbkxvYWQgPSBhc3luYyAoaWQ6IHN0cmluZykgPT4ge1xuICBjb25zdCByZWdleCA9IC9eLipcXC9yZWFsaXNhdGlvbnNcXC8oW14vXSopLm1kJC87XG4gIGlmICghaWQubWF0Y2gocmVnZXgpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGNhdGVnb3J5ID0gaWQucmVwbGFjZShyZWdleCwgXCIkMVwiKTtcbiAgY29uc3QgdGl0bGUgPSBnZXRDYXRlZ29yeUxhYmVsKGNhdGVnb3J5KTtcbiAgY29uc3QgcG9zdHMgPSBhd2FpdCBjcmVhdGVDb250ZW50TG9hZGVyKFxuICAgIGByZWFsaXNhdGlvbnMvJHtjYXRlZ29yeX0vKi5tZGAsXG4gICkubG9hZCgpO1xuXG4gIGNvbnN0IHByb2plY3RzID0gcG9zdHMubWFwKChwb3N0KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBiYXNlbmFtZShwb3N0LnVybCksXG4gICAgICB0aXRsZTogcG9zdC5mcm9udG1hdHRlci50aXRsZSxcbiAgICAgIGludGVydmVudGlvbnM6IHBvc3QuZnJvbnRtYXR0ZXIuaW50ZXJ2ZW50aW9ucyxcbiAgICB9O1xuICB9KTtcblxuICBjb25zdCBqc29uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgIHRpdGxlLFxuICAgIGxheW91dDogXCJjYXRlZ29yeVwiLFxuICAgIGNhdGVnb3J5LFxuICAgIHByb2plY3RzLFxuICB9KTtcblxuICByZXR1cm4gYC0tLVxuJHtqc29uU3RyaW5nfVxuLS0tXG5gO1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFxjb21tb25zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXGNvbW1vbnNcXFxcZGF0YS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovX19fQVJDSElURUNUL2FyY2hpMjAyNC9jb21tb25zL2RhdGEudHNcIjtleHBvcnQgY29uc3QgZGF0YSA9IHtcbiAgY2F0ZWdvcmllczogW1xuICAgIHtcbiAgICAgIGlkOiBcImNoYXRlYXV4XCIsXG4gICAgICB0aXRsZTogXCJDaFx1MDBFMnRlYXV4XCIsXG4gICAgICBuYW1lOiBcImZlcnJpZXJlc1wiLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IFwiZWdsaXNlc1wiLFxuICAgICAgdGl0bGU6IFwiRWdsaXNlc1wiLFxuICAgICAgbmFtZTogXCJmb250ZW5haWxsZXNcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiBcInJlbXBhcnRzXCIsXG4gICAgICB0aXRsZTogXCJSZW1wYXJ0c1wiLFxuICAgICAgbmFtZTogXCJtZWF1eFwiLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IFwiYWJiYXllc1wiLFxuICAgICAgdGl0bGU6IFwiQWJiYXllc1wiLFxuICAgICAgbmFtZTogXCJqb3VhcnJlXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogXCJmZXJtZXNcIixcbiAgICAgIHRpdGxlOiBcIkZlcm1lc1wiLFxuICAgICAgbmFtZTogXCJjb3VwdnJheVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IFwiZm9saWVzXCIsXG4gICAgICB0aXRsZTogXCJGb2xpZXNcIixcbiAgICAgIG5hbWU6IFwicHJpbmd5XCIsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogXCJyZXN0YXVyYXRpb25zXCIsXG4gICAgICB0aXRsZTogXCJQYXJlbWVudHMgZXh0XHUwMEU5cmlldXJzXCIsXG4gICAgICBuYW1lOiBcImJvaXMtbGUtcm9pXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogXCJzZXJyZXNcIixcbiAgICAgIHRpdGxlOiBcIlNlcnJlc1wiLFxuICAgICAgbmFtZTogXCJ2aWxsaWVycy1lbi1iaWVyZVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IFwidGVydGlhaXJlc1wiLFxuICAgICAgdGl0bGU6IFwiVGVydGlhaXJlIC0gQWRtaW5pc3RyYXRpb25cIixcbiAgICAgIG5hbWU6IFwidG91cm5hbi1lbi1icmllXCIsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogXCJzcG9ydHNcIixcbiAgICAgIHRpdGxlOiBcIlNwb3J0cyAtIExvaXNpcnNcIixcbiAgICAgIG5hbWU6IFwidG9yY3ktc3RhZGVcIixcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiBcIm1hcmNoZXNcIixcbiAgICAgIHRpdGxlOiBcIk1hcmNoXHUwMEU5cyBjb3V2ZXJ0c1wiLFxuICAgICAgbmFtZTogXCJ0b3JjeVwiLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IFwic2NvbGFpcmVcIixcbiAgICAgIHRpdGxlOiBcIlNjb2xhaXJlIC0gRWR1Y2F0aW9uXCIsXG4gICAgICBuYW1lOiBcInBvaW5jeVwiLFxuICAgIH0sXG4gIF0sXG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxfX19BUkNISVRFQ1RcXFxcYXJjaGkyMDI0XFxcXC52aXRlcHJlc3NcXFxccGx1Z2luc1xcXFx1dGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXHBsdWdpbnNcXFxcdXRpbHNcXFxcbGFiZWwudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L19fX0FSQ0hJVEVDVC9hcmNoaTIwMjQvLnZpdGVwcmVzcy9wbHVnaW5zL3V0aWxzL2xhYmVsLnRzXCI7aW1wb3J0IHsgZGF0YSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb25zL2RhdGFcIjtcblxuZXhwb3J0IGNvbnN0IGdldENhdGVnb3J5TGFiZWwgPSAoY2F0ZWdvcnk6IHN0cmluZykgPT4ge1xuICBjb25zdCBjID0gZGF0YS5jYXRlZ29yaWVzLmZpbmQoKGMpID0+IGMuaWQgPT09IGNhdGVnb3J5KTtcbiAgcmV0dXJuIGMgIT09IHVuZGVmaW5lZCA/IGMudGl0bGUgOiBcInRpdGxlIG5vdCBmb3VuZFwiO1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcX19fQVJDSElURUNUXFxcXGFyY2hpMjAyNFxcXFwudml0ZXByZXNzXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXF9fX0FSQ0hJVEVDVFxcXFxhcmNoaTIwMjRcXFxcLnZpdGVwcmVzc1xcXFxwbHVnaW5zXFxcXGNvbnRlbnRMb2FkZXIucGx1Z2luLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9fX19BUkNISVRFQ1QvYXJjaGkyMDI0Ly52aXRlcHJlc3MvcGx1Z2lucy9jb250ZW50TG9hZGVyLnBsdWdpbi50c1wiO2ltcG9ydCB7IGNhcnRlTG9hZCB9IGZyb20gXCIuL2xvYWRlcnMvY2FydGVcIjtcbmltcG9ydCB7IGNsaWVudExvYWQgfSBmcm9tIFwiLi9sb2FkZXJzL2NsaWVudFwiO1xuaW1wb3J0IHsgbWFpcmllTG9hZCB9IGZyb20gXCIuL2xvYWRlcnMvbWFpcmllXCI7XG5pbXBvcnQgeyByZWFsaXNhdGlvbkxvYWQgfSBmcm9tIFwiLi9sb2FkZXJzL3JlYWxpc2F0aW9uXCI7XG5cbmV4cG9ydCBjb25zdCBjb250ZW50TG9hZGVyID0ge1xuICBuYW1lOiBcImNvbnRlbnQtbG9hZGVyXCIsXG4gIGFzeW5jIGxvYWQoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiAoXG4gICAgICAoYXdhaXQgcmVhbGlzYXRpb25Mb2FkKGlkKSkgPz9cbiAgICAgIChhd2FpdCBjbGllbnRMb2FkKGlkKSkgPz9cbiAgICAgIChhd2FpdCBtYWlyaWVMb2FkKGlkKSkgPz9cbiAgICAgIChhd2FpdCBjYXJ0ZUxvYWQoaWQpKVxuICAgICk7XG4gIH0sXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4UixTQUFTLGVBQWU7QUFDdFQsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUyxvQkFBb0I7OztBQ0F0QixJQUFNLE9BQXFCO0FBQUEsRUFDaEMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxRQUFRLE1BQU0sZ0JBQWdCLE9BQU8sUUFBUSxDQUFDO0FBQUEsRUFDOUQ7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLE1BQ0UsS0FBSztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQUEsRUFDQSxDQUFDLFFBQVEsRUFBRSxLQUFLLG9CQUFvQixNQUFNLGdDQUFnQyxDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVMzRSxDQUFDLFFBQVEsRUFBRSxLQUFLLGNBQWMsTUFBTSwrQkFBK0IsQ0FBQztBQUFBLEVBQ3BFO0FBQUEsSUFDRTtBQUFBLElBQ0EsRUFBRSxLQUFLLGNBQWMs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LFFBQVE7QUFDckM7OztBRkRPLElBQU0sa0JBQWtCLE9BQU8sT0FBZTtBQUNuRCxRQUFNLFFBQVE7QUFDZCxNQUFJLENBQUMsR0FBRyxNQUFNLEtBQUssR0FBRztBQUNwQjtBQUFBLEVBQ0Y7QUFDQSxRQUFNLFdBQVcsR0FBRyxRQUFRLE9BQU8sSUFBSTtBQUN2QyxRQUFNLFFBQVEsaUJBQWlCLFFBQVE7QUFDdkMsUUFBTSxRQUFRLE1BQU07QUFBQSxJQUNsQixnQkFBZ0IsUUFBUTtBQUFBLEVBQzFCLEVBQUUsS0FBSztBQUVQLFFBQU0sV0FBVyxNQUFNLElBQUksQ0FBQyxTQUFTO0FBQ25DLFdBQU87QUFBQSxNQUNMLElBQUlDLFVBQVMsS0FBSyxHQUFHO0FBQUEsTUFDckIsT0FBTyxLQUFLLFlBQVk7QUFBQSxNQUN4QixlQUFlLEtBQUssWUFBWTtBQUFBLElBQ2xDO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSxhQUFhLEtBQUssVUFBVTtBQUFBLElBQ2hDO0FBQUEsSUFDQSxRQUFRO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxTQUFPO0FBQUEsRUFDUCxVQUFVO0FBQUE7QUFBQTtBQUdaOzs7QUc3Qk8sSUFBTSxnQkFBZ0I7QUFBQSxFQUMzQixNQUFNO0FBQUEsRUFDTixNQUFNLEtBQUssSUFBWTtBQUNyQixXQUNHLE1BQU0sZ0JBQWdCLEVBQUUsS0FDeEIsTUFBTSxXQUFXLEVBQUUsS0FDbkIsTUFBTSxXQUFXLEVBQUUsS0FDbkIsTUFBTSxVQUFVLEVBQUU7QUFBQSxFQUV2QjtBQUNGOzs7QWZOQSxJQUFPLGlCQUFRO0FBQUEsRUFDYixhQUFhO0FBQUEsSUFDWCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxlQUFlO0FBQUEsSUFDZixhQUNFO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFFBQVEsZUFBZTtBQUFBLElBQ3ZCLE1BQU07QUFBQSxNQUNKLFNBQVMsQ0FBQyxlQUFlLGNBQWMsQ0FBQztBQUFBLE1BQ3hDLFFBQVE7QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFsicGF0aCIsICJoZWFkIiwgInJlYWRGaWxlU3luYyIsICJyZWFkRmlsZVN5bmMiLCAiYmFzZW5hbWUiLCAiYyIsICJiYXNlbmFtZSJdCn0K
