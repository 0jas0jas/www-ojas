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
            "DEFAULT": "#090807",
            "foreground": "#e8e5e3"
          },
          "content1": "#1D232F",
          "content2": "#222E42",
          "content3": "#303134",
          "content4": "#3E4232",
          "danger": {
            "50": "#2B1413",
            "100": "#441C1B",
            "200": "#472021",
            "300": "#6B2D2C",
            "400": "#8F3E3D",
            "500": "#B34F4E",
            "600": "#D76F6E",
            "700": "#E88F8E",
            "800": "#F4B7B6",
            "900": "#FADFDE",
            "DEFAULT": "#B34F4E"
          },
          "default": {
            "50": "#31261A",
            "100": "#483929",
            "200": "#60462C",
            "300": "#7A5A3A",
            "400": "#946E48",
            "500": "#AE8256",
            "600": "#C89664",
            "700": "#D4AA7A",
            "800": "#E0BE90",
            "900": "#ECD2A6",
            "DEFAULT": "#60462C",
            "foreground": "#e8e5e3"
          },
          "divider": "#474239",
          "focus": "#60462C",
          "foreground": {
            "50": "#090807",
            "100": "#1D232F",
            "200": "#303134",
            "300": "#474239",
            "400": "#4F4D4C",
            "500": "#67605F",
            "600": "#8A8584",
            "700": "#ADAAA9",
            "800": "#D0CFCE",
            "900": "#E8E5E3",
            "DEFAULT": "#E8E5E3",
            "text": "#E8E5E3"
          },
          "overlay": "#090807",
          "primary": {
            "50": "#2B1413",
            "100": "#492E1C",
            "200": "#60462C",
            "300": "#7A5A3A",
            "400": "#946E48",
            "500": "#AE8256",
            "600": "#C89664",
            "700": "#D4AA7A",
            "800": "#E0BE90",
            "900": "#ECD2A6",
            "DEFAULT": "#60462C"
          },
          "secondary": {
            "50": "#1D232F",
            "100": "#222E42",
            "200": "#303134",
            "300": "#3E4232",
            "400": "#474239",
            "500": "#4F4D4C",
            "600": "#67605F",
            "700": "#8A8584",
            "800": "#ADAAA9",
            "900": "#D0CFCE",
            "DEFAULT": "#474239"
          },
          "success": {
            "50": "#1a3e2a",
            "100": "#2d5c3f",
            "200": "#407a54",
            "300": "#539869",
            "400": "#66b67e",
            "500": "#79d493",
            "600": "#8ce2a8",
            "700": "#9febbd",
            "800": "#b2f4d2",
            "900": "#c5fde7",
            "DEFAULT": "#66b67e"
          },
          "warning": {
            "50": "#4a3a1a",
            "100": "#6d5627",
            "200": "#907234",
            "300": "#b38e41",
            "400": "#d6aa4e",
            "500": "#f9c65b",
            "600": "#fbd178",
            "700": "#fcdc95",
            "800": "#fde7b2",
            "900": "#fef2cf",
            "DEFAULT": "#d6aa4e"
          }
        },
        "extend": "dark"
      },

      light: {
        "colors": {
          "background": {
            "DEFAULT": "#F5F3F1",
            "foreground": "#1D232F"
          },
          "content1": "#E8E5E3",
          "content2": "#D0CFCE",
          "content3": "#ADAAA9",
          "content4": "#8A8584",
          "danger": {
            "50": "#FADFDE",
            "100": "#F4B7B6",
            "200": "#E88F8E",
            "300": "#D76F6E",
            "400": "#B34F4E",
            "500": "#8F3E3D",
            "600": "#6B2D2C",
            "700": "#472021",
            "800": "#441C1B",
            "900": "#2B1413",
            "DEFAULT": "#B34F4E"
          },
          "default": {
            "50": "#ECD2A6",
            "100": "#E0BE90",
            "200": "#D4AA7A",
            "300": "#C89664",
            "400": "#AE8256",
            "500": "#946E48",
            "600": "#7A5A3A",
            "700": "#60462C",
            "800": "#483929",
            "900": "#31261A",
            "DEFAULT": "#946E48",
            "foreground": "#1D232F"
          },
          "divider": "#8A8584",
          "focus": "#946E48",
          "foreground": {
            "50": "#F5F3F1",
            "100": "#E8E5E3",
            "200": "#D0CFCE",
            "300": "#ADAAA9",
            "400": "#8A8584",
            "500": "#67605F",
            "600": "#4F4D4C",
            "700": "#474239",
            "800": "#303134",
            "900": "#1D232F",
            "DEFAULT": "#1D232F",
            "text": "#1D232F"
          },
          "overlay": "#F5F3F1",
          "primary": {
            "50": "#ECD2A6",
            "100": "#E0BE90",
            "200": "#D4AA7A",
            "300": "#C89664",
            "400": "#AE8256",
            "500": "#946E48",
            "600": "#7A5A3A",
            "700": "#60462C",
            "800": "#492E1C",
            "900": "#2B1413",
            "DEFAULT": "#946E48"
          },
          "secondary": {
            "50": "#E8E5E3",
            "100": "#D0CFCE",
            "200": "#ADAAA9",
            "300": "#8A8584",
            "400": "#67605F",
            "500": "#4F4D4C",
            "600": "#474239",
            "700": "#3E4232",
            "800": "#303134",
            "900": "#222E42",
            "DEFAULT": "#67605F"
          },
          "success": {
            "50": "#c5fde7",
            "100": "#b2f4d2",
            "200": "#9febbd",
            "300": "#8ce2a8",
            "400": "#79d493",
            "500": "#66b67e",
            "600": "#539869",
            "700": "#407a54",
            "800": "#2d5c3f",
            "900": "#1a3e2a",
            "DEFAULT": "#66b67e"
          },
          "warning": {
            "50": "#fef2cf",
            "100": "#fde7b2",
            "200": "#fcdc95",
            "300": "#fbd178",
            "400": "#f9c65b",
            "500": "#d6aa4e",
            "600": "#b38e41",
            "700": "#907234",
            "800": "#6d5627",
            "900": "#4a3a1a",
            "DEFAULT": "#d6aa4e"
          }
        },
        "extend": "light"
      },

    }
  })]
};
export default config;

