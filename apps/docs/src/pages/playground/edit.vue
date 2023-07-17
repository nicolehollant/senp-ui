<template>
  <SenpLayoutBasic
    fixed-header
    :classes="{
      content: {
        extend: 'grid overflow-hidden !p-0',
      },
      header: {
        extend: 'bg-gray-950/70 bg-gradient-to-r from-gray-950/50 to-gray-900/50 border-b-2 border-gray-800',
      },
      footer: {
        base: 'hidden',
      },
    }"
    class="bg-gray-900"
  >
    <template #header>
      <NuxtLink to="/" class="flex items-center gap-3 w-max">
        <p class="text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-teal-700 text-4xl">🎨</p>
        <h1 class="font-medium tracking-tight text-lg">Playground</h1>
      </NuxtLink>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <SenpTextInput v-model="slug" :classes="{ input: { extend: '!h-9' } }" placeholder="slug"></SenpTextInput>
          <button
            @click="upload"
            class="h-[36px] inline-flex items-center justify-center p-2 hover:bg-gray-600 transition border-r border-gray-900 rounded bg-gray-800"
          >
            <Icon name="mdi:upload"></Icon>
          </button>
        </div>
        <div class="flex items-center">
          <button
            @click="editorMode === 'template' ? formatTemplate() : formatState()"
            class="h-[36px] inline-flex items-center justify-center p-2 hover:bg-gray-600 transition border-r border-gray-900 rounded bg-gray-800"
          >
            <Icon name="fa6-solid:wand-magic-sparkles"></Icon>
          </button>
        </div>
        <div class="flex items-center">
          <button
            @click="editorMode = 'template'"
            :class="{ 'bg-gray-800': editorMode === 'state', 'bg-blue-900': editorMode === 'template' }"
            class="h-[36px] inline-flex items-center justify-center p-2 hover:bg-gray-600 transition border-r border-gray-900 rounded-l"
          >
            <Icon name="icon-park-outline:code"></Icon>
          </button>
          <button
            @click="editorMode = 'state'"
            :class="{ 'bg-gray-800': editorMode === 'template', 'bg-blue-900': editorMode === 'state' }"
            class="h-[36px] inline-flex items-center justify-center p-2 hover:bg-gray-600 transition rounded-r"
          >
            <Icon name="icon-park-outline:code-brackets"></Icon>
          </button>
        </div>
        <div class="flex items-center">
          <button
            @click="mode = 'horizontal'"
            :class="{ 'bg-gray-800': mode !== 'horizontal', 'bg-blue-900': mode === 'horizontal' }"
            class="h-[36px] inline-flex items-center justify-center p-2 hover:bg-gray-600 transition rounded-l"
          >
            <Icon name="icon-park-outline:freeze-column"></Icon>
          </button>
          <button
            @click="mode = 'vertical'"
            :class="{ 'bg-gray-800': mode !== 'vertical', 'bg-blue-900': mode === 'vertical' }"
            class="h-[36px] inline-flex items-center justify-center p-2 hover:bg-gray-600 transition border-x border-gray-900"
          >
            <Icon name="icon-park-outline:freeze-column" class="transform rotate-90"></Icon>
          </button>
          <button
            @click="mode = 'preview'"
            :class="{ 'bg-gray-800': mode !== 'preview', 'bg-blue-900': mode === 'preview' }"
            class="h-[36px] inline-flex items-center justify-center p-2 hover:bg-gray-600 transition border-r border-gray-900"
          >
            <Icon name="icon-park-outline:eyes"></Icon>
          </button>
          <a
            href="/playground/preview"
            target="_blank"
            class="h-[36px] inline-flex items-center justify-center p-2 hover:bg-gray-600 transition rounded-r text-lg bg-gray-800"
          >
            <Icon name="mdi:fullscreen"></Icon>
          </a>
        </div>
      </div>
    </template>
    <template #content>
      <iframe src="/playground/preview" class="h-full w-full overflow-auto" v-if="mode === 'preview'"></iframe>
      <splitpanes class="w-full h-full overflow-auto" :horizontal="mode === 'vertical'" v-else>
        <pane min-size="20" max-size="80">
          <SenpCodeEditor
            theme="onedark"
            v-if="editorMode === 'template'"
            language="html"
            style="overflow: auto; height: 100%"
            enter-action="default"
            v-model="code"
            :key="codeKey"
            class="overflow-auto rounded-none editor"
          ></SenpCodeEditor>
          <SenpCodeEditor
            theme="onedark"
            v-if="editorMode === 'state'"
            language="json"
            style="overflow: auto; height: 100%"
            enter-action="default"
            v-model="codeState"
            :key="codeKey"
            class="overflow-auto rounded-none editor"
          ></SenpCodeEditor>
        </pane>
        <pane min-size="20" max-size="80">
          <div
            class="grid w-full h-full"
            :class="{
              'grid-cols-[auto,minmax(0px,1fr)]': mode === 'horizontal',
              'grid-rows-[auto,minmax(0px,1fr)]': mode === 'vertical',
            }"
          >
            <div
              class="border-gray-700 bg-gray-900/50 relative"
              :class="{ 'w-4 h-full border-x-2': mode === 'horizontal', 'w-full h-4 border-y-2': mode === 'vertical' }"
            >
              <div
                class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 gap-1"
                :class="{ 'flex flex-col w-1': mode === 'horizontal', 'flex h-1': mode === 'vertical' }"
              >
                <div
                  class="rounded bg-gray-600"
                  :class="{ 'h-2': mode === 'horizontal', 'w-2': mode === 'vertical' }"
                ></div>
                <div
                  class="rounded bg-gray-600"
                  :class="{ 'h-2': mode === 'horizontal', 'w-2': mode === 'vertical' }"
                ></div>
                <div
                  class="rounded bg-gray-600"
                  :class="{ 'h-2': mode === 'horizontal', 'w-2': mode === 'vertical' }"
                ></div>
              </div>
            </div>
            <iframe id="preview-window" src="/playground/preview" class="h-full w-full overflow-auto"></iframe>
            <div class="absolute top-0 right-0 pointer-events-none p-2" v-if="previewSize">
              <div class="px-2 py-1 rounded-full bg-gray-700 border-2 border-gray-800 text-sm text-white shadow-xl">
                {{ previewSize }}
              </div>
            </div>
          </div>
        </pane>
      </splitpanes>
    </template>
  </SenpLayoutBasic>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

import * as prettier from 'prettier'
import prettierPluginBabel from 'prettier/plugins/babel'
import prettierPluginEstree from 'prettier/plugins/estree'
import prettierPluginAngular from 'prettier/plugins/angular'
import prettierPluginHtml from 'prettier/plugins/html'

const debounce = (callback: Function, wait: number) => {
  let timeoutId: any = null
  return (...args: any) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args)
    }, wait)
  }
}

const slug = ref('')
const code = ref('')
const codeKey = ref(0)
const codeState = ref('{}')
const previewSize = ref('')
const editorMode = ref<'template' | 'state'>('template')
const mode = ref<'horizontal' | 'vertical' | 'preview' | 'edit'>('horizontal')

const formatTemplate = async () => {
  code.value = await prettier.format(code.value, {
    printWidth: 80,
    semi: false,
    singleAttributePerLine: true,
    parser: 'html',
    plugins: [prettierPluginAngular, prettierPluginBabel, prettierPluginEstree, prettierPluginHtml],
  })
  codeKey.value++
}

const formatState = async () => {
  codeState.value = await prettier.format(codeState.value, {
    parser: 'json',
    printWidth: 80,
    plugins: [prettierPluginBabel, prettierPluginEstree],
  })
  codeKey.value++
}

const _compile = debounce((template: string, state: string) => {
  localStorage.setItem('playgroundTemplate', template)
  localStorage.setItem('playgroundState', state)
}, 1000)

const clearSize = debounce(() => {
  previewSize.value = ''
}, 3000)

const updateSize = (evt: any) => {
  previewSize.value = [evt[0].target.scrollWidth, evt[0].target.scrollHeight].join(' x ')
  clearSize()
}
watch([code, codeState], () => {
  _compile(code.value, codeState.value)
})

const router = useRouter()
const upload = async () => {
  const created = await playgroundApi.create({
    slug: [slug.value, nanoid(6)].filter((a) => !!a).join('-'),
    state: codeState.value,
    template: code.value,
  })
  if ((created as any).data.slug) {
    router.push(`/playground/view/${(created as any).data.slug}`)
  }
}

onMounted(() => {
  code.value = localStorage.getItem('playgroundTemplate') || ''
  codeState.value = localStorage.getItem('playgroundState') || '{}'
  codeKey.value++
  new ResizeObserver(updateSize).observe(document.querySelector('#preview-window') as any)
})
</script>

<style>
.splitpanes {
  @apply bg-gray-800;
}

.splitpanes__splitter {
  @apply relative bg-transparent;
}
.splitpanes__splitter:before {
  content: '';
  @apply absolute left-0 top-0 transition-opacity opacity-0 z-10 bg-blue-600/30;
}
.splitpanes__splitter:hover:before {
  @apply opacity-100;
}
.splitpanes--vertical > .splitpanes__splitter:before {
  left: -6px;
  right: -22px;
  height: 100%;
}
.splitpanes--horizontal > .splitpanes__splitter:before {
  top: -6px;
  bottom: -22px;
  width: 100%;
}
.editor .cm-editor {
  @apply !rounded-none !bg-gray-800/50;
}
</style>
