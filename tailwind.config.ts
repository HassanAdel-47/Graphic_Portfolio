import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");
export default <Partial<Config>>{
  darkMode: "class",
  theme: {
    colors: {
      ...colors,
      navbar_bg_color: "var(--navbar-bg-color)",
      secondary_bg_color: "var(--secondary-bg-color)",
      primary_bg_color: "var(--primary-bg-color)",
      primary_text_color: "var(--primary-text-color)",
      primary_blue_color: "var(--primary-blue-color)",
    },
  },
};
