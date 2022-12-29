<template>
  <button
    v-bind="$attrs"
    class="inline-flex w-max items-center gap-2 rounded-lg bg-blue-700 p-2 font-semibold transition hover:bg-blue-800"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { XClass } from '../plugins/xClass'

defineProps<{
  disabled?: boolean
  classes?: {
    button: XClass
  }
}>()
</script>
