// @ts-check
import { defineConfig } from "astro/config";
import { version } from "./package.json";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  vite: {
    define: {
      __APP_VERSION__: JSON.stringify(version),
    },
  },
});
