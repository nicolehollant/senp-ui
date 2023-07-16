<template>
  <HeadlessTransitionRoot
    appear
    :show="open"
    as="template"
  >
    <HeadlessDialog
      as="div"
      class="relative z-50"
      @close="$emit('update:open', false)"
    >
      <HeadlessTransitionChild
        as="template"
        enter="duration-200 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[1px]" />
      </HeadlessTransitionChild>

      <div class="fixed inset-0 overflow-hidden h-screen">
        <div
          class="flex text-left overflow-hidden"
          :class="{
            'h-screen items-center justify-end': side === 'right',
            'h-screen items-center justify-start': side === 'left',
            'h-screen items-end justify-center': side === 'bottom',
            'h-screen items-start justify-center': side === 'top',
          }"
        >
          <HeadlessTransitionChild
            as="template"
            enter="duration-100 ease-out"
            :enter-from="
              {
                left: '-translate-x-full',
                right: 'translate-x-full',
                top: '-translate-y-full',
                bottom: 'translate-y-full',
              }[side]
            "
            :enter-to="
              {
                left: 'translate-x-0',
                right: 'translate-x-0',
                top: 'translate-y-0',
                bottom: 'translate-y-0',
              }[side]
            "
            leave="duration-100 ease-in"
            :leave-from="
              {
                left: 'translate-x-0',
                right: 'translate-x-0',
                top: 'translate-y-0',
                bottom: 'translate-y-0',
              }[side]
            "
            :leave-to="
              {
                left: '-translate-x-full',
                right: 'translate-x-full',
                top: '-translate-y-full',
                bottom: 'translate-y-full',
              }[side]
            "
          >
            <HeadlessDialogPanel
              class="relative flex overflow-auto transform flex-col gap-6 bg-gray-800 text-left align-middle shadow-xl transition-all"
              :class="
                $senpCx(
                  side === 'left' || side === 'right'
                    ? 'w-full max-h-full max-w-[90vw] lg:max-w-4xl xl:max-w-6xl' +
                      (fitContent ? ' h-auto' : ' h-full')
                    : 'w-full max-h-[80vh]',
                  classes?.maxSize
                )
              "
            >
              <slot name="title">
                <div
                  v-if="title"
                  class="flex items-center justify-between sticky top-0 bg-gray-800/50 backdrop-blur shadow p-6 text-lg leading-6"
                >
                  <HeadlessDialogTitle
                    as="h3"
                    class="font-medium"
                  >
                    {{ title }}
                  </HeadlessDialogTitle>
                  <button
                    class="hover:text-orange-400"
                    @click="$emit('update:open', false)"
                  >
                    <Icon name="mdi:close" />
                  </button>
                </div>
              </slot>
              <div class="px-6 pb-6 h-full">
                <slot />
              </div>
              <div v-if="!title">
                <slot name="close">
                  <button
                    class="absolute top-6 right-6 z-50 hover:text-orange-400"
                    @click="$emit('update:open', false)"
                  >
                    <Icon name="mdi:close" />
                  </button>
                </slot>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
import { SenpCx } from "../plugins/senpCx";

withDefaults(
  defineProps<{
    open: boolean;
    title?: string;
    side?: "left" | "right" | "bottom" | "top";
    fitContent?: boolean;
    classes?: {
      maxSize: SenpCx;
    };
  }>(),
  {
    fitContent: false,
    side: "right",
  }
);
defineEmits<{
  (event: "update:open", newValue: boolean): void;
}>();
</script>
../plugins/senpCx
