<template>
  <div class="relative grid gap-8 pt-8 w-full">
    <DocsTab :options="options" chips>
      <template #default="{ active }: { active: (typeof options)[number] }">
        <div v-if="active === 'base'">
          <button
            class="px-2 py-1 rounded bg-neutral-900/50 hover:bg-neutral-800/50 transition"
            @click="values.base = true"
          >
            Open
          </button>
          <SenpModal v-model:open="values.base">
            <p>Some modal contents...</p>
          </SenpModal>
        </div>
        <div v-if="active === 'title'">
          <button
            class="px-2 py-1 rounded bg-neutral-900/50 hover:bg-neutral-800/50 transition"
            @click="values.title = true"
          >
            Open
          </button>
          <SenpModal v-if="active === 'title'" v-model:open="values.title" title="Modal">
            <p>Some modal contents...</p>
          </SenpModal>
        </div>
      </template>
    </DocsTab>
  </div>
</template>

<script setup lang="ts">
const values = reactive({
  base: false,
  title: false,
})

const options = Object.keys(values) as Array<keyof typeof values>
</script>
