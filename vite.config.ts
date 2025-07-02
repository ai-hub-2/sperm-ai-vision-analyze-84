
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize build for memory usage
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-toast', '@radix-ui/react-switch', '@radix-ui/react-progress'],
          supabase: ['@supabase/supabase-js'],
          query: ['@tanstack/react-query'],
          icons: ['lucide-react']
        }
      }
    },
    // Reduce memory usage during build
    minify: 'esbuild',
    sourcemap: false,
    // Optimize for smaller bundle size
    target: 'es2015'
  },
  esbuild: {
    // Optimize esbuild for memory usage
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
}));
