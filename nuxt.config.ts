// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'nuxt-headlessui', '@nuxt/content', 'nuxt-icon'],
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
    jsurl: 'jsurl/lib/jsurl.js',
    vuedraggable: 'vuedraggable/dist/vuedraggable.common.js',
    'highlight.js/styles': 'highlight.js/styles',
    // 'highlight.js': 'highlight.js/es',
    'lodash.debounce': 'lodash.debounce/index.js',
  },
  // build: {
  //   transpile: ['vuedraggable', 'jsurl', 'lodash.debounce', 'highlight.js'],
  // },
  // hooks: {
  //   'vite:extendConfig': (config, { isClient, isServer }) => {
  //     if (isClient && config?.resolve?.alias) {
  //       // ;(config.resolve.alias as any).vuedraggable = 'vuedraggable/dist/vuedraggable.common.js'
  //       // ;(config.resolve.alias as any).jsurl = 'jsurl/lib/jsurl.js'
  //       // ;(config.resolve.alias as any)['highlight.js/styles'] = 'highlight.js/styles'
  //       // ;(config.resolve.alias as any)['highlight.js'] = 'highlight.js/es'
  //       // ;(config.resolve.alias as any)['lodash.debounce'] = 'lodash.debounce/index.js'
  //     }
  //   },
  // },
})
