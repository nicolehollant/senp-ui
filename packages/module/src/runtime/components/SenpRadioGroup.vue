<template>
  <HeadlessRadioGroup v-bind="$attrs" class="flex">
    <template v-for="(option, i) in options">
      <HeadlessRadioGroupOption
        v-slot="{ checked }"
        :value="typeof option === 'string' ? option : option.value"
      >
        <span
          :class="{
            ...$senpCx(
              'cursor-pointer px-2 h-8 flex items-center justify-center bg-gray-900',
              classes?.option,
            ),
            'text-blue-400': checked,
            'text-gray-400': !checked,
            'rounded-l': i === 0,
            'rounded-r': i === options.length - 1,
            'border-r border-black/40': i < options.length - 1,
          }"
        >
          <slot :name="i" :option="option" :checked="checked">{{
            typeof option === "string" ? option : option.label ?? option.value
          }}</slot>
        </span>
      </HeadlessRadioGroupOption>
    </template>
  </HeadlessRadioGroup>
</template>

<script setup lang="ts">
import type { SenpCx } from "../plugins/senpCx";

defineProps<{
  options: { label?: string; value: string }[] | string[];
  classes?: {
    option?: SenpCx;
  };
}>();
</script>
