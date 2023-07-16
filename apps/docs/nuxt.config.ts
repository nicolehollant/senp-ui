import { resolve } from 'path'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // extends: ['@nuxt-fable/layer'],
  // ssr: false,
  nuxtStories: {
    title: 'Example Stories',
    autoStoriesGlob: ['./components/**/*.vue'],
    storiesGlob: ['./stories/**/*.vue'],
    ignored: {
      autoStoriesGlob: ['./components/AutoStoryPreview.vue', './components/content/AutoStoryPreview.vue'],
    },
  },
  modules: ['senp-ui', '@nuxt-fable/module'],
  content: {
    highlight: {
      theme: 'github-dark',
    },
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
  srcDir: './src/',
  alias: {
    // jsurl: 'jsurl/lib/jsurl.js',
    vuedraggable: 'vuedraggable/dist/vuedraggable.common.js',
  },
  build: {
    transpile: ['jsurl'],
    // transpile: ['highlight.js'],
  },
  senpui: {
    global: true,
    prefix: '',
  },
  // components: {
  //   global: true,
  //   dirs: ['~/components', '~/components/content'],
  // },
})
