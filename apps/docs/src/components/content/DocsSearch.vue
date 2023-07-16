<template>
  <SenpButton @click="state.modal = true" size="sm" intent="outline" class="opacity-80">
    <Icon name="mdi:search"></Icon>
    <template #trailing>
      <kbd class="border-l border-blue-900 pl-2 flex items-center gap-1">
        <span>&#8984; </span>
        <span class="text-xs text-blue-700">+</span>
        <span>K</span>
      </kbd>
    </template>
  </SenpButton>
  <SenpModal :classes="{ panelWrapper: { base: '' } }" v-model:open="state.modal">
    <div class="p-4">
      <SenpTextInput placeholder="search..." v-model="state.query"></SenpTextInput>
      <ul v-if="data?.length" class="mt-4 w-full">
        <li v-for="article in data.slice(0, 10)" class="w-full">
          <NuxtLink :to="article._path" custom v-slot="{ href, navigate }">
            <SenpButton
              class="!w-full"
              :class="{
                '!font-normal text-left text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400':
                  $route.path !== article._path,
              }"
              :intent="$route.path !== article._path ? null : 'primary'"
              :href="href"
              @click="
                () => {
                  state.modal = false
                  navigate()
                }
              "
            >
              <span class="font-medium text-left">
                {{ article.title }}
              </span>
              <span
                class="font-normal"
                :class="{
                  'text-gray-500': $route.path !== article._path,
                  'text-gray-600 dark:text-gray-800': $route.path === article._path,
                }"
              >
                {{ article?.description }}
              </span>
            </SenpButton>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </SenpModal>
</template>

<script setup lang="ts">
import { ParsedContent } from '@nuxt/content/dist/runtime/types'
import Fuse from 'fuse.js'
const state = reactive({
  modal: false,
  query: '',
  fuse: null as null | Fuse<ParsedContent>,
})

const route = useRoute()

// TODO: make this not suck ?
const { data } = await useLazyAsyncData(
  `content`,
  () => {
    return queryContent('/docs')
      .where({
        $or: [
          {
            title: {
              $icontains: state.query,
            },
          },
          {
            description: {
              $icontains: state.query,
            },
          },
        ],
      })
      .find()
  },
  { watch: [() => state.query] }
)

watch(
  () => route.fullPath,
  () => {
    state.modal = false
  }
)

useKeyboardShortcut({
  key: 'k',
  meta: true,
  onKeyDown() {
    state.modal = true
  },
})
</script>
