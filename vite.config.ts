import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "snacklish",
      formats: ["es"],
      fileName: (format) => `snacklish.${format}.js`,
    },
    rollupOptions: {
      external: [],
    },
  },
});
