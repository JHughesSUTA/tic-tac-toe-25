import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/tic-tac-toe-25/",
  server: {
    port: 3000,
  },
});
