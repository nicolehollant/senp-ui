---
description: A batteries-included code editor based on codemirror
---

# CodeEditor

CodeEditorrotidEedoC

---

## Usage

Use `v-model` to make the `CodeEditor` reactive.

::ComponentExample
---
is: SenpCodeEditor
props:
  modelValue: '# Hello World'
ignoreProps: ['modelValue']
---
#code
```vue
<template>
  <SenpCodeEditor v-model="value" />
</template>

<script setup>
const value = ref('# Hello World')
</script>
```
::

### Language

Use the `language` prop to change the language of the code editor

::ComponentExample
---
is: SenpCodeEditor
props:
  language: markdown
controls:
  language:
    type: string
    options: ['html', 'markdown', 'json']
---
::

<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-code-editor
---
::