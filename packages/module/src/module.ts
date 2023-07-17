import defaultColors from "tailwindcss/colors.js";
import {
  defineNuxtModule,
  installModule,
  addComponentsDir,
  addImportsDir,
  createResolver,
  addPlugin,
  resolvePath,
} from "@nuxt/kit";
import { name, version } from "../package.json";

export interface ModuleOptions {
  /**
   * @default 'u'
   */
  prefix?: string;

  /**
   * @default false
   */
  global?: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "senpui",
    compatibility: {
      nuxt: "^3.0.0-rc.8",
    },
  },
  defaults: {
    prefix: "U",
    global: true,
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    // Transpile runtime
    const runtimeDir = resolve("./runtime");
    nuxt.options.build.transpile.push(runtimeDir);
    nuxt.options.build.transpile.push("@formkit/auto-animate");

    // Css
    nuxt.options.css.push(resolve("./runtime/css/main.css"));
    nuxt.options.css.push(resolve("./runtime/css/prism-defaults.css"));

    // Modules

    await installModule("nuxt-headlessui");
    await installModule("nuxt-icon");
    // await installModule("@nuxtjs/color-mode", { classSuffix: "" });
    await installModule("@nuxtjs/tailwindcss", {
      exposeConfig: true,
      config: {
        darkMode: "media",
        plugins: [
          require("@tailwindcss/forms")({ strategy: "class" }),
          require("@tailwindcss/aspect-ratio"),
          require("@tailwindcss/typography"),
        ],
        content: [
          resolve(runtimeDir, "components/**/*.{vue,mjs,ts,tsx,jsx}"),
          resolve(runtimeDir, "*.{mjs,js,ts}"),
        ],
      },
    });

    // Plugins

    addPlugin({ src: resolve(runtimeDir, "plugins", "auto-animate") });
    addPlugin({ src: resolve(runtimeDir, "plugins", "shiki") });
    addPlugin({ src: resolve(runtimeDir, "plugins", "toast") });
    addPlugin({ src: resolve(runtimeDir, "plugins", "virtual-scroller") });
    addPlugin({ src: resolve(runtimeDir, "plugins", "vue-query") });
    addPlugin({ src: resolve(runtimeDir, "plugins", "senpCx") });

    // Composables
    addImportsDir(resolve(runtimeDir, "composables"));
    addImportsDir(resolve(runtimeDir, "utils"));

    // Components
    addComponentsDir({
      path: resolve(runtimeDir, "components"),
      prefix: options.prefix,
      global: options.global,
      watch: false,
    });
  },
});
