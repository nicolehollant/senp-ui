<template>
  <div
    :class="
      classes?.toast?.base ??
      twMerge(toastVariants({ intent: type, position: placement, class: classes?.toast?.extend }))
    "
  >
    <div class="flex items-center justify-between">
      <p v-if="title" class="font-medium text-sm">{{ title }}</p>
      <button @click="close" class="ml-auto p-1 rounded hover:bg-gray-700/20"><Icon name="mdi:close"></Icon></button>
    </div>
    <p v-if="content">{{ content }}</p>
  </div>
</template>

<script setup lang="ts">
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { DefaultToast } from '../plugins/toast'
import { XClass } from '../plugins/xClass'

const props = withDefaults(
  defineProps<{
    type?: 'info' | 'success' | 'warning' | 'error'
    placement?: 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right'
    title?: string | undefined | null
    content?: string | undefined | null
    durationMs?: number | undefined | null
    classes?: {
      toast?: XClass
    }
  }>(),
  { ...DefaultToast }
)

const emit = defineEmits<{
  (event: 'close'): void
}>()

const toastVariants = cva('w-80 rounded-lg p-2 backdrop-blur-sm bg-opacity-75 text-base flex flex-col gap-1', {
  variants: {
    intent: {
      info: 'bg-blue-800 text-blue-100',
      success: 'bg-green-800 text-green-100',
      warning: 'bg-yellow-800 text-yellow-100',
      error: 'bg-red-800 text-red-100',
    },
    position: {
      top: '',
      bottom: '',
      'top-right': '',
      'top-left': '',
      'bottom-left': '',
      'bottom-right': '',
    },
  },
})

const timeout = ref<null | NodeJS.Timeout>(null)

const close = () => {
  if (timeout.value) {
    clearTimeout(timeout.value)
  }
  emit('close')
}

onMounted(() => {
  if (Number(props.durationMs ?? 0) > 0) {
    setTimeout(() => {
      close()
    }, props.durationMs!)
  }
})
</script>
