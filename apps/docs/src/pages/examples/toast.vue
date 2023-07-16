<template>
  <SenpLayoutBasic
    fixed-header
    :classes="{
      header: {
        extend: 'bg-black/20 backdrop-blur shadow',
      },
    }"
  >
    <template #header>
      <h1 class="text-2xl">SenpToast Demo</h1>
    </template>
    <template #content>
      <SenpTextInput label="title" v-model="toastOptions.title"></SenpTextInput>
      <SenpTextInput label="content" v-model="toastOptions.content"></SenpTextInput>
      <SenpTextInput label="type" v-model="toastOptions.type"></SenpTextInput>
      <SenpTextInput label="durationMs" v-model="toastOptions.durationMs"></SenpTextInput>
      <div class="grid grid-cols-3 gap-3">
        <SenpButton
          class="w-32"
          v-for="placement in ['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right']"
          @click="addToast(placement as any)"
          >{{ placement }}</SenpButton
        >
      </div>
    </template>
  </SenpLayoutBasic>
  <SenpToastProvider></SenpToastProvider>
</template>

<script setup lang="ts">
const { $toast } = useNuxtApp()
const toastNumber = ref(1)
const toastOptions = ref({
  title: 'Testing',
  content: 'This is some fake content',
  type: 'info',
  durationMs: '2000',
})

const addToast = (placement: typeof $toast.toasts[number]['placement']) => {
  $toast.add({
    placement,
    type: toastOptions.value.type as any,
    content: toastOptions.value.content || undefined,
    durationMs: toastOptions.value.durationMs ? Number(toastOptions.value.durationMs) : undefined,
    title: [toastOptions.value.title, toastNumber.value].join(' - '),
  })
  toastNumber.value++
}
</script>
