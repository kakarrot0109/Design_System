import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@design-system/react-ai": fileURLToPath(
        new URL("../../packages/react-ai/src/index.ts", import.meta.url),
      ),
      "@design-system/react-ui": fileURLToPath(
        new URL("../../packages/react-ui/src/index.ts", import.meta.url),
      ),
      "@design-system/tokens/styles.css": fileURLToPath(
        new URL("../../packages/tokens/src/index.css", import.meta.url),
      ),
    },
  },
});
