---
description: A styled checkbox component for booleans in forms
---

# Checkbox

Have you tried turning it off and on again?

---

## Usage

Use `v-model` to make the `Checkbox` reactive.

::ComponentExample
---
is: SenpCheckbox
---
#code
```vue
<template>
  <SenpCheckbox v-model="value" />
</template>

<script setup>
const value = ref(false)
</script>
```
::

### Size

Use the `size` prop to change the size of the checkbox

::ComponentExample
---
is: SenpCheckbox
props:
  size: base
controls:
  size:
    type: string
    options: ['base', 'input']
---
::

### Label

Use the `label` prop to provide a label, use the `labelSide` prop to change the position of the label

::ComponentExample
---
is: SenpCheckbox
props:
  label: Accept these terms?
  labelSide: right
controls:
  labelSide:
    type: string
    options: ['top', 'left', 'right']
---
::

### Hint

Use the `hint` prop to provide a helpful description to your checkbox

::ComponentExample
---
is: SenpCheckbox
props:
  hint: Only check this if you want to, it's ok :)
---
::

### Error

Use the `error` prop to provide an error message to your checkbox

::ComponentExample
---
is: SenpCheckbox
props:
  error: Ohhhhh no you messed up!
---
::

<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-checkbox
---
::