// @ts-check
import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import vercel from "@astrojs/vercel"
import react from "@astrojs/react"
import icon from "astro-icon"

let prefixCounter = 0

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  integrations: [
    tailwind(),
    react(),
    icon({
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
    }),
  ],
})
