import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import path from "path"

export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5001,
    strictPort: true,
  },
  preview: {
    port: 5001,
    strictPort: true,
  },
  plugins: [
    react(),
    svgr(),
    //remove "checker" if you see performance issues. You will rely only on your editor configuration for static typing
    checker({
      typescript: { tsconfigPath: 'tsconfig.src.json' },
    }),
  ],
});
