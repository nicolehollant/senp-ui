<template>
  <HeadlessTransitionRoot appear :show="open" as="template">
    <HeadlessDialog as="div" @close="$emit('update:open', false)" class="relative z-50">
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
              { left: 'translate-x-0', right: 'translate-x-0', top: 'translate-y-0', bottom: 'translate-y-0' }[side]
            "
            leave="duration-100 ease-in"
            :leave-from="
              { left: 'translate-x-0', right: 'translate-x-0', top: 'translate-y-0', bottom: 'translate-y-0' }[side]
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
              class="relative flex overflow-auto transform flex-col gap-6 bg-neutral-800 text-left align-middle shadow-xl transition-all"
              :class="
                $xClass(
                  side === 'left' || side === 'right'
                    ? 'w-full max-h-full max-w-[90vw] md:max-w-6xl'
                    : 'w-full max-h-[80vh]',
                  classes?.maxSize
                )
              "
            >
              <slot name="title">
                <div
                  class="flex items-center justify-between sticky top-0 bg-neutral-800/50 backdrop-blur shadow p-6 text-lg leading-6"
                  v-if="title"
                >
                  <HeadlessDialogTitle as="h3" class="font-medium">
                    {{ title }}
                  </HeadlessDialogTitle>
                  <button class="hover:text-orange-400" @click="$emit('update:open', false)">
                    <Icon name="mdi:close"></Icon>
                  </button>
                </div>
              </slot>
              <div class="px-6 pb-6">
                <slot></slot>
              </div>
              <div v-if="!title">
                <slot name="close">
                  <button
                    class="absolute top-6 right-6 z-50 hover:text-orange-400"
                    @click="$emit('update:open', false)"
                  >
                    <Icon name="mdi:close"></Icon>
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
import { XClass } from '../plugins/xClass'

withDefaults(
  defineProps<{
    open: boolean
    title?: string
    side?: 'left' | 'right' | 'bottom' | 'top'
    classes?: {
      maxSize: XClass
    }
  }>(),
  {
    side: 'right',
  }
)
defineEmits<{
  (event: 'update:open', newValue: boolean): void
}>()
</script>
