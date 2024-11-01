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
  ["link", { name: "apple-touch-icon", href: "/apple-touch-icon-180x180.png" }],
];

export const transformHead = ({ pageData }) => {
  console.log("pageData: ", pageData);

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
        content: "https://archi.guenego.com/home/ferrieres-landscape.jpg",
      },
    ],
  ];
  return head;
};
