import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
    root: "src",
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    server: {
        host: true,
        port: 5173,
        watch: {
            usePolling: true,
        },
    },
    build: {
        outDir: "../dist",
        emptyOutDir: true,
    },
});
