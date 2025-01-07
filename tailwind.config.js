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
            "DEFAULT": "#22223B",
            "foreground": "#f8f8fc"
          },
          "content1": "#0c0c1d",
          "content2": "#13132f",
          "content3": "#1b1b41",
          "content4": "#25255b",
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
            "50": "#161636",
            "100": "#2f2f74",
            "200": "#4646aa",
            "300": "#7d7dca",
            "400": "#afafde",
            "500": "#bebee4",
            "600": "#ccccea",
            "700": "#dedef2",
            "800": "#f1f1f9",
            "900": "#f8f8fc",
            "DEFAULT": "#4646aa",
            "foreground": "#f8f8fc"
          },
          "divider": "#7d7dca",
          "focus": "#F2E9E4",
          "foreground": {
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
            "DEFAULT": "#F2E9E4",
            "foreground": "#292624"
          },
          "overlay": "#22223B",
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
        "DEFAULT": "#F0ECD8",
        "foreground": "#0c0c0d"
      },
      "content1": "#e3ddc0",
      "content2": "#13325d",
      "content3": "#721C24",
      "content4": "#8B0000",
      "danger": {
        "50": "#fff9f5",
        "100": "#fff3eb",
        "200": "#ffe4d1",
        "300": "#ffd5b8",
        "400": "#ffc9a3",
        "500": "#ffac70",
        "600": "#ff9447",
        "700": "#f06400",
        "800": "#a34400",
        "900": "#4d2000",
        "DEFAULT": "#FF6A00"
      },
      "default": {
        "50": "#f9f9fb",
        "100": "#f2f3f7",
        "200": "#e2e4ee",
        "300": "#d2d6e5",
        "400": "#c5cadd",
        "500": "#a5acca",
        "600": "#8b95bb",
        "700": "#596597",
        "800": "#3c4567",
        "900": "#1c2030",
        "DEFAULT": "#e2e4ee",
        "foreground": "#1c2030"
      },
      "divider": "#000",
      "focus": "#1C4191",
      "foreground": {
        "50": "#fafafa",
        "100": "#f5f5f5",
        "200": "#e8e8e8",
        "300": "#dbdbdb",
        "400": "#d1d1d1",
        "500": "#b8b8b8",
        "600": "#a3a3a3",
        "700": "#787878",
        "800": "#525252",
        "900": "#262626",
        "DEFAULT": "#000000",
        "foreground": "#fafafa"
      },
      "overlay": "#F0ECD8",
      "primary": {
        "50": "#f6f9fe",
        "100": "#edf3fd",
        "200": "#d6e5fa",
        "300": "#bfd7f8",
        "400": "#accbf6",
        "500": "#7eaef1",
        "600": "#5a97ed",
        "700": "#1868d8",
        "800": "#104793",
        "900": "#082145",
        "DEFAULT": "#0D2240"
      },
      "secondary": {
        "50": "#fef5f6",
        "100": "#feeced",
        "200": "#fcd4d7",
        "300": "#fbbcc1",
        "400": "#f9a9af",
        "500": "#f67983",
        "600": "#f45260",
        "700": "#e10e20",
        "800": "#990a16",
        "900": "#48050a",
        "DEFAULT": "#E31B2C"
      },
      "success": {
        "50": "#f6fef9",
        "100": "#edfcf3",
        "200": "#d8f9e5",
        "300": "#c2f5d6",
        "400": "#b0f2ca",
        "500": "#9fefbf",
        "600": "#61e596",
        "700": "#22ce67",
        "800": "#178c46",
        "900": "#0b4221",
        "DEFAULT": "#36C26E"
      },
      "warning": {
        "50": "#fdfaf6",
        "100": "#fcf6ee",
        "200": "#f8ebd8",
        "300": "#f4dfc3",
        "400": "#f0d6b2",
        "500": "#e8c087",
        "600": "#e2ae65",
        "700": "#c98526",
        "800": "#895b1a",
        "900": "#402b0c",
        "DEFAULT": "#F5AF4E"
      }
    },
    "extend": "light"
  },

    }
  })]
};
export default config;

