<template>
  <div class="w-full h-full rounded-lg bg-gray-800 p-2 font-medium text-gray-50 border border-gray-700 relative">
    <div id="container" class="w-full h-full"></div>
  </div>
</template>

<script setup lang="ts">
// things to look at:
// vue support: https://github.com/Kingwl/monaco-volar
// general usage: https://github.com/microsoft/monaco-editor/blob/main/samples/browser-esm-vite-react/src/userWorker.ts
import { emmetHTML } from 'emmet-monaco-es'
import * as monacoEditor from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
// eslint-disable-next-line import/default
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
// eslint-disable-next-line import/default
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
// eslint-disable-next-line import/default
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'

import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

const props = withDefaults(
  defineProps<{
    modelValue: string
    padding?: number
    scrollbarShadow?: string
  }>(),
  {
    modelValue: '<div>Hello World</div>',
    padding: 0,
    scrollbarShadow: '#00000020',
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

emmetHTML(monacoEditor, ['html', 'php', 'vue'])

onMounted(() => {
  self.MonacoEnvironment = {
    getWorker(_: any, label: string) {
      if (label === 'json') {
        return new JsonWorker()
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return new CssWorker()
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return new HtmlWorker()
      }
      if (label === 'typescript' || label === 'javascript') {
        return new TsWorker()
      }
      return new EditorWorker()
    },
  }
  monacoEditor.languages.typescript.typescriptDefaults.setEagerModelSync(true)

  monacoEditor.editor.defineTheme('myCustomTheme', {
    base: 'vs-dark', // can also be vs-dark or hc-black
    inherit: true, // can also be false to completely replace the builtin rules
    rules: [
      { token: 'comment', foreground: 'ffa500', fontStyle: 'italic underline' },
      { token: 'comment.js', foreground: '008800', fontStyle: 'bold' },
      { token: 'comment.css', foreground: '0000ff' }, // will inherit fontStyle from `comment` above
    ],
    colors: {
      'editor.background': '#00000000',
      'scrollbar.shadow': props.scrollbarShadow,
    },
  })

  const editor = monacoEditor.editor.create(document.getElementById('container')!, {
    value: props.modelValue,
    language: 'html',
    theme: 'myCustomTheme',
    automaticLayout: true,
    fontSize: 16,
    fontLigatures: true,
    minimap: { enabled: false },
    lineDecorationsWidth: props.padding, // Undocumented see https://github.com/Microsoft/vscode/issues/30795#issuecomment-410998882
    padding: {
      bottom: props.padding,
      top: props.padding,
    },
    lineNumbers: 'off',
    glyphMargin: false,
    folding: false,
    lineNumbersMinChars: 0,
    showFoldingControls: 'never',
  })
  editor.onDidChangeModelContent(() => {
    emit('update:modelValue', editor.getValue())
  })
})
</script>
