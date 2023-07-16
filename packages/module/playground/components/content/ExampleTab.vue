<template>
  <SenpTab
    v-slot="{ active }"
    v-model="model"
    :options="['Tab A', 'Tab B']"
  >
    <Placeholder
      v-if="active === 'Tab A'"
      class="mt-2 bg-blue-800/50"
    />
    <Placeholder
      v-if="active === 'Tab B'"
      class="mt-2 bg-red-800/50"
    />
  </SenpTab>
  <p class="mt-2">
    {{ model }}
  </p>
</template>

<script setup lang="ts">
import { ref } from "#imports";
const model = ref("Tab A");
</script>
