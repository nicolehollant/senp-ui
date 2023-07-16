<template>
  <Teleport :to="to">
    <div
      v-auto-animate
      class="fixed flex flex-col gap-2 top-4 left-4 z-50"
    >
      <SenpToast
        v-for="toast in $toast.toasts.filter((t) => t.placement === 'top-left')"
        :key="toast.id"
        v-bind="toast"
        @close="$toast.removeId(toast.id)"
      />
    </div>
    <div
      v-auto-animate
      class="fixed flex flex-col gap-2 top-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      <SenpToast
        v-for="toast in $toast.toasts.filter((t) => t.placement === 'top')"
        :key="toast.id"
        v-bind="toast"
        @close="$toast.removeId(toast.id)"
      />
    </div>
    <div
      v-auto-animate
      class="fixed flex flex-col gap-2 top-4 right-4 z-50"
    >
      <SenpToast
        v-for="toast in $toast.toasts.filter(
          (t) => t.placement === 'top-right'
        )"
        :key="toast.id"
        v-bind="toast"
        @close="$toast.removeId(toast.id)"
      />
    </div>
    <div
      v-auto-animate
      class="fixed flex flex-col gap-2 bottom-4 left-4 z-50"
    >
      <SenpToast
        v-for="toast in $toast.toasts.filter(
          (t) => t.placement === 'bottom-left'
        )"
        :key="toast.id"
        v-bind="toast"
        @close="$toast.removeId(toast.id)"
      />
    </div>
    <div
      v-auto-animate
      class="fixed flex flex-col gap-2 bottom-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      <SenpToast
        v-for="toast in $toast.toasts.filter((t) => t.placement === 'bottom')"
        :key="toast.id"
        v-bind="toast"
        @close="$toast.removeId(toast.id)"
      />
    </div>
    <div
      v-auto-animate
      class="fixed flex flex-col gap-2 bottom-4 right-4 z-50"
    >
      <SenpToast
        v-for="toast in $toast.toasts.filter(
          (t) => t.placement === 'bottom-right'
        )"
        :key="toast.id"
        v-bind="toast"
        @close="$toast.removeId(toast.id)"
      />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    to?: string | HTMLElement;
  }>(),
  {
    to: "body",
  }
);
</script>
