<template>
  <SenpButton
    label="Open"
    @click="open = true"
  />
  <SenpDrawer
    v-model:open="open"
    title="Example Drawer"
  >
    <Placeholder class="!h-full" />
  </SenpDrawer>
</template>

<script setup lang="ts">
import { ref } from "#imports";
const open = ref(false);
</script>
