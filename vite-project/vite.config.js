import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: "0.0.0.0", // 👈 Make Vite listen on all IPs
    port: process.env.PORT || 5173, // 👈 Let Render assign the port
    proxy: {
      "/Login": {
        target: "http://localhost:5000", // This is fine for local dev
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
