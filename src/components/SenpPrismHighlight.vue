<template>
  <div :class="{ ...$xClass('relative w-full group rounded-lg', classes?.wrapper), [theme]: true }">
    <pre
      :class="$xClass('!m-0 overflow-hidden w-full !p-0 grid rounded-lg', classes?.pre)"
    ><code ref="codeRef" :class="{ ...$xClass('!text-xs !bg-transparent !p-3 overflow-auto', classes?.code), [`language-${language}`]: true}"><slot>{{ value }}</slot></code></pre>
    <slot name="title">
      <p
        :class="
          $xClass(
            'w-max p-1.5 text-xs bg-black/40 rounded-lg absolute top-2 right-2 font-medium text-neutral-400',
            classes?.title
          )
        "
        v-if="title"
      >
        {{ title }}
      </p>
    </slot>
    <slot name="clipboard">
      <button
        @click="() => copy(value ?? '')"
        :class="
          $xClass(
            'group-hover:flex group-hover:opacity-100 opacity-0 hidden w-8 p-1.5 h-8 items-center justify-center text-lg bg-black/40 rounded-lg absolute bottom-2 right-2 text-neutral-400 transition duration-500',
            classes?.clipboard
          )
        "
        v-if="clipboard && value"
      >
        <Icon v-if="copied" name="mdi:clipboard-check-outline" />
        <Icon v-else name="mdi:clipboard-outline" />
      </button>
    </slot>
  </div>
</template>

<script setup lang="ts">
import '../assets/css/prism-defaults.css'
import * as Prism from 'prismjs'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-cshtml'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-latex'
import 'prismjs/components/prism-sql'
import { XClass } from '../plugins/xClass'
import { useClipboard } from '@vueuse/core'

const codeRef = ref<HTMLElement | null>(null)

const props = withDefaults(
  defineProps<{
    value?: string
    theme?: 'atom-dark' | 'gh-light' | 'vsc-dark' | ''
    language: 'json' | 'typescript' | 'javascript' | 'python' | 'html' | 'c' | 'bash' | 'latex' | 'sql'
    clipboard?: boolean
    title?: string
    classes?: {
      wrapper?: XClass
      pre?: XClass
      code?: XClass
      title?: XClass
      clipboard?: XClass
    }
  }>(),
  {
    theme: '',
    clipboard: true,
  }
)

const highlight = () => {
  nextTick(() => {
    setTimeout(() => {
      if (codeRef.value) {
        Prism?.highlightElement?.(codeRef.value)
      } else {
        Prism.highlightAll()
      }
    }, 500)
  })
}

watch(
  () => props.value,
  () => {
    highlight()
  },
  { deep: true }
)

const { text, copy, copied, isSupported } = useClipboard({
  legacy: true,
})

onMounted(() => {
  highlight()
})
</script>
