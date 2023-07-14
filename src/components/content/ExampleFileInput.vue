<template>
  <div class="space-y-2">
    <SenpDropdown v-model="readAs" :options="['binary-string', 'data-url', 'text', 'array-buffer', 'file']" />
    <SenpFileInput v-model="model" :read-as="readAs" />
    <p class="text-xs w-full break-all max-h-64 overflow-auto">{{ model }}</p>
  </div>
</template>

<script setup>
const readAs = ref('data-url')
const model = ref()
</script>
