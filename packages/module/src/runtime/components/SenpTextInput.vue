<template>
  <label :class="$senpCx('grid gap-1', classes?.wrapper)">
    <slot name="label">
      <p
        v-if="label"
        :class="$senpCx('text-sm text-gray-50', classes?.label)"
      >
        {{ label }}
      </p>
    </slot>
    <input
      :type="type ?? 'text'"
      :class="
        $senpCx(
          [
            'w-full rounded-lg bg-gray-800 p-2 font-medium text-gray-50 border',
            error ? 'border-red-700' : 'border-gray-700',
          ].join(' '),
          classes?.input
        )
      "
      v-bind="$attrs"
      :value="modelValue"
      @input="e => $emit('update:modelValue', (e as any).target.value)"
    >
    <slot name="hint">
      <p
        v-if="hint"
        :class="$senpCx('text-xs italic text-gray-300', classes?.hint)"
      >
        {{ hint }}
      </p>
    </slot>
    <slot name="error">
      <p
        v-if="error"
        :class="$senpCx('text-sm text-red-300', classes?.error)"
      >
        {{ error }}
      </p>
    </slot>
  </label>
</template>

<script setup lang="ts">
import { SenpCx } from "../plugins/senpCx";

defineEmits<{
  (event: "update:modelValue", newValue: string): void;
}>();
defineProps<{
  modelValue: string;
  label?: string;
  hint?: string;
  error?: string;
  type?: string;
  classes?: {
    wrapper?: SenpCx;
    label?: SenpCx;
    input?: SenpCx;
    hint?: SenpCx;
    error?: SenpCx;
  };
}>();
</script>
../plugins/senpCx
