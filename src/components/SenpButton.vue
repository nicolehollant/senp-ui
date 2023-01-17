<template>
  <button
    v-bind="$attrs"
    :class="
      $xClass(
        [
          'inline-flex w-max items-center gap-2 rounded-lg p-2 font-semibold transition',
          {
            primary: 'bg-blue-700 hover:bg-blue-800',
            secondary: 'bg-neutral-700 hover:bg-neutral-800',
            tertiary: 'text-blue-300 hover:text-blue-400',
          }[theme],
        ].join(' '),
        classes?.button
      )
    "
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { XClass } from '../plugins/xClass'

withDefaults(
  defineProps<{
    theme?: 'primary' | 'secondary' | 'tertiary'
    classes?: {
      button: XClass
    }
  }>(),
  {
    theme: 'primary',
  }
)
</script>
