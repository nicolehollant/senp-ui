<template>
  <SenpLayoutBasic
    fixed-header
    :classes="{
      content: {
        extend: 'grid overflow-hidden !p-0',
      },
      header: {
        extend: 'border-b-2 border-neutral-800',
      },
      footer: {
        base: 'hidden',
      },
    }"
    class="bg-neutral-900"
  >
    <template #header>
      <h1 class="text-xl">Playground</h1>
      <div class="flex items-center gap-4">
        <div class="flex items-center">
          <button
            @click="editorMode === 'template' ? formatTemplate() : formatState()"
            class="h-[36px] inline-flex items-center justify-center p-2 hover:bg-neutral-600 transition border-r border-neutral-900 rounded bg-neutral-800"
          >
            <i-fa6-solid-wand-magic-sparkles></i-fa6-solid-wand-magic-sparkles>
          </button>
        </div>
        <div class="flex items-center">
          <button
            @click="editorMode = 'template'"
            :class="{ 'bg-neutral-800': editorMode === 'state', 'bg-blue-900': editorMode === 'template' }"
            class="h-[36px] inline-flex items-center justify-center p-2 hover:bg-neutral-600 transition border-r border-neutral-900 rounded-l"
          >
            <i-icon-park-outline-code></i-icon-park-outline-code>
          </button>
          <button
            @click="editorMode = 'state'"
            :class="{ 'bg-neutral-800': editorMode === 'template', 'bg-blue-900': editorMode === 'state' }"
            class="h-[36px] inline-flex items-center justify-center p-2 hover:bg-neutral-600 transition rounded-r"
          >
            <i-icon-park-outline-code-brackets></i-icon-park-outline-code-brackets>
          </button>
        </div>
        <div class="flex items-center">
          <button
            @click="mode = 'horizontal'"
            :class="{ 'bg-neutral-800': mode !== 'horizontal', 'bg-blue-900': mode === 'horizontal' }"
            class="h-[36px] inline-flex items-center justify-center p-2 hover:bg-neutral-600 transition rounded-l"
          >
            <i-icon-park-outline-freeze-column></i-icon-park-outline-freeze-column>
          </button>
          <button
            @click="mode = 'vertical'"
            :class="{ 'bg-neutral-800': mode !== 'vertical', 'bg-blue-900': mode === 'vertical' }"
            class="h-[36px] inline-flex items-center justify-center p-2 hover:bg-neutral-600 transition border-x border-neutral-900"
          >
            <i-icon-park-outline-freeze-column class="transform rotate-90"></i-icon-park-outline-freeze-column>
          </button>
          <button
            @click="mode = 'preview'"
            :class="{ 'bg-neutral-800': mode !== 'preview', 'bg-blue-900': mode === 'preview' }"
            class="h-[36px] inline-flex items-center justify-center p-2 hover:bg-neutral-600 transition border-r border-neutral-900"
          >
            <i-icon-park-outline-eyes></i-icon-park-outline-eyes>
          </button>
          <a
            href="/playground/preview"
            target="_blank"
            class="h-[36px] inline-flex items-center justify-center p-2 hover:bg-neutral-600 transition rounded-r text-lg bg-neutral-800"
          >
            <i-mdi-fullscreen class="text-white"></i-mdi-fullscreen>
          </a>
        </div>
      </div>
    </template>
    <template #content>
      <iframe src="/playground/preview" class="h-full w-full overflow-auto" v-if="mode === 'preview'"></iframe>
      <splitpanes class="w-full h-full overflow-auto" :horizontal="mode === 'vertical'" v-else>
        <pane min-size="20" max-size="80">
          <SenpCodeEditor
            v-if="editorMode === 'template'"
            language="html"
            style="overflow: auto; height: 100%"
            enter-action="default"
            v-model="code"
            :key="codeKey"
            class="overflow-auto rounded-none editor"
          ></SenpCodeEditor>
          <SenpCodeEditor
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
              class="border-neutral-700 bg-neutral-900/50 relative"
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
              <div
                class="px-2 py-1 rounded-full bg-neutral-700 border-2 border-neutral-800 text-sm text-white shadow-xl"
              >
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
import { html_beautify, js_beautify } from 'js-beautify'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

const debounce = (callback: Function, wait: number) => {
  let timeoutId: any = null
  return (...args: any) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args)
    }, wait)
  }
}

const code = ref('')
const codeKey = ref(0)
const codeState = ref('{}')
const previewSize = ref('')
const editorMode = ref<'template' | 'state'>('template')
const mode = ref<'horizontal' | 'vertical' | 'preview' | 'edit'>('horizontal')

const formatTemplate = () => {
  code.value = html_beautify(code.value, {
    indent_size: 2,
    wrap_attributes_indent_size: 2,
    wrap_line_length: 10000,
    wrap_attributes: 'force-expand-multiline',
  })
  codeKey.value++
}

const formatState = () => {
  codeState.value = js_beautify(codeState.value, { indent_size: 2, space_in_empty_paren: true })
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

onMounted(() => {
  code.value = localStorage.getItem('playgroundTemplate') || ''
  codeState.value = localStorage.getItem('playgroundState') || '{}'
  codeKey.value++
  new ResizeObserver(updateSize).observe(document.querySelector('#preview-window') as any)
})
</script>

<style>
.splitpanes {
  @apply bg-neutral-800;
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
  @apply !rounded-none !bg-neutral-800/50;
}
</style>
