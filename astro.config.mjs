// @ts-check
import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import icon from "astro-icon"

let prefixCounter = 0

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
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
