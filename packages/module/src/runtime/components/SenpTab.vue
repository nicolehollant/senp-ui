<template>
  <div
    v-if="chips"
    :class="
      $senpCx('flex flex-wrap gap-2 sticky top-0', classes?.optionsWrapper)
    "
  >
    <button
      v-for="option in options"
      :key="option + ''"
      class=""
      :class="{
        '!text-blue-300 !border-blue-700 bg-blue-700/30': active === option,
        ...$senpCx(
          'px-2.5 py-1 h-max leading-none font-medium border-2 border-gray-700 rounded-full text-gray-400 hover:text-blue-500 transition',
          classes?.options
        ),
      }"
      @click="
        () => {
          active = option;
          $emit('update:modelValue', option);
        }
      "
    >
      {{ (option + "").split("_").join(" ") }}
    </button>
  </div>
  <div
    v-else
    :class="$senpCx('flex sticky top-0', classes?.optionsWrapper)"
  >
    <button
      v-for="option in options"
      :key="option + ''"
      :class="{
        '!text-blue-400 !border-blue-400': active === option,
        ...$senpCx(
          'pb-1 px-3 font-semibold border-b-2 border-gray-400/20 text-gray-400 hover:text-blue-500 transition',
          classes?.options
        ),
      }"
      @click="
        () => {
          active = option;
          $emit('update:modelValue', option);
        }
      "
    >
      {{ (option + "").split("_").join(" ") }}
    </button>
  </div>
  <slot :active="active" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { SenpCx } from "../plugins/senpCx";

const props = defineProps<{
  modelValue?: any;
  options: any[];
  chips?: boolean;
  classes?: {
    options?: SenpCx;
    optionsWrapper?: SenpCx;
  };
}>();

defineEmits<{
  (event: "update:modelValue", value: any): void;
}>();
const active = ref(props.modelValue ?? props.options[0]);
</script>
../plugins/senpCx
