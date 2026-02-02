import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/** SPA fallback for preview server: brak pliku dla ścieżki = serwuj index.html */
function spaFallback() {
  return {
    name: "spa-fallback",
    configurePreviewServer(server) {
      const handler = (req: unknown, _res: unknown, next: () => void) => {
        const r = req as { url?: string };
        const url = r.url ?? "";
        const isAsset = url.includes(".") && !url.endsWith(".html");
        const isHmr = url.startsWith("/@");
        if (!isAsset && !isHmr) {
          r.url = "/index.html";
        }
        next();
      };
      // Uruchom przed serwerem statycznym, żeby nie dostać 404 na /kursy/...
      const stack = (server.middlewares as { stack: { route: string; handle: (req: unknown, res: unknown, next: () => void) => void }[] }).stack;
      stack.unshift({ route: "", handle: handler });
    },
  };
}

export default defineConfig({
  plugins: [react(), spaFallback()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core (including react-query which depends on react)
          "react-vendor": [
            "react",
            "react-dom",
            "react-router-dom",
            "@tanstack/react-query",
          ],
          // UI libraries
          "ui-vendor": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-select",
            "@radix-ui/react-slot",
            "lucide-react",
          ],
          // Other utilities
          "utils-vendor": [
            "sonner",
            "framer-motion",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
