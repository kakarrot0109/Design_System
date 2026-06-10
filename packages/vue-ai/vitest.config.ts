import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@design-system/vue-ui": resolve(__dirname, "../vue-ui/src/index.ts"),
    },
  },
  test: {
    environment: "jsdom",
  },
});
