<template>
  <SenpButton label="Open" @click="open = true" />
  <SenpModal v-model:open="open">
    <Placeholder />
  </SenpModal>
</template>

<script setup>
const open = ref(false)
</script>
