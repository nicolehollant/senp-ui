<template>
  <SenpLayoutBasic>
    <template #header>
      <h1 class="text-2xl">
        Editor
      </h1>
    </template>
    <template #content>
      <SenpCodeEditor
        v-model="codeState"
        language="html"
        theme="onedark"
        style="overflow: auto; height: 100%"
        enter-action="default"
        class="overflow-auto rounded-none editor w-full"
      />
    </template>
  </SenpLayoutBasic>
</template>

<script setup lang="ts">
const codeState = ref('')
</script>
