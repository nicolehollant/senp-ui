<template>
  <div class="relative grid gap-8 pt-8 w-full">
    <DocsTab :options="options" chips>
      <template #default="{ active }: { active: (typeof options)[number] }">
        <SenpTextInput v-if="active === 'base'" v-model="values.base"></SenpTextInput>
        <SenpTextInput v-if="active === 'label'" v-model="values.label" label="Username"></SenpTextInput>
        <SenpTextInput v-if="active === 'hint'" v-model="values.hint" hint="Username for the app"></SenpTextInput>
        <SenpTextInput
          v-if="active === 'error'"
          v-model="values.hint"
          error="Must be at least 10 characters"
        ></SenpTextInput>
        <SenpTextInput
          v-if="active === 'kitchen_sink'"
          v-model="values.kitchen_sink"
          label="Username"
          :error="values.kitchen_sink.length < 10 ? 'Must be at least 10 characters' : ''"
          hint="Username for the app"
        ></SenpTextInput>
      </template>
    </DocsTab>
  </div>
</template>

<script setup lang="ts">
const values = reactive({
  base: '',
  label: '',
  hint: '',
  error: '',
  kitchen_sink: '',
})

const options = Object.keys(values) as Array<keyof typeof values>
</script>
