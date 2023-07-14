---
description: Fixed application drawer pinned to a side of the screen
---

# Drawer

Fixed application drawer pinned to a side of the screen

---

## Usage

Use `v-model:open` to make the `Drawer` reactive.

::ComponentExample
---
is: ExampleDrawer
---
#code
```vue
<template>
  <SenpButton label="Open" @click="open = true" />
  <SenpDrawer title="Example Drawer" v-model:open="open">
    <Placeholder class="!h-full" />
  </SenpDrawer>
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
storyName: senp-drawer
initialControls:
  open: false
  title: SenpDrawer
initialSlots:
  default: <Placeholder class="!h-full" />
handleModels:
  'onUpdate:open': open
---
::