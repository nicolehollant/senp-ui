<template>
  <section class="flex">
    <template v-for="(option, i) in options">
      <button
        :class="{
          'rounded-l': i === 0,
          'rounded-r': i === options.length - 1,
          'border-r border-black/40': i < options.length - 1,
          ...$senpCx(
            'cursor-pointer px-2 h-8 flex items-center justify-center bg-gray-900 text-gray-400',
            classes?.button,
          ),
        }"
        @click="
          $emit(
            'click',
            typeof option === 'string' ? option : option.value ?? option.label,
            i,
          )
        "
      >
        <slot :name="i" :option="option">
          {{
            typeof option === "string" ? option : option.label ?? option.value
          }}
        </slot>
      </button>
    </template>
  </section>
</template>

<script setup lang="ts">
import type { SenpCx } from "../plugins/senpCx";

defineProps<{
  options: { label?: string; value: any }[] | string[];
  classes?: {
    button?: SenpCx;
  };
}>();

defineEmits<{
  (event: "click", value: any, index: number): void;
}>();
</script>
