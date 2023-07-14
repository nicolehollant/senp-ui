<template>
  <Codemirror
    :model-value="modelValue"
    @update:model-value="(v) => $emit('update:modelValue', v)"
    :placeholder="($attrs.placeholder as any) || ''"
    :style="{ height: 'auto' }"
    :autofocus="autofocus"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="_extensions"
    :disabled="disabled"
    @ready="handleReady"
  ></Codemirror>
</template>

<script setup lang="ts">
import { expandAbbreviation, abbreviationTracker } from '@emmetio/codemirror6-plugin'
import { oneDark } from '@codemirror/theme-one-dark'
import { basicSetup } from 'codemirror'
import { Codemirror } from 'vue-codemirror'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { html } from '@codemirror/lang-html'
import { json } from '@codemirror/lang-json'
import { languages } from '@codemirror/language-data'
import { keymap, KeyBinding, EditorView } from '@codemirror/view'
import { Extension, Prec } from '@codemirror/state'
import { EditorSelection, StateCommand, Text, Transaction } from '@codemirror/state'
import { tags as t } from '@lezer/highlight'
import { defaultHighlightStyle, HighlightStyle, syntaxHighlighting } from '@codemirror/language'

const props = withDefaults(
  defineProps<{
    /**
     * v-model capable
     */
    modelValue: string
    /**
     * action that happens when hitting the "enter" key
     * - submit: emit "submit" (must use shift+enter for new lines)
     * - default: add a new line
     */
    enterAction: 'submit' | 'default'
    /**
     * language of editor
     */
    language: keyof typeof languageMap
    /**
     * code mirror extensions
     */
    extensions?: Extension[]
    /**
     * code editor theme
     */
    theme?: 'default' | 'onedark'
    /**
     * whether or not the editor is disabled
     */
    disabled?: boolean
    /**
     * whether or not the editor is focused automatically
     */
    autofocus?: boolean
  }>(),
  {
    modelValue: '',
    theme: 'default',
    enterAction: 'default',
    language: 'markdown',
    extensions: () => [],
    disabled: false,
    autofocus: false,
  }
)

const emit = defineEmits<{
  (event: 'submit', value: string): void
  (event: 'update:modelValue', value: string): void
}>()

const TextWrappingFactory = (token: string) => {
  const res: StateCommand = ({ state, dispatch }) => {
    const changes = state.changeByRange((range) => {
      return {
        changes: [
          {
            from: range.from,
            insert: Text.of([token]),
          },
          {
            from: range.to,
            insert: Text.of([token]),
          },
        ],
        range: EditorSelection.range(range.from + token.length, range.to + token.length),
      }
    })

    dispatch(
      state.update(changes, {
        scrollIntoView: true,
        annotations: Transaction.userEvent.of('input'),
      })
    )

    return true
  }
  return res
}

const keyDownExt = EditorView.domEventHandlers({
  keydown: (e) => {
    if (e.key === 'Enter' && !e.shiftKey && props.enterAction === 'submit') {
      e.preventDefault()
      emit('submit', props.modelValue)
      emit('update:modelValue', '')
      return true
    }
  },
})

const customKeyMap: KeyBinding[] = [
  {
    key: 'Mod-b',
    run: TextWrappingFactory('**'),
  },
  {
    key: 'Mod-i',
    run: TextWrappingFactory('_'),
  },
  {
    key: 'Mod-m',
    run: TextWrappingFactory('`'),
  },
]

const markdownHighlighting = HighlightStyle.define([
  { tag: t.string, class: 'text-base' },
  { tag: t.heading1, class: 'text-[1.65em] text-pink-200' },
  { tag: t.heading2, class: 'text-[1.4em] text-rose-200' },
  { tag: t.heading3, class: 'text-[1.25em] text-pink-100' },
  { tag: t.heading4, class: 'text-[1.125em] text-rose-100 font-semibold' },
  { tag: t.comment, class: 'italic text-gray-400' },
  { tag: t.emphasis, class: 'italic text-lime-200' },
  { tag: t.strong, class: 'font-semibold text-cyan-300' },
])

const languageMap = {
  markdown: [
    Prec.high(
      markdown({
        base: markdownLanguage,
        codeLanguages: languages,
        addKeymap: true,
      })
    ),
    Prec.high(syntaxHighlighting(markdownHighlighting)),
  ],
  html: [
    Prec.high(
      html({
        autoCloseTags: true,
        matchClosingTags: true,
        selfClosingTags: true,
      })
    ),
    keymap.of([
      {
        key: 'Mod-e',
        run: expandAbbreviation,
      },
      {
        key: 'Tab',
        run: expandAbbreviation,
      },
    ]),
    abbreviationTracker(),
  ],
  json: [Prec.high(json())],
}

const _extensions = computed(() => {
  const result = [
    basicSetup,
    Prec.high(keyDownExt),
    Prec.high(keymap.of(customKeyMap)),
    ...languageMap[props.language],
    EditorView.lineWrapping,
    syntaxHighlighting(defaultHighlightStyle),
    ...(props.extensions || []).map((a) => Prec.highest(a)),
  ]
  if (props.theme === 'onedark') {
    result.push(Prec.highest(oneDark))
  }
  return result
})
const view = shallowRef()
const handleReady = (payload: any) => {
  view.value = payload.view
}
</script>

<style>
.cm-gutters {
  display: none !important;
}
.cm-editor {
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid theme('colors.gray.700');
}
.cm-scroller {
  font-family: Inter !important;
}
.cm-activeLine {
  background-color: transparent !important;
}

.cm-focused .cm-nonmatchingBracket,
.cm-focused .cm-matchingBracket {
  background-color: transparent !important;
  outline: none !important;
}
.cm-focused .cm-nonmatchingBracket .ͼu,
.cm-focused .cm-matchingBracket .ͼu {
  background-color: #19a7ee50 !important;
  outline: none !important;
}
</style>
