---
description: Highlight your code with prism
---

# PrismHighlight

Highlight your code with prism

---

## Usage

Use `value` prop to pass code to be highlighted, use the `language` prop to choose a language, and use the `theme` prop to select a theme.

::ComponentExample
---
is: SenpPrismHighlight
componentClass: bg-gray-900
props:
  value: >
    const sayHello = () => {
      console.log('hello world')
    }

  theme: atom-dark
  language: javascript
---
::


<hr class="my-20">

## Component API

::AutoStoryPreview
---
storyGroup: auto-stories
storyName: senp-prism-highlight
initialControls:
  value: >
    const sayHello = () => {
      console.log('hello world')
    }

  theme: atom-dark
  language: javascript
---
::