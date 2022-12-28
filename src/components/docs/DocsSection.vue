<template>
  <div class="grid gap-3">
    <p class="text-xs font-semibold tracking-wider text-neutral-400/80 pb-1 border-neutral-400/10">
      {{ label }}
    </p>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>
