<template>
  <label :class="$senpCx('grid gap-1', classes?.wrapper)">
    <div
      :class="
        $senpCx(
          labelSide === 'top' ? 'grid gap-1' : 'flex items-center gap-2',
          classes?.labelWrapper,
        )
      "
    >
      <template v-if="labelSide !== 'right'">
        <slot name="label">
          <p
            v-if="label"
            :class="$senpCx('text-sm text-gray-50', classes?.label)"
          >
            {{ label }}
          </p>
        </slot>
      </template>
      <HeadlessSwitch
        :model-value="modelValue"
        :class="{
          ...(modelValue
            ? $senpCx('!bg-blue-600', classes?.inputActive)
            : $senpCx('!bg-gray-800', classes?.inputInactive)),
          ...$senpCx(
            'rounded-lg  flex items-center justify-center border border-gray-700 ' +
              (size === 'input'
                ? 'w-[42px] h-[42px] text-2xl'
                : 'w-8 h-8 text-lg'),
            classes?.input,
          ),
        }"
        @update:modelValue="(v) => $emit('update:modelValue', v)"
      >
        <Icon v-if="modelValue" name="mdi:check" />
      </HeadlessSwitch>
      <template v-if="labelSide === 'right'">
        <slot name="label">
          <p
            v-if="label"
            :class="$senpCx('text-sm text-gray-50', classes?.label)"
          >
            {{ label }}
          </p>
        </slot>
      </template>
    </div>
    <slot name="hint">
      <p
        v-if="hint"
        :class="$senpCx('text-xs italic text-gray-300', classes?.hint)"
      >
        {{ hint }}
      </p>
    </slot>
    <slot name="error">
      <p v-if="error" :class="$senpCx('text-sm text-red-300', classes?.error)">
        {{ error }}
      </p>
    </slot>
  </label>
</template>

<script setup lang="ts">
import type { SenpCx } from "../plugins/senpCx";

defineEmits<{
  (event: "update:modelValue", newValue: boolean): void;
}>();
withDefaults(
  defineProps<{
    /**
     * size of chackbox
     * - base: default size
     * - input: match size of TextInput
     */
    size?: "base" | "input";
    /**
     * v-model
     */
    modelValue: boolean;
    /**
     * label for checkbox
     */
    label?: string;
    /**
     * position of label
     */
    labelSide?: "top" | "left" | "right";
    /**
     * hint for checkbox
     */
    hint?: string;
    /**
     * error string for checkbox
     */
    error?: string;
    /**
     * style overrides for checkbox
     */
    classes?: {
      wrapper?: SenpCx;
      label?: SenpCx;
      labelWrapper?: SenpCx;
      input?: SenpCx;
      inputActive?: SenpCx;
      inputInactive?: SenpCx;
      hint?: SenpCx;
      error?: SenpCx;
    };
  }>(),
  {
    labelSide: "top",
    size: "base",
  },
);
</script>
