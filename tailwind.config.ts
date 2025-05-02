import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./.vitepress/theme/**/*.{vue,js,ts,jsx,tsx,html,md}"],
  theme: {
    extend: {
      screens: {
        print: { raw: "print" },
      },
    },
    fontFamily: {
      sans: ["Sarala", "sans-serif"],
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".tr-selectable": {
          cursor: "pointer",
          "&:hover": {
            background: "rgb(229 229 229)",
          },
        },
      });
    }),
  ],
} satisfies Config;
