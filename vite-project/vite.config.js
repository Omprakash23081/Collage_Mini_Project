import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 5173,
    proxy: {
      "/Login": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: ["collage-mini-project.onrender.com"],
  },
  plugins: [react()],
});
