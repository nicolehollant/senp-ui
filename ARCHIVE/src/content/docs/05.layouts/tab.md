---
description: Conditionally render blocks based on a selected menu option
---

# Tab

I'm gonna pop some tabs

---

## Usage

Use `default` slot to render content inside the tag

::ComponentExample
---
is: ExampleTab
---
#code
```vue
<template>
  <SenpTab v-model="model" :options="['Tab A', 'Tab B']" v-slot="{ active }">
    <Placeholder v-if="active === 'Tab A'" class="mt-2 bg-blue-800/50" />
    <Placeholder v-if="active === 'Tab B'" class="mt-2 bg-red-800/50" />
  </SenpTab>
  <p class="mt-2">{{ model }}</p>
</template>

<script setup lang="ts">
const model = ref('Tab A')
</script>
```
::

<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-tab
initialControls:
  options: ["Tab A", "Tab B"]
initialSlots:
  default: <Placeholder class="mt-2" />
---
::