<template>
  <label :class="$xClass('grid gap-1', classes?.wrapper)">
    <slot name="label">
      <p :class="$xClass('text-sm text-neutral-50', classes?.label)" v-if="label">{{ label }}</p>
    </slot>
    <input
      type="text"
      :class="
        $xClass(
          [
            'w-full rounded-lg bg-neutral-800 p-2 font-medium text-neutral-50 border',
            error ? 'border-red-700' : 'border-neutral-700',
          ].join(' '),
          classes?.input
        )
      "
      :value="modelValue"
      @input="e => $emit('update:modelValue', (e as any).target.value)"
    />
    <slot name="hint">
      <p :class="$xClass('text-xs italic text-neutral-300', classes?.hint)" v-if="hint">{{ hint }}</p>
    </slot>
    <slot name="error">
      <p :class="$xClass('text-sm text-red-300', classes?.error)" v-if="error">{{ error }}</p>
    </slot>
  </label>
</template>

<script setup lang="ts">
import { XClass } from '../plugins/xClass'

defineEmits<{
  (event: 'update:modelValue', newValue: string): void
}>()
defineProps<{
  modelValue: string
  label?: string
  hint?: string
  error?: string
  classes?: {
    wrapper?: XClass
    label?: XClass
    input?: XClass
    hint?: XClass
    error?: XClass
  }
}>()
</script>
