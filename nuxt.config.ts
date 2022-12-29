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
})
