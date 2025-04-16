import { HeadConfig } from "vitepress";

export const head: HeadConfig[] = [
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
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
  ],
  [
    "link",
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Display:ital,wght@0,100..900;1,100..900&family=Sarala:wght@400;700&display=swap",
    },
  ],
];

export const transformHead = ({ pageData }) => {
  const isProject =
    pageData.relativePath.match(new RegExp("realisations/[^/]+/[^/]+")) !==
    null;

  if (isProject) {
    const path = pageData.relativePath.replace(
      /^realisations\/(.*)\.md$/,
      "$1",
    );
    const parallax = `/photos/projects/${path}/parallax.jpg`;

    const head: HeadConfig[] = [
      [
        "meta",
        {
          property: "og:image",
          content: `https://archi.guenego.com${parallax}`,
        },
      ],
    ];
    return head;
  }
  const head: HeadConfig[] = [
    [
      "meta",
      {
        property: "og:image",
        content: "https://archi.guenego.com/home/carte.jpg",
      },
    ],
  ];
  return head;
};
