
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/tts": { target: "http://127.0.0.1:8000", changeOrigin: true },
      "/reports": { target: "http://127.0.0.1:8000", changeOrigin: true }, // ✅ add this
      "/download-pdf": { target: "http://127.0.0.1:8000", changeOrigin: true },
      
    },
  },
});
