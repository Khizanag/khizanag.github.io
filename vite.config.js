import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "src/presentations",
  base: "/presentations/",
  build: {
    outDir: "../../dist/presentations",
    emptyOutDir: true,
  },
});
