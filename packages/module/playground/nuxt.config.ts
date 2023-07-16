export default defineNuxtConfig({
  modules: ["../src/module", "@nuxt-fable/module"],
  ssr: false,
  nuxtStories: {
    title: "Example Stories",
    autoStoriesGlob: ["./components/**/*.vue"],
    storiesGlob: ["./stories/**/*.vue"],
    ignored: {
      autoStoriesGlob: [
        "./components/AutoStoryPreview.vue",
        "./components/content/AutoStoryPreview.vue",
      ],
    },
  },
  content: {
    highlight: {
      theme: "github-dark",
    },
  },
  app: {
    head: {
      link: [
        {
          rel: "icon",
          href: "/favicon.png",
        },
      ],
    },
  },
  senpui: {
    global: true,
    prefix: "",
  },
  components: {
    global: true,
    dirs: ["~/components", "~/components/content"],
  },
  // imports: {
  //   autoImport: true,
  // },
  // devtools: { enabled: true },
});
