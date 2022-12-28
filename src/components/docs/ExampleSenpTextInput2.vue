<template>
  <div class="relative grid gap-8 pt-8 w-full">
    <DocsTab :options="options" chips>
      <template #default="{ active }: { active: (typeof options)[number] }">
        <SenpTextInput
          v-if="active === 'base'"
          v-model="values.base"
          label="Username"
          error="Must be at least 10 characters"
          hint="Username for the app"
        ></SenpTextInput>
        <SenpTextInput
          v-if="active === 'wrapper'"
          v-model="values.error"
          label="Username"
          hint="Username for the app"
          :classes="{
            wrapper: {
              base: 'ring-2 ring-emerald-400 rounded',
            },
          }"
        ></SenpTextInput>
        <SenpTextInput
          v-if="active === 'input'"
          v-model="values.input"
          label="Username"
          hint="Username for the app"
          :classes="{
            input: {
              base: 'ring-2 ring-emerald-400 rounded',
            },
          }"
        ></SenpTextInput>
        <SenpTextInput
          v-if="active === 'label'"
          v-model="values.label"
          label="Username"
          hint="Username for the app"
          :classes="{
            label: {
              base: 'ring-2 ring-emerald-400 rounded',
            },
          }"
        ></SenpTextInput>
        <SenpTextInput
          v-if="active === 'hint'"
          v-model="values.hint"
          label="Username"
          hint="Username for the app"
          :classes="{
            hint: {
              base: 'ring-2 ring-emerald-400 rounded',
            },
          }"
        ></SenpTextInput>
        <SenpTextInput
          v-if="active === 'error'"
          v-model="values.hint"
          label="Username"
          error="Must be at least 10 characters"
          hint="Username for the app"
          :classes="{
            error: {
              base: 'ring-2 ring-emerald-400 rounded',
            },
          }"
        ></SenpTextInput>
      </template>
    </DocsTab>
  </div>
</template>

<script setup lang="ts">
const values = reactive({
  base: '',
  wrapper: '',
  input: '',
  label: '',
  hint: '',
  error: '',
})

const options = Object.keys(values) as Array<keyof typeof values>
</script>
