---
description: Dropdown to be used in place of a select
---

# Dropdown

and give me 20

---

## Usage

Use `v-model` to make the `Dropdown` reactive.

::ComponentExample
---
is: SenpDropdown
props:
  label: 'Example Dropdown'
  options: ["Option A", "Option B", "Option C", "Option D"]
---
::

<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-dropdown
initialControls:
  label: 'Example Dropdown'
  options: ["Option A", "Option B", "Option C", "Option D"]
handleModels:
  'onUpdate:modelValue': modelValue
---
::