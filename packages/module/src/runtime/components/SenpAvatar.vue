<template>
  <div :class="$cx(styles.wrapper(), classes?.wrapper)">
    <img
      v-if="(src || avatarSrc) && !didError"
      :src="(src || avatarSrc) + ''"
      :alt="alt ?? 'Avatar'"
      :class="$cx(styles.avatar({ size, rounded }), classes?.avatar)"
      @error="didError = true"
    />
    <span
      v-else-if="initials"
      :class="
        $cx(
          'text-xs font-medium leading-none text-gray-900 dark:text-white truncate',
          styles.avatar({
            size,
            rounded,
            class: 'flex items-center justify-center',
          }),
          classes?.avatar,
        )
      "
    >
      {{ initials }}
    </span>
    <div
      v-else
      class="p-2"
      :class="
        $cx(
          styles.avatar({
            size,
            rounded,
            class: 'flex items-center justify-center',
          }),
          classes?.avatar,
        )
      "
    >
      <Icon name="mdi:account" class="w-full h-full" />
    </div>
    <span
      v-if="chipColor"
      :class="
        $cx(
          styles.chip({ color: chipColor, position: chipPosition, size }),
          classes?.chip,
        )
      "
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { cva } from "class-variance-authority";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";
import { ClassValue } from "class-variance-authority/dist/types";

const styles = {
  wrapper: cva("relative inline-flex items-center justify-center"),
  avatar: cva("bg-gray-100 dark:bg-gray-800 object-cover", {
    variants: {
      size: {
        "3xs": "h-4 w-4 text-xs",
        "2xs": "h-5 w-5 text-xs",
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-sm",
        md: "h-10 w-10 text-md",
        lg: "h-12 w-12 text-lg",
        xl: "h-14 w-14 text-xl",
        "2xl": "h-16 w-16 text-2xl",
        "3xl": "h-20 w-20 text-3xl",
      },
      rounded: {
        full: "rounded-full",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        none: "rounded-none",
      },
    },
  }),
  chip: cva(
    "absolute block rounded-full ring-1 ring-white dark:ring-gray-900",
    {
      variants: {
        position: {
          "top-right": "top-0 right-0",
          "bottom-right": "bottom-0 right-0",
          "top-left": "top-0 left-0",
          "bottom-left": "bottom-0 left-0",
        },
        size: {
          "3xs": "h-1 w-1",
          "2xs": "h-1 w-1",
          xs: "h-1.5 w-1.5",
          sm: "h-2 w-2",
          md: "h-2.5 w-2.5",
          lg: "h-3 w-3",
          xl: "h-3.5 w-3.5",
          "2xl": "h-3.5 w-3.5",
          "3xl": "h-4 w-4",
        },
        color: {
          slate: "bg-slate-500 dark:bg-slate-400",
          gray: "bg-gray-500 dark:bg-gray-400",
          zinc: "bg-zinc-500 dark:bg-zinc-400",
          neutral: "bg-neutral-500 dark:bg-neutral-400",
          stone: "bg-stone-500 dark:bg-stone-400",
          red: "bg-red-500 dark:bg-red-400",
          orange: "bg-orange-500 dark:bg-orange-400",
          amber: "bg-amber-500 dark:bg-amber-400",
          yellow: "bg-yellow-500 dark:bg-yellow-400",
          lime: "bg-lime-500 dark:bg-lime-400",
          green: "bg-green-500 dark:bg-green-400",
          emerald: "bg-emerald-500 dark:bg-emerald-400",
          teal: "bg-teal-500 dark:bg-teal-400",
          cyan: "bg-cyan-500 dark:bg-cyan-400",
          sky: "bg-sky-500 dark:bg-sky-400",
          blue: "bg-blue-500 dark:bg-blue-400",
          indigo: "bg-indigo-500 dark:bg-indigo-400",
          violet: "bg-violet-500 dark:bg-violet-400",
          purple: "bg-purple-500 dark:bg-purple-400",
          fuchsia: "bg-fuchsia-500 dark:bg-fuchsia-400",
          pink: "bg-pink-500 dark:bg-pink-400",
          rose: "bg-rose-500 dark:bg-rose-400",
        },
      },
    },
  ),
};

const props = withDefaults(
  defineProps<{
    /**
     * provide a seed for a procedurally generated avatar, you may pass a user ID or something unique
     */
    seed?: string;
    /**
     * provide an image uri to render
     */
    src?: string;
    /**
     * alt text for the avatar, used as a fallback if there is no src or seed
     */
    alt?: string;
    /**
     * border radius of avatar
     */
    rounded?: "sm" | "md" | "lg" | "full" | "none" | null | undefined;
    /**
     * size of avatar
     */
    size?:
      | "3xs"
      | "2xs"
      | "xs"
      | "sm"
      | "md"
      | "lg"
      | "xl"
      | "2xl"
      | "3xl"
      | null
      | undefined;
    /**
     * color of the chip indicator
     */
    chipColor?:
      | "slate"
      | "gray"
      | "zinc"
      | "neutral"
      | "stone"
      | "red"
      | "orange"
      | "amber"
      | "yellow"
      | "lime"
      | "green"
      | "emerald"
      | "teal"
      | "cyan"
      | "sky"
      | "blue"
      | "indigo"
      | "violet"
      | "purple"
      | "fuchsia"
      | "pink"
      | "rose"
      | null
      | undefined;
    /**
     * position of the chip indicator
     */
    chipPosition?:
      | "top-right"
      | "bottom-right"
      | "top-left"
      | "bottom-left"
      | null
      | undefined;
    /**
     * style overrides for the avatar
     * - avatar: applies to image
     * - wrapper: applies to wrapper component
     * - chip: applies to chip indicator
     */
    classes?: {
      avatar?: ClassValue;
      wrapper?: ClassValue;
      chip?: ClassValue;
    };
  }>(),
  {
    size: "md",
    chipPosition: "top-right",
    rounded: "full",
  },
);

const didError = ref(false);

const initials = computed(() => {
  if (!props.alt) {
    return null;
  }
  const result = props.alt
    .split(/\s+/)
    .map((a) => a.charAt(0))
    .slice(0, 2)
    .join("")
    .trim();
  if (result.length > 0) {
    return result;
  }
  return null;
});

const avatarSrc = computed(() => {
  if (!props.seed) {
    return null;
  }
  const avatar = createAvatar(thumbs, {
    size: 128,
    seed: props.seed,
  }).toDataUriSync();
  return avatar;
});
</script>
