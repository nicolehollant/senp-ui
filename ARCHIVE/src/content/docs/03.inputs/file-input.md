---
description: Leave small labels for users to keep content in mind
---

# FileInput

You're it!

---

## Usage

Use `v-model` to make the `FileInput` reactive.

::ComponentExample
---
is: ExampleFileInput
---
#code
```vue
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
```
::

<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-file-input
handleModels:
  'onUpdate:modelValue': modelValue
---
::