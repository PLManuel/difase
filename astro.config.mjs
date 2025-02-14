// @ts-check
import { defineConfig } from "astro/config"
import vercel from "@astrojs/vercel"
import icon from "astro-icon"
import tailwindcss from "@tailwindcss/vite"

import react from "@astrojs/react";

let prefixCounter = 0

// https://astro.build/config
export default defineConfig({
  site: "https://difase-web.vercel.app/",
  adapter: vercel(),
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [icon({
    iconDir: "src/assets/icons",
    svgoOptions: {
      multipass: true,
      plugins: [
        {
          name: "prefixIds",
          params: {
            delim: "",
            prefix: () => prefixCounter++,
          },
        },
      ],
    },
  }), react()],
})