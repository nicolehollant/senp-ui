<template>
  <section class="flex">
    <template v-for="(option, i) in options">
      <button
        @click="$emit('click', typeof option === 'string' ? option : option.value ?? option.label, i)"
        :class="{
          'rounded-l': i === 0,
          'rounded-r': i === options.length - 1,
          'border-r border-black/40': i < options.length - 1,
          ...$xClass(
            'cursor-pointer px-2 h-8 flex items-center justify-center bg-gray-900 text-gray-400',
            classes?.button
          ),
        }"
      >
        <slot :name="i" :option="option">{{ typeof option === 'string' ? option : option.label ?? option.value }}</slot>
      </button>
    </template>
  </section>
</template>

<script setup lang="ts">
import { XClass } from '../plugins/xClass'

defineProps<{
  options: { label?: string; value: any }[] | string[]
  classes?: {
    button?: XClass
  }
}>()

defineEmits<{
  (event: 'click', value: any, index: number): void
}>()
</script>
