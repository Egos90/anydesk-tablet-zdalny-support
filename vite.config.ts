import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  // To ustawienie naprawia błędy 404 dla zasobów na GitHub Pages
  base: '/anydesk-tablet-zdalny-support/', 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
