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
        <div class="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
      </HeadlessTransitionChild>

      <div class="fixed inset-0 overflow-hidden p-4 pb-[10vmin] h-full">
        <div class="flex h-full items-center justify-center text-center overflow-hidden">
          <HeadlessTransitionChild
            as="template"
            enter="duration-200 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel
              class="flex w-full overflow-auto max-h-full max-w-6xl transform flex-col gap-6 rounded-2xl border-2 border-neutral-700 bg-neutral-800 text-left align-middle shadow-xl transition-all"
            >
              <slot name="title">
                <HeadlessDialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 sticky top-0 bg-neutral-800/50 backdrop-blur shadow p-6"
                  v-if="title"
                >
                  {{ title }}
                </HeadlessDialogTitle>
              </slot>
              <div class="px-6 pb-6">
                <slot></slot>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  title?: string
}>()
defineEmits<{
  (event: 'update:open', newValue: boolean): void
}>()
</script>
