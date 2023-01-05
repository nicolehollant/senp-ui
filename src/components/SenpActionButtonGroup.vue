<template>
  <section class="flex">
    <template v-for="(option, i) in options">
      <button
        @click="$emit('click', typeof option === 'string' ? option : option.value ?? option.label, i)"
        class="cursor-pointer px-2 h-8 flex items-center justify-center bg-neutral-900 text-neutral-400"
        :class="{
          'rounded-l': i === 0,
          'rounded-r': i === options.length - 1,
          'border-r border-black/40': i < options.length - 1,
        }"
      >
        <slot :name="i" :option="option">{{ typeof option === 'string' ? option : option.label ?? option.value }}</slot>
      </button>
    </template>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  options: { label?: string; value: any }[] | string[]
}>()

defineEmits<{
  (event: 'click', value: any, index: number): void
}>()
</script>
