import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@design-system/react-ui": resolve(__dirname, "../react-ui/src/index.ts"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "../../vitest.setup.ts",
  },
});
