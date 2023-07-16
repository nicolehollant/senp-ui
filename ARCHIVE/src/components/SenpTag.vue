<template>
  <component
    :is="as"
    :class="
      $xClass(
        [
          'max-w-max font-medium w-full flex items-center text-xs gap-2 px-2 py-1 rounded',
          {
            primary: 'bg-blue-800 hover:bg-blue-700',
            neutral: 'bg-gray-800 hover:bg-gray-700',
            error: 'bg-red-800 hover:bg-red-700',
            success: 'bg-green-800 hover:bg-green-700',
          }[theme],
        ].join(' '),
        classes?.tag
      )
    "
    v-bind="$attrs"
    ><slot></slot
  ></component>
</template>

<script setup lang="ts">
import { XClass } from '../plugins/xClass'
withDefaults(
  defineProps<{
    /**
     * component to render the tag as
     */
    as?: string
    /**
     * theme of the tag
     */
    theme?: 'primary' | 'success' | 'neutral' | 'error'
    /**
     * style overrides for the tag
     * - tag: outtermost element
     */
    classes?: {
      tag?: XClass
    }
  }>(),
  {
    as: 'div',
    theme: 'neutral',
  }
)
</script>
