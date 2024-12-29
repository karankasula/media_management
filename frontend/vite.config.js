import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { resolve } from "path";
// https://vitejs.dev/config/

// export default defineConfig({
//   build: { manifest: true },
//   base: process.env.mode === "production" ? "/static/" : "/",
//   root: "./src",
//   plugins: [reactRefresh()],
// });
export default defineConfig({
  plugins: [reactRefresh()],
  root: "./src",
  build: {
    outDir: resolve(__dirname, "../static/react"),
    emptyOutDir: true,
    assetsDir: ".",
    manifest: true,
    rollupOptions: {
      output: { entryFileNames: "[name].js", assetFileNames: "[name].[ext]" },
    },
  },
});
