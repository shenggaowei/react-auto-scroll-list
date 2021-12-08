import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/list/index.tsx"),
      name: "ReactAutoScrollList",
      formats: ["es", "cjs"],
      fileName: "list",
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
        exports: "named",
      },
    },
  },
});
