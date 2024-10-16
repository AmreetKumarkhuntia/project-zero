import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $server: path.resolve("src/lib/server"),
      $client: path.resolve("src/lib/client"),
      $utils: path.resolve("src/lib/utils"),
      $generated: path.resolve("src/generated"),
    },
  },
});
