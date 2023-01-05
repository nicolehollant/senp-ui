<template>
  <HeadlessRadioGroup v-bind="$attrs" class="flex">
    <template v-for="(option, i) in options">
      <HeadlessRadioGroupOption v-slot="{ checked }" :value="typeof option === 'string' ? option : option.value">
        <span
          class="cursor-pointer px-2 h-8 flex items-center justify-center bg-neutral-900"
          :class="{
            'text-blue-400': checked,
            'text-neutral-400': !checked,
            'rounded-l': i === 0,
            'rounded-r': i === options.length - 1,
            'border-r border-black/40': i < options.length - 1,
          }"
        >
          <slot>{{ typeof option === 'string' ? option : option.label ?? option.value }}</slot>
        </span>
      </HeadlessRadioGroupOption>
    </template>
  </HeadlessRadioGroup>
</template>

<script setup lang="ts">
defineProps<{
  options: { label?: string; value: string }[] | string[]
}>()
</script>
