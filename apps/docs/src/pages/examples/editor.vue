<template>
  <SenpLayoutBasic>
    <template #header>
      <h1 class="text-2xl">Editor</h1>
    </template>
    <template #content>
      <SenpCodeEditor
        language="html"
        theme="onedark"
        style="overflow: auto; height: 100%"
        enter-action="default"
        v-model="codeState"
        class="overflow-auto rounded-none editor w-full"
      ></SenpCodeEditor>
    </template>
  </SenpLayoutBasic>
</template>

<script setup lang="ts">
const codeState = ref('')
</script>
