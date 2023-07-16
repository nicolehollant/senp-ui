---
description: Typeahead box to use in place of a select
---

# AutoComplete

Happy feet, wombo combobox

---

## Usage

Use a `v-model` to make the AutoComplete reactive. Pass a list of `options` and `keyFields` to search over, and choose your displayed value with the `displayValue` function. Switch between `sort` and `filter` modes to change the behavior of the AutoComplete.

::ComponentExample
---
is: ExampleAutoComplete
---
#code
```vue
<template>
  <SenpAutoComplete v-model="value" :options="options" />
  <pre><code>{{ value }}</code></pre>
</template>

<script setup>
const options = [
  { label: 'hello', value: 'hello' },
  { label: 'world', value: 'world' },
]
const value = ref(options[0])
</script>
```
::

<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-tag
initialSlots:
  default: Hello World
---
::