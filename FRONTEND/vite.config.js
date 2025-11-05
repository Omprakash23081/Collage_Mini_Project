import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    proxy: {
      "/Login": {
        target: "http://localhost:3000", // Use the actual backend port
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: ["collage-mini-project.onrender.com"],
  },
  plugins: [react()],
});
