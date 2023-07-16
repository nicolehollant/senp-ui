<template>
  <SenpHighlight :value="value" language="json"></SenpHighlight>
  <SenpAutoComplete v-model="value" :options="options" />
</template>

<script setup>
const options = [
  { label: 'hello', value: 'hello' },
  { label: 'world', value: 'world' },
]
const value = ref(options[0])
</script>
