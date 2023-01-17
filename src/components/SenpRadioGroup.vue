<template>
  <HeadlessRadioGroup v-bind="$attrs" class="flex">
    <template v-for="(option, i) in options">
      <HeadlessRadioGroupOption v-slot="{ checked }" :value="typeof option === 'string' ? option : option.value">
        <span
          :class="{
            ...$xClass('cursor-pointer px-2 h-8 flex items-center justify-center bg-neutral-900', classes?.option),
            'text-blue-400': checked,
            'text-neutral-400': !checked,
            'rounded-l': i === 0,
            'rounded-r': i === options.length - 1,
            'border-r border-black/40': i < options.length - 1,
          }"
        >
          <slot :name="i" :option="option" :checked="checked">{{
            typeof option === 'string' ? option : option.label ?? option.value
          }}</slot>
        </span>
      </HeadlessRadioGroupOption>
    </template>
  </HeadlessRadioGroup>
</template>

<script setup lang="ts">
import { XClass } from '../plugins/xClass'

defineProps<{
  options: { label?: string; value: string }[] | string[]
  classes?: {
    option?: XClass
  }
}>()
</script>
