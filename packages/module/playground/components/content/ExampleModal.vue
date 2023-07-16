<template>
  <SenpButton
    label="Open"
    @click="open = true"
  />
  <SenpModal v-model:open="open">
    <Placeholder />
  </SenpModal>
</template>

<script setup lang="ts">
import { ref } from "#imports";
const open = ref(false);
</script>
