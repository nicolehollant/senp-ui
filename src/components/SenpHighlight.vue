<template>
  <div :class="{ ...$xClass('relative w-full group rounded-lg', classes?.wrapper), [theme]: true }">
    <pre
      :class="$xClass('!m-0 overflow-hidden w-full !p-0 grid rounded-lg', classes?.pre)"
    ><code  :class="{ ...$xClass('!text-xs !bg-transparent !p-3 overflow-auto', classes?.code), [className]: true}" v-html="highlightedCode"></code></pre>
    <slot name="title">
      <p
        :class="
          $xClass(
            'w-max p-1.5 text-xs bg-black/40 rounded-lg absolute top-2 right-2 font-medium text-gray-400',
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
            'group-hover:flex group-hover:opacity-100 opacity-0 hidden w-8 p-1.5 h-8 items-center justify-center text-lg bg-black/40 rounded-lg absolute bottom-2 right-2 text-gray-400 transition duration-500',
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
import { XClass } from '../plugins/xClass'
import { useClipboard } from '@vueuse/core'

const { $shiki } = useNuxtApp()

const props = withDefaults(
  defineProps<{
    value: string
    theme?: 'nord' | ''
    language: 'json' | 'typescript' | 'javascript' | 'js' | 'python' | 'html' | 'c' | 'bash' | 'latex' | 'sql' | ''
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
    autodetect: false,
  }
)

const language = ref<string>(props.language)
watch(
  () => props.language,
  (newLanguage) => {
    language.value = newLanguage
  }
)

const className = computed((): string => {
  return `shiki ${props.theme} ${language.value}`
})

const highlightCode = async () => {
  highlightedCode.value = await $shiki.renderCustom({
    tokens: props.value,
    lang: props.language,
    theme: props.theme,
  })
}

const highlightedCode = ref(props.value)
watch(
  () => props.value,
  () => {
    highlightCode()
  },
  { immediate: true }
)

const { copy, copied } = useClipboard({
  legacy: true,
})
</script>
