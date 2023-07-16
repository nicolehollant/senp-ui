---
description: Highlight your code with shiki
---

# Highlight

Highlight your code with shiki

---

## Usage

Use `value` prop to pass code to be highlighted, use the `language` prop to choose a language, and use the `theme` prop to select a theme.

::ComponentExample
---
is: SenpHighlight
componentClass: bg-gray-900
props:
  value: >
    const sayHello = () => {
      console.log('hello world')
    }

  theme: nord
  language: javascript
---
::


<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-highlight
initialControls:
  value: >
    const sayHello = () => {
      console.log('hello world')
    }

  theme: nord
  language: javascript
---
::