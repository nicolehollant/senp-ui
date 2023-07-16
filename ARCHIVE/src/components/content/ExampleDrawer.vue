<template>
  <SenpButton label="Open" @click="open = true" />
  <SenpDrawer title="Example Drawer" v-model:open="open">
    <Placeholder class="!h-full" />
  </SenpDrawer>
</template>

<script setup>
const open = ref(false)
</script>
