/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        oblivion: ["Oblivion", "system-ui"],
        energy: ["Energy", "system-ui"],
        quicksand: ["Quicksand", "system-ui"],
      },
    },
  },
  plugins: [],
}
