import { nextui } from '@nextui-org/theme';
import { Config } from 'tailwindcss';



/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conie":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
    },
  },

  darkMode: 'class',
  plugins: [nextui({
    themes: {
      dark: {
        "colors": {
          "background": {
            "DEFAULT": "#212730",
            "foreground": "#f8fafb"
          },
          "content1": "#0e131b",
          "content2": "#171f2b",
          "content3": "#202b3c",
          "content4": "#2c3c54",
          "danger": {
            "50": "#490316",
            "100": "#9c072f",
            "200": "#e50b45",
            "300": "#f7507c",
            "400": "#fa94af",
            "500": "#fba7be",
            "600": "#fcbbcc",
            "700": "#fdd3de",
            "800": "#feecf0",
            "900": "#fff5f8",
            "DEFAULT": "#EB154E"
          },
          "default": {
            "50": "#1a3132",
            "100": "#37696c",
            "200": "#519a9e",
            "300": "#86bec1",
            "400": "#b5d7d9",
            "500": "#c2dee0",
            "600": "#d0e6e7",
            "700": "#e1efef",
            "800": "#f2f8f8",
            "900": "#f8fbfc",
            "DEFAULT": "#519a9e",
            "foreground": "#f8fbfc"
          },
          "divider": "#a0aec0",
          "focus": "#E3D4C9",
          "foreground": {
            "50": "#262626",
            "100": "#525252",
            "200": "#787878",
            "300": "#a3a3a3",
            "400": "#c7c7c7",
            "500": "#d1d1d1",
            "600": "#dbdbdb",
            "700": "#e8e8e8",
            "800": "#f5f5f5",
            "900": "#fafafa",
            "DEFAULT": "#EDEDED",
            "text": "#262626"
          },
          "overlay": "#212730",
          "primary": {
            "50": "#292624",
            "100": "#56504d",
            "200": "#7f7671",
            "300": "#a9a29e",
            "400": "#cac6c4",
            "500": "#d4d0ce",
            "600": "#dddbd9",
            "700": "#e9e8e7",
            "800": "#f5f5f4",
            "900": "#fafafa",
            "DEFAULT": "#F2E9E4"
          },
          "secondary": {
            "50": "#2a2329",
            "100": "#594a57",
            "200": "#836d7f",
            "300": "#ab9ba9",
            "400": "#ccc2ca",
            "500": "#d5cdd4",
            "600": "#dfd8de",
            "700": "#eae6e9",
            "800": "#f6f4f5",
            "900": "#faf9fa",
            "DEFAULT": "#998B97"
          },
          "success": {
            "50": "#004d30",
            "100": "#00a367",
            "200": "#00f098",
            "300": "#47ffbc",
            "400": "#8fffd6",
            "500": "#a3ffdd",
            "600": "#b8ffe5",
            "700": "#d1ffee",
            "800": "#ebfff8",
            "900": "#f5fffb",
            "DEFAULT": "#00D184"
          },
          "warning": {
            "50": "#4d3800",
            "100": "#a37800",
            "200": "#f0b000",
            "300": "#ffce47",
            "400": "#ffe18f",
            "500": "#ffe7a3",
            "600": "#ffecb8",
            "700": "#fff3d1",
            "800": "#fffaeb",
            "900": "#fffcf5",
            "DEFAULT": "#FCB900"
          }
        },
        "extend": "dark"
      },

      light: {
        "colors": {
          "background": {
            "DEFAULT": "#F8FAFB",
            "foreground": "#212730"
          },
          "content1": "#F1F4F8",
          "content2": "#E3E9F0",
          "content3": "#D6DEE8",
          "content4": "#C7D0E0",
          "danger": {
            "50": "#FFEEF0",
            "100": "#FFC3CB",
            "200": "#FF8A9E",
            "300": "#FF5076",
            "400": "#EB154E",
            "500": "#D20E41",
            "600": "#B80B37",
            "700": "#9C072F",
            "800": "#7F0628",
            "900": "#490316",
            "DEFAULT": "#D20E41"
          },
          "default": {
            "50": "#F0F8F8",
            "100": "#DAEAEA",
            "200": "#B5D7D9",
            "300": "#86BEC1",
            "400": "#519A9E",
            "500": "#37696C",
            "600": "#2D5558",
            "700": "#1A3132",
            "800": "#152526",
            "900": "#0E191A",
            "DEFAULT": "#37696C",
            "foreground": "#152526"
          },
          "divider": "#C7D0E0",
          "focus": "#C9B8AE",
          "foreground": {
            "50": "#FAFAFA",
            "100": "#F5F5F5",
            "200": "#E8E8E8",
            "300": "#DBDBDB",
            "400": "#C7C7C7",
            "500": "#A3A3A3",
            "600": "#787878",
            "700": "#525252",
            "800": "#262626",
            "900": "#171717",
            "DEFAULT": "#262626",
            "text": "#212730"
          },
          "overlay": "#F8FAFB",
          "primary": {
            "50": "#FAF7F6",
            "100": "#F5EFEC",
            "200": "#EAE1DC",
            "300": "#D4C5BF",
            "400": "#B8A59E",
            "500": "#998B7F",
            "600": "#7F7165",
            "700": "#5F554D",
            "800": "#423A35",
            "900": "#292624",
            "DEFAULT": "#998B7F"
          },
          "secondary": {
            "50": "#FAF9FA",
            "100": "#F6F4F5",
            "200": "#EAE6E9",
            "300": "#DFD8DE",
            "400": "#D5CDD4",
            "500": "#AB9BA9",
            "600": "#836D7F",
            "700": "#594A57",
            "800": "#2A2329",
            "900": "#1A161A",
            "DEFAULT": "#AB9BA9"
          },
          "success": {
            "50": "#F5FFFA",
            "100": "#EBFFF4",
            "200": "#D1FFEA",
            "300": "#A3FFD4",
            "400": "#47FFB6",
            "500": "#00D184",
            "600": "#00A367",
            "700": "#00754A",
            "800": "#004D30",
            "900": "#002618",
            "DEFAULT": "#00A367"
          },
          "warning": {
            "50": "#FFFDF5",
            "100": "#FFFAEB",
            "200": "#FFF3D1",
            "300": "#FFE7A3",
            "400": "#FFCE47",
            "500": "#F0B000",
            "600": "#A37800",
            "700": "#4D3800",
            "800": "#332500",
            "900": "#1A1300",
            "DEFAULT": "#F0B000"
          }
        },
        "extend": "light"
      },

    }
  })]
};
export default config;

