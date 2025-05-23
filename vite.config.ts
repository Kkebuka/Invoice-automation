import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: "dist", // Make sure this is 'dist'
  },
});
