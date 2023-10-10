import { defineNuxtModule, addPlugin, addPluginTemplate } from '@nuxt/kit'

import { resolve } from 'path'
import glob from 'fast-glob'

import { withTrailingSlash, joinURL } from 'ufo'
import { readFileSync } from 'fs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr: false,
  extends: ['@nuxt-fable/layer'],
  modules: [
    'senp-ui',
    '@nuxt/content',
    /**
     * god awful module to load raw file contents in at build time :)
     */
    defineNuxtModule({
      async setup(inlineOptions, nuxt) {
        const senpUiModules = await glob(
          joinURL(withTrailingSlash(nuxt.options.rootDir), '/node_modules/senp-ui/src/runtime/**/*')
        )
        const localModules = await glob(joinURL(withTrailingSlash(nuxt.options.srcDir), '/**/*'))
        nuxt.options.runtimeConfig.rawContent = {
          senpUiModules: Object.fromEntries(
            senpUiModules.map((path) => {
              return [path, readFileSync(path).toString()]
            })
          ),
          localModules: Object.fromEntries(
            localModules.map((path) => {
              return [path, readFileSync(path).toString()]
            })
          ),
        }
      },
    }),
  ],
  srcDir: './src/',
  senpui: {
    global: true,
    prefix: '',
  },
  content: {
    highlight: {
      theme: 'github-dark',
    },
  },
  nuxtStories: {
    title: 'Example Stories',
    autoStoriesGlob: ['./src/components/**/*.vue', './node_modules/senp-ui/**/components/**/*.vue'],
    storiesGlob: ['./src/stories/**/*.vue'],
    ignored: {
      autoStoriesGlob: ['./src/components/AutoStoryPreview.vue', './src/components/content/AutoStoryPreview.vue'],
    },
  },
  tailwindcss: {
    config: {
      content: [
        './src/**/*.{vue,html,md}',
        './node_modules/senp-ui/src/**/*.{vue,html,md}',
        './node_modules/@nuxt-fable/layer/src/**/*.{vue,html,md}',
      ],
    },
  },
  hooks: {
    'vite:extendConfig': (config, { isClient, isServer }) => {
      if (isClient && config?.resolve?.alias) {
        ;(config.resolve.alias as any).vue = 'vue/dist/vue.esm-bundler'
      }
    },
  },
  build: {
    transpile: ['js-beautify'],
  },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          href: '/favicon.png',
        },
      ],
    },
  },
})
