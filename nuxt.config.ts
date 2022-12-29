import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'nuxt-headlessui', '@nuxt/content'],
  vite: {
    plugins: [
      Components({
        resolvers: [IconsResolver()],
      }),
      Icons(),
    ],
  },
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
})
