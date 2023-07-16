<template>
  <component
    :is="as"
    v-if="type === 'media-top'"
    :class="
      $senpCx(
        'flex flex-col gap-4 px-4 pb-4 rounded-lg bg-gray-900',
        classes?.wrapper
      )
    "
    v-bind="$attrs"
  >
    <slot name="media" />
    <slot />
  </component>
  <component
    :is="as"
    v-else-if="type === 'header'"
    :class="
      $senpCx(
        'flex flex-col gap-4 p-4 rounded-lg bg-gray-900',
        classes?.wrapper
      )
    "
    v-bind="$attrs"
  >
    <slot name="title">
      <p class="text-xl font-medium">
        {{ title }}
      </p>
    </slot>
    <slot />
  </component>
  <component
    :is="as"
    v-else
    :class="
      $senpCx(
        'flex flex-col gap-4 p-4 rounded-lg bg-gray-900',
        classes?.wrapper
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { SenpCx } from "../plugins/senpCx";
withDefaults(
  defineProps<{
    /**
     * component to render the card as
     */
    as?: string;
    /**
     * type of card
     * - header: renders title
     * - basic: renders default slot
     * - media-top: adds a media slot
     */
    type?: "basic" | "header" | "media-top";
    /**
     * title for card with type=header
     */
    title?: string;
    /**
     * style overrides for card
     * - wrapper: outtermost container
     */
    classes?: {
      wrapper?: SenpCx;
    };
  }>(),
  {
    as: "div",
    type: "basic",
  }
);
</script>
../plugins/senpCx
