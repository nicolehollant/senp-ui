import { resolve } from 'path'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  extends: ['@nuxt-fable/layer'],
  modules: ['senp-ui', '@nuxt/content'],
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
