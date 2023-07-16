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
        @click="() => copy(stringValue ?? '')"
        :class="
          $xClass(
            'group-hover:flex group-hover:opacity-100 opacity-0 hidden w-8 p-1.5 h-8 items-center justify-center text-lg bg-black/40 rounded-lg absolute bottom-2 right-2 text-gray-400 transition duration-500',
            classes?.clipboard
          )
        "
        v-if="clipboard && stringValue"
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
    value: string | object
    theme?: 'nord' | ''
    language: 'javascript' | 'python' | 'vue' | 'vue-html' | 'html' | 'typescript' | 'json' | 'bash' | ''
    clipboard?: boolean
    title?: string
    indent?: number
    classes?: {
      wrapper?: XClass
      pre?: XClass
      code?: XClass
      title?: XClass
      clipboard?: XClass
    }
  }>(),
  {
    theme: 'nord',
    clipboard: true,
    autodetect: false,
    indent: 2,
  }
)

const stringValue = computed(() => {
  if (typeof props.value === 'string') {
    return props.value
  }
  return JSON.stringify(props.value, null, props.indent)
})

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
    tokens: stringValue.value,
    lang: props.language,
    theme: props.theme,
  })
}

const highlightedCode = ref(stringValue.value)
watch(
  () => stringValue.value,
  () => {
    highlightCode()
  },
  { immediate: true }
)

const { copy, copied } = useClipboard({
  legacy: true,
})
</script>
