import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import typescript2 from "rollup-plugin-typescript2";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    typescript2({
      check: false,
      include: ["src/components/**/*.vue"],
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
      },
      exclude: ["vite.config.ts"],
    }),
  ],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: "./src/preset.ts",
      formats: ["cjs", "es"],
      name: "Revuelution",
      fileName: (format) => (format === "es" ? "index.js" : "index.common.js"),
    },
    rollupOptions: {
      external: ["vue", "gsap", "gsap/ScrollTrigger"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
