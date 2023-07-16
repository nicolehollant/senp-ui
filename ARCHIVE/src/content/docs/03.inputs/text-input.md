---
description: Styled text input component
---

# TextInput

:SenpTextInput{placeholder="Insert tagline here..."} 

---

## Usage

Use `v-model` to make the `TextInput` reactive.

::ComponentExample
---
is: SenpTextInput
---
#code
```vue
<template>
  <SenpTextInput v-model="model" />
</template>

<script setup>
const model = ref('')
</script>
```
::

## Styling

Use the `label` prop to give a label to the `TextInput`.

::ComponentExample
---
is: SenpTextInput
props:
  label: Example Text Input
---
::

<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-text-input
initialControls:
  label: Example Text Input
handleModels:
  'onUpdate:modelValue': modelValue
---
::