import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 950,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-icons":  ["react-icons"],
          "vendor-motion": ["framer-motion"],
          "vendor-three":  ["three", "@react-three/fiber", "@react-three/drei"],
        },
      },
    },
  },
});

