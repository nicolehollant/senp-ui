<template>
  <SenpHighlight
    :value="value"
    language="json"
  />
  <SenpAutoComplete
    v-model="value"
    :options="options"
  />
</template>

<script setup lang="ts">
import { ref } from "#imports";

const options = [
  { label: "hello", value: "hello" },
  { label: "world", value: "world" },
];
const value = ref(options[0]);
</script>
