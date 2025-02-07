// @ts-check
import { defineConfig, envField } from "astro/config"
import vercel from "@astrojs/vercel"
import react from "@astrojs/react"
import icon from "astro-icon"
import tailwindcss from "@tailwindcss/vite"

let prefixCounter = 0

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
    },
  },
  site: "https://difase-web.vercel.app/",
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
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
