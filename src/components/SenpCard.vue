<template>
  <component
    v-if="type === 'media-top'"
    :is="as"
    :class="$xClass('flex flex-col gap-4 px-4 pb-4 rounded-lg bg-gray-900', classes?.wrapper)"
    v-bind="$attrs"
  >
    <slot name="media"></slot>
    <slot></slot>
  </component>
  <component
    v-else-if="type === 'header'"
    :is="as"
    :class="$xClass('flex flex-col gap-4 p-4 rounded-lg bg-gray-900', classes?.wrapper)"
    v-bind="$attrs"
  >
    <slot name="title">
      <p class="text-xl font-medium">{{ title }}</p>
    </slot>
    <slot></slot>
  </component>
  <component
    v-else
    :is="as"
    :class="$xClass('flex flex-col gap-4 p-4 rounded-lg bg-gray-900', classes?.wrapper)"
    v-bind="$attrs"
    ><slot></slot
  ></component>
</template>

<script setup lang="ts">
import { XClass } from '../plugins/xClass'
withDefaults(
  defineProps<{
    /**
     * component to render the card as
     */
    as?: string
    /**
     * type of card
     * - header: renders title
     * - basic: renders default slot
     * - media-top: adds a media slot
     */
    type?: 'basic' | 'header' | 'media-top'
    /**
     * title for card with type=header
     */
    title?: string
    /**
     * style overrides for card
     * - wrapper: outtermost container
     */
    classes?: {
      wrapper?: XClass
    }
  }>(),
  {
    as: 'div',
    type: 'basic',
  }
)
</script>
