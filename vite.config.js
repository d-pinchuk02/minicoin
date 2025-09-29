import { defineConfig } from "vite"
import { createVuePlugin as vue } from "vite-plugin-vue2"
import { VuetifyResolver } from "unplugin-vue-components/resolvers"
import Components from "unplugin-vue-components/vite"
import path from "node:path"

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        VuetifyResolver(),
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
