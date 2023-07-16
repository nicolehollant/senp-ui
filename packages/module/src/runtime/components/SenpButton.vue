<template>
  <component
    :is="buttonIs"
    :class="
      $cx(
        styles.button({
          gap: size,
          size: size,
          intent: intent,
          rounded: rounded,
          truncate: truncate,
          block: block,
          ...(!!square ? { square: size } : { padding: size }),
        }),
        classes?.button
      )
    "
    :disabled="loading || disabled"
    :aria-label="ariaLabel"
    v-bind="$attrs"
    :tabindex="tabindex"
  >
    <slot
      name="leading"
      :disabled="disabled"
      :loading="loading"
    >
      <Icon
        v-if="leading || loading"
        :name="loading ? loadingIcon : leading || ''"
        :class="
          $cx(
            styles.icon({ size }),
            classes?.leading,
            loading ? 'animate-spin' : ''
          )
        "
        aria-hidden="true"
      />
    </slot>

    <slot>
      {{ label }}
    </slot>

    <slot
      name="trailing"
      :disabled="disabled"
      :loading="loading"
    >
      <Icon
        v-if="trailing"
        :name="loading && !leading ? loadingIcon : trailing"
        :class="
          $cx(
            styles.icon({ size }),
            classes?.trailing,
            loading && !leading ? 'animate-spin' : ''
          )
        "
        aria-hidden="true"
      />
    </slot>
  </component>
</template>

<script setup lang="ts">
import { computed, resolveComponent } from "vue";
import { cva } from "class-variance-authority";
import { ClassValue } from "class-variance-authority/dist/types";

const props = withDefaults(
  defineProps<{
    /**
     * makes the button render as a NuxtLink with `to`
     */
    to?: string;
    /**
     * label for button (in place of using default slot)
     */
    label?: string;
    /**
     * aria label
     */
    ariaLabel?: string;
    /**
     * whether or not to truncate the button content
     */
    truncate?: boolean;
    /**
     * render as display block rather than inline-flex, intended to be used when truncate is true
     */
    block?: boolean;
    /**
     * whether or not the button is unable to be pressed
     */
    disabled?: boolean;
    /**
     * gives equal padding on all sides of the button
     */
    square?: boolean;
    /**
     * leading icon, supports any iconify icon
     */
    leading?: string;
    /**
     * trailing icon, supports any iconify icon
     */
    trailing?: string;
    /**
     * loading icon, supports any iconify icon, shows when `loading` is true and has a spin animation applied
     */
    loadingIcon?: string;
    /**
     * whether or not the button is loading, automatically disable the button when loading
     */
    loading?: boolean;
    /**
     * tabindex of button
     */
    tabindex?: string;
    /**
     * button theme
     */
    intent?:
      | "primary"
      | "secondary"
      | "destructive"
      | "outline"
      | "ghost"
      | "link"
      | null
      | undefined;
    /**
     * button size
     */
    size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | undefined | null;
    /**
     * button corner radius
     */
    rounded?: "sm" | "md" | "lg" | "full" | "none" | null | undefined;
    /**
     * button style overrides
     * - button: applies to button
     * - trailing: applies to trailing icon
     * - leading: applies to leading icon
     */
    classes?: {
      button?: ClassValue;
      trailing?: ClassValue;
      leading?: ClassValue;
    };
  }>(),
  {
    intent: "primary",
    size: "md",
    rounded: "md",
    loadingIcon: "mdi:loading",
    tabindex: "0",
  }
);

const buttonIs = computed(() => {
  if (props.to) {
    return resolveComponent("NuxtLink");
  }

  return "button";
});

const styles = {
  button: cva(
    "items-center transition font-semibold focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0",
    {
      variants: {
        block: { false: "inline-flex", true: "block" },
        truncate: {
          false: "w-max",
          true: "truncate text-left break-all line-clamp-1",
        },
        rounded: {
          none: "rounded-none",
          full: "rounded-full",
          sm: "rounded-sm",
          md: "rounded-md",
          lg: "rounded-lg",
        },
        size: {
          "2xs": "text-xs",
          xs: "text-xs",
          sm: "text-sm",
          md: "text-sm",
          lg: "text-sm",
          xl: "text-base",
        },
        gap: {
          "2xs": "gap-1",
          xs: "gap-1.5",
          sm: "gap-1.5",
          md: "gap-2",
          lg: "gap-2.5",
          xl: "gap-2.5",
        },
        padding: {
          "2xs": "px-2 py-1",
          xs: "px-2.5 py-1.5",
          sm: "px-2.5 py-1.5",
          md: "px-3 py-2",
          lg: "px-3.5 py-2.5",
          xl: "px-3.5 py-2.5",
        },
        square: {
          "2xs": "p-1",
          xs: "p-1.5",
          sm: "p-1.5",
          md: "p-2",
          lg: "p-2.5",
          xl: "p-2.5",
        },
        intent: {
          primary:
            "text-white dark:text-gray-900 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500 dark:bg-blue-400 dark:hover:bg-blue-500 dark:disabled:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:focus-visible:outline-blue-400",
          secondary:
            "text-gray-600 dark:text-gray-300 bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-900 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400",
          destructive:
            "text-white dark:text-gray-900 bg-red-500 hover:bg-red-600 disabled:bg-red-500 dark:bg-red-400 dark:hover:bg-red-500 dark:disabled:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 dark:focus-visible:outline-red-400",
          outline:
            "ring-1 ring-inset ring-current text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400",
          ghost:
            "text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400",
          link: "text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400",
        },
      },
    }
  ),
  icon: cva("flex-shrink-0", {
    variants: {
      size: {
        "2xs": "h-4 w-4",
        xs: "h-4 w-4",
        sm: "h-5 w-5",
        md: "h-5 w-5",
        lg: "h-5 w-5",
        xl: "h-6 w-6",
      },
    },
  }),
};
</script>
