<template>
  <div class="relative grid gap-8 pt-8 w-full">
    <DocsTab :options="options" chips>
      <template #default="{ active }: { active: (typeof options)[number] }">
        <div v-if="active === 'base'">
          <SenpMenu label="Options" :options="['option 1', 'option 2', 'option 3']"></SenpMenu>
        </div>
      </template>
    </DocsTab>
  </div>
</template>

<script setup lang="ts">
const values = reactive({
  base: '',
})

const options = Object.keys(values) as Array<keyof typeof values>
</script>
