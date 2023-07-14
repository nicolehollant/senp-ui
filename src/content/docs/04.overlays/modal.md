---
description: Fixed model in the center of the screen
---

# Modal

Fixed model in the center of the screen

---

## Usage

Use `v-model:open` to make the `Modal` reactive.

::ComponentExample
---
is: ExampleModal
---
#code
```vue
<template>
  <SenpButton label="Open" @click="open = true" />
  <SenpModal title="Example Modal" v-model:open="open">
    <Placeholder class="!h-full" />
  </SenpModal>
</template>

<script setup>
const open = ref(false)
</script>

```
::

<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-modal
initialControls:
  open: false
  title: SenpModal
initialSlots:
  default: <Placeholder class="!h-full" />
handleModels:
  'onUpdate:open': open
---
::