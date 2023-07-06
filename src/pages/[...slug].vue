<template>
  <header
    class="col-span-full z-50 px-4 h-16 border-b font-medium flex items-center border-gray-800 sticky top-0 text-2xl bg-gray-950/70 bg-gradient-to-r from-gray-950/50 to-gray-900/50 backdrop-blur"
  >
    <div class="flex items-center gap-3 max-w-7xl mx-auto w-full">
      <p class="text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-teal-700 text-4xl">🎨</p>
      <p>SenpUI</p>
    </div>
  </header>
  <div class="grid grid-cols-[auto,minmax(0,1fr),auto] relative max-w-7xl mx-auto w-full">
    <nav class="w-48 sticky top-16 py-8 px-4 max-h-[calc(100vh-4rem)] overflow-auto">
      <ul v-for="dir in navigation" class="mb-4">
        <p class="mb-2 capitalize text-sm font-medium">{{ dir.dir }}</p>

        <li v-for="entry in dir.children">
          <NuxtLink
            :to="entry.path"
            active-class="!text-blue-500 !border-blue-500"
            class="text-sm transition duration-200 hover:!text-purple-500 pl-3 font-medium py-1 flex flex-col gap-1 border-l border-gray-800/50 text-gray-400"
            >{{ entry.title }}</NuxtLink
          >
        </li>
      </ul>
    </nav>
    <div class="px-4 py-8 mx-auto w-full">
      <main
        id="prose-content"
        class="prose prose-invert mx-auto !max-w-4xl [&_.not-prose_pre]:!my-0 [&_.not-prose_pre]:!p-0 prose-code:p-1 prose-code:bg-gray-800 prose-code:rounded-md prose-code:after:content-none prose-code:before:content-none prose-code:border prose-code:border-gray-700"
      >
        <p class="capitalize text-sm font-medium text-blue-400">{{ activeDirectory }}</p>
        <ContentDoc />
        <hr />
        <div class="not-prose flex items-center gap-4">
          <NuxtLink
            v-if="pagination?.prev"
            :to="pagination.prev.path"
            class="mr-auto flex flex-col gap-3 flex-1 max-w-[50%] group text-xl px-8 py-6 rounded-xl border border-gray-700 hover:bg-gray-900 transition"
          >
            <div
              class="w-10 h-10 rounded-full bg-gray-800 border group-hover:bg-blue-800 group-hover:text-blue-200 transition group-hover:border-blue-600 border-gray-600 flex items-center justify-center"
            >
              <Icon name="mdi:arrow-left" class="w-5 h-5"></Icon>
            </div>
            <div class="grid gap-1">
              <p class="!m-0 font-medium text-base">{{ pagination.prev.title }}</p>
              <p class="!m-0 text-sm text-gray-400">{{ pagination.prev.description || 'No Description' }}</p>
            </div>
          </NuxtLink>
          <NuxtLink
            v-if="pagination?.next"
            :to="pagination.next.path"
            class="ml-auto flex flex-col gap-3 flex-1 max-w-[50%] group text-xl px-8 py-6 rounded-xl border border-gray-700 hover:bg-gray-900 transition"
          >
            <div
              class="w-10 h-10 rounded-full bg-gray-800 border group-hover:bg-blue-800 group-hover:text-blue-200 transition group-hover:border-blue-600 border-gray-600 flex items-center justify-center"
            >
              <Icon name="mdi:arrow-right" class="w-5 h-5"></Icon>
            </div>
            <div class="grid gap-1">
              <p class="!m-0 font-medium text-base">{{ pagination.next.title }}</p>
              <p class="!m-0 text-sm text-gray-400">{{ pagination.next.description || 'No Description' }}</p>
            </div>
          </NuxtLink>
        </div>
        <p class="py-12 text-sm text-gray-400">👩‍💻💚 nicole</p>
      </main>
    </div>
    <div class="w-40 px-4 sticky top-16 py-8 max-h-[calc(100vh-4rem)] overflow-auto">
      <DocsToc :value="data?.body?.toc" v-if="data?.body?.toc?.links?.length"></DocsToc>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { path } = useRoute()

const { data: navigationData } = await useAsyncData('nav', () => {
  return queryContent('/docs').only(['_path', 'title', '_dir']).find()
})
const navigation = computed(() => {
  const groupedByDir: { dir: string; children: { path: string; title: string; description: string }[] }[] = []
  if (!navigationData.value) {
    return
  }
  navigationData.value.forEach((entry) => {
    if (entry._dir === '') {
      entry._dir = 'docs'
    }
    if (groupedByDir.some((group) => group.dir === entry._dir)) {
      groupedByDir[groupedByDir.findIndex((group) => group.dir === entry._dir)].children.push({
        path: entry._path,
        title: entry.title,
        description: entry.description || '',
      })
    } else {
      groupedByDir.push({
        dir: entry._dir,
        children: [{ path: entry._path, title: entry.title, description: entry.description || '' }],
      })
    }
  })
  return groupedByDir
})

const pagination = computed(() => {
  if (!navigation.value) {
    return null
  }
  const currentDirIndex = navigation.value.findIndex((val) => val.children.some((entry) => entry.path === path))
  const currentDir = navigation.value[currentDirIndex]
  const indexInCurrentDir = currentDir.children.findIndex((val) => val.path === path)
  const prev =
    indexInCurrentDir > 0
      ? currentDir.children[indexInCurrentDir - 1]
      : currentDirIndex > 0
      ? navigation.value[currentDirIndex - 1].children.at(-1)
      : null
  const next =
    indexInCurrentDir < currentDir.children.length - 1
      ? currentDir.children[indexInCurrentDir + 1]
      : currentDirIndex < navigation.value.length - 1
      ? navigation.value[currentDirIndex + 1].children.at(0)
      : null
  return {
    prev,
    next,
  }
})

const activeDirectory = computed(() => {
  return navigation.value?.find((val) => val.children.some((entry) => entry.path === path))?.dir
})

const { data } = await useAsyncData(`content-${path}`, () => {
  return queryContent('/docs').where({ _path: path }).only(['body']).findOne()
})
</script>

<style>
#prose-content h1 a,
#prose-content h2 a,
#prose-content h3 a,
#prose-content h4 a,
#prose-content h5 a {
  position: relative;
  text-decoration: none !important;
}

#prose-content h1:hover a::before,
#prose-content h2:hover a::before,
#prose-content h3:hover a::before,
#prose-content h4:hover a::before,
#prose-content h5:hover a::before {
  content: '#';
  color: theme('colors.blue.500');
  position: absolute;
  left: 0;
  top: 50%;
  font-size: 0.75em;
  padding-right: 0.5em;
  transform: translate(-100%, -50%);
}
</style>
