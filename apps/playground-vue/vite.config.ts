import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@design-system/tokens/styles.css": fileURLToPath(
        new URL("../../packages/tokens/src/index.css", import.meta.url),
      ),
      "@design-system/vue-ai": fileURLToPath(
        new URL("../../packages/vue-ai/src/index.ts", import.meta.url),
      ),
      "@design-system/vue-ui": fileURLToPath(
        new URL("../../packages/vue-ui/src/index.ts", import.meta.url),
      ),
    },
  },
});
