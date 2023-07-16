<template>
  <Teleport :to="to">
    <div class="fixed flex flex-col gap-2 top-4 left-4 z-50" v-auto-animate>
      <SenpToast
        v-for="toast in $toast.toasts.filter((t) => t.placement === 'top-left')"
        @close="$toast.removeId(toast.id)"
        :key="toast.id"
        v-bind="toast"
      ></SenpToast>
    </div>
    <div class="fixed flex flex-col gap-2 top-4 left-1/2 transform -translate-x-1/2 z-50" v-auto-animate>
      <SenpToast
        v-for="toast in $toast.toasts.filter((t) => t.placement === 'top')"
        @close="$toast.removeId(toast.id)"
        :key="toast.id"
        v-bind="toast"
      ></SenpToast>
    </div>
    <div class="fixed flex flex-col gap-2 top-4 right-4 z-50" v-auto-animate>
      <SenpToast
        v-for="toast in $toast.toasts.filter((t) => t.placement === 'top-right')"
        @close="$toast.removeId(toast.id)"
        :key="toast.id"
        v-bind="toast"
      ></SenpToast>
    </div>
    <div class="fixed flex flex-col gap-2 bottom-4 left-4 z-50" v-auto-animate>
      <SenpToast
        v-for="toast in $toast.toasts.filter((t) => t.placement === 'bottom-left')"
        @close="$toast.removeId(toast.id)"
        :key="toast.id"
        v-bind="toast"
      ></SenpToast>
    </div>
    <div class="fixed flex flex-col gap-2 bottom-4 left-1/2 transform -translate-x-1/2 z-50" v-auto-animate>
      <SenpToast
        v-for="toast in $toast.toasts.filter((t) => t.placement === 'bottom')"
        @close="$toast.removeId(toast.id)"
        :key="toast.id"
        v-bind="toast"
      ></SenpToast>
    </div>
    <div class="fixed flex flex-col gap-2 bottom-4 right-4 z-50" v-auto-animate>
      <SenpToast
        v-for="toast in $toast.toasts.filter((t) => t.placement === 'bottom-right')"
        @close="$toast.removeId(toast.id)"
        :key="toast.id"
        v-bind="toast"
      ></SenpToast>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    to?: string | HTMLElement
  }>(),
  {
    to: 'body',
  }
)
</script>
