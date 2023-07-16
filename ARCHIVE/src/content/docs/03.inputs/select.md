---
description: Styled select component
---

# Select

and give me 20???

---

## Usage

Use `v-model` to make the `Select` reactive.

::ComponentExample
---
is: SenpSelect
props:
  label: 'Example Select'
  options: ["Option A", "Option B", "Option C", "Option D"]
---
::

<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-select
initialControls:
  label: 'Example Select'
  options: ["Option A", "Option B", "Option C", "Option D"]
handleModels:
  'onUpdate:modelValue': modelValue
---
::